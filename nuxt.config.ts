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
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml']
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
