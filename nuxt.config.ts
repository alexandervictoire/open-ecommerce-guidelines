import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Drafts are rendered on Vercel preview deployments only, so a PR can be
// reviewed as it will look, while production never ships a draft. Defaults to
// hidden: a build that is not explicitly a preview behaves like production.
// Set NUXT_PUBLIC_SHOW_DRAFTS=true to see drafts in a local build.
const showDrafts =
  process.env.VERCEL_ENV === 'preview' || process.env.NUXT_PUBLIC_SHOW_DRAFTS === 'true'

// Hardening: category and dimension pages are parameterised routes that Nitro
// otherwise only reaches by crawling, so they are enumerated here and rendered
// explicitly. (The production 404s on these pages were caused by the
// vercel-static preset — see `preset` below — not by crawling.)
//
// Only guidelines visible in this build count, so a category holding nothing
// but drafts does not produce an empty page in production.
function listRoutes(): string[] {
  // Anchored to this file rather than the cwd, so the build works regardless of
  // where it is invoked from.
  const root = fileURLToPath(new URL('./content/guidelines', import.meta.url))
  if (!existsSync(root)) return []

  const visible = showDrafts ? ['published', 'draft'] : ['published']
  const categories: string[] = []
  const dimensions = new Set<string>()

  for (const entry of readdirSync(root)) {
    const dir = join(root, entry)
    if (!statSync(dir).isDirectory()) continue
    let hasVisible = false
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const text = readFileSync(join(dir, file), 'utf8')
      const status = /^status:[ \t]*(\S+)[ \t]*$/m.exec(text)?.[1]
      if (!status || !visible.includes(status)) continue
      hasVisible = true
      const dimension = /^dimension:[ \t]*(\S+)[ \t]*$/m.exec(text)?.[1]
      if (dimension) dimensions.add(dimension)
    }
    if (hasVisible) categories.push(`/guidelines/${entry}/`)
  }

  return [...categories, ...[...dimensions].sort().map((d) => `/dimensions/${d}/`)]
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxt/content', '@unocss/nuxt'],
  ssr: true,
  runtimeConfig: {
    public: {
      showDrafts
    }
  },
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
