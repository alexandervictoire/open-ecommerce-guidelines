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
        category: z.enum(['plp', 'pdp', 'cart', 'checkout', 'global']),
        dimension: z.string(),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        targets: z.array(z.enum(['human', 'agent', 'machine'])),
        status: z.enum(['draft', 'published', 'deprecated']),
        // Platform applicability — see utils/platforms.ts. Absent means
        // `no_divergence`, so existing guidelines remain valid.
        shopware_status: z
          .enum(['not_applicable', 'no_divergence', 'platform_specific'])
          .default('no_divergence'),
        shopify_status: z
          .enum(['not_applicable', 'no_divergence', 'platform_specific'])
          .default('no_divergence'),
        // Legal anchoring — all optional (see CLAUDE.md). `regulation` names the
        // provisions a guideline relates to; `jurisdiction` is `eu` or a lowercase
        // ISO country code and is absent when the guideline is not jurisdiction-
        // bound; `audience` is absent when the guideline applies to B2C and B2B.
        regulation: z.array(z.string().min(1)).optional(),
        jurisdiction: z.array(z.string().regex(/^(eu|[a-z]{2})$/)).optional(),
        audience: z.array(z.enum(['b2c', 'b2b'])).optional()
      })
    })
  }
})
