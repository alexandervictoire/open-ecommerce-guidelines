import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Category and dimension pages are parameterised routes: Nitro can only reach
// them by crawling, and a route that fails to render while crawling is skipped
// silently (prerender.failOnError defaults to false) — which shipped them as
// 404s in production. They are enumerated from the content directory here so
// the build renders them explicitly instead of relying on link discovery.
function listRoutes(): string[] {
  // Anchored to this file rather than the cwd, so the build works regardless of
  // where it is invoked from.
  const root = fileURLToPath(new URL('./content/guidelines', import.meta.url))
  if (!existsSync(root)) return []

  const categories: string[] = []
  const dimensions = new Set<string>()

  for (const entry of readdirSync(root)) {
    const dir = join(root, entry)
    if (!statSync(dir).isDirectory()) continue
    const files = readdirSync(dir).filter((f) => f.endsWith('.md'))
    if (files.length === 0) continue // e.g. checkout, which has no guidelines yet
    categories.push(`/guidelines/${entry}/`)
    for (const file of files) {
      const match = /^dimension:[ \t]*(\S+)[ \t]*$/m.exec(readFileSync(join(dir, file), 'utf8'))
      if (match) dimensions.add(match[1])
    }
  }

  return [...categories, ...[...dimensions].sort().map((d) => `/dimensions/${d}/`)]
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/content', '@unocss/nuxt'],
  ssr: true,
  css: ['~/assets/css/main.css'],
  content: {
    // Keep it simple: render Markdown, no code-highlighting deps needed for MVP.
    build: {
      markdown: {
        toc: { depth: 2 }
      }
    }
  },
  nitro: {
    // DO NOT REMOVE — this is a deliberate workaround, not leftover config.
    //
    // Nitro auto-detects VERCEL=1 in CI and switches to the `vercel-static`
    // preset, which emits .vercel/output/config.json (Build Output API v3) and
    // takes over routing, ignoring vercel.json's `outputDirectory`. That preset
    // derives an `overrides` entry per prerendered route, and any route reached
    // via a link with a trailing slash yields a malformed key:
    //
    //   guidelines/pdp/index.html               -> "guidelines/pdp/"   (404)
    //   guidelines/pdp/pdp-dc-off-01/index.html -> "guidelines/pdp/..." (200)
    //
    // Vercel looks requests up without the trailing slash, so the slashed keys
    // never match: every category and dimension page 404'd in production while
    // detail pages (linked without a trailing slash) worked — even though all
    // of them prerendered successfully in the build log.
    //
    // Upstream: nuxt/nuxt#24449 "Nuxt 3.8+ doesn't generate files correctly on
    // Vercel when routing links have trailing slash" — closed as not planned,
    // so this stays until the site drops trailing-slash links entirely.
    //
    // Forcing the static preset makes Vercel serve the directory tree the
    // ordinary way, which is what vercel.json already declares.
    preset: 'static',
    prerender: {
      crawlLinks: true,
      // Never ship a silently skipped route again — a failing page must break
      // the build with its real error instead of becoming a 404 in production.
      failOnError: true,
      routes: ['/', '/sitemap.xml', ...listRoutes()]
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        // Vercel Web Analytics (enabled in the dashboard). Served by Vercel at
        // this path in production; harmless 404 in local/preview builds.
        { src: '/_vercel/insights/script.js', defer: true }
      ]
    }
  }
})
