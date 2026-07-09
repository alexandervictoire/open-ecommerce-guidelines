import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Frontmatter schema for guidelines — mirrors PLAN §3.
// Note: `targets` includes `machine` in addition to `human`/`agent` because the
// source content uses it (see CLAUDE.md). No `score` field is permitted here.
export default defineContentConfig({
  collections: {
    guidelines: defineCollection({
      type: 'page',
      source: 'guidelines/**/*.md',
      schema: z.object({
        id: z.string(),
        category: z.enum(['pdp', 'cart', 'checkout']),
        dimension: z.string(),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        targets: z.array(z.enum(['human', 'agent', 'machine'])),
        status: z.enum(['draft', 'published', 'deprecated'])
      })
    })
  }
})
