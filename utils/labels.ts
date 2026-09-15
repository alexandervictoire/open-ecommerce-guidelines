// Human-readable labels and ordering for categories and dimensions.
// Keep in sync with the enums in content.config.ts / CLAUDE.md.

import type { PlatformStatus } from '~/utils/platforms'

export const CATEGORY_LABELS: Record<string, string> = {
  plp: 'Product Listing Page',
  pdp: 'Product Detail Page',
  cart: 'Cart',
  checkout: 'Checkout',
  global: 'Global'
}

// Funnel order, with conditions that hold on every page last.
export const CATEGORY_ORDER = ['plp', 'pdp', 'cart', 'checkout', 'global']

export const DIMENSION_LABELS: Record<string, string> = {
  'decision-clarity': 'Decision Clarity',
  'system-robustness': 'System Robustness',
  'semantic-integrity': 'Semantic Integrity',
  'machine-extractability': 'Machine Extractability',
  'trust-decision-enablement': 'Trust & Decision Enablement'
}

// Statuses listed on the site (lists, navigation, sitemap). Drafts are live and
// carry a badge, so they can be tested and corrected in the open. Deprecated
// guidelines keep their page but are not listed. Keep in sync with
// listRoutes() in nuxt.config.ts.
export const LISTED_STATUSES = ['published', 'draft']

export const SEVERITY_ORDER: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3
}

export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug
}

// Nuxt Content reserves the `id` field (it stores the internal file key there),
// so a guideline's own `id` frontmatter is not queryable. The filename is the
// lowercased id by contract (converter-enforced), so we recover the canonical
// uppercase id from the content stem, e.g. "guidelines/pdp/pdp-me-h1-01".
export function deriveGuidelineId(stem: string): string {
  const base = (stem ?? '').split('/').pop() ?? ''
  return base.toUpperCase()
}

export function dimensionLabel(slug: string): string {
  return DIMENSION_LABELS[slug] ?? slug
}

export interface GuidelineMeta {
  id: string
  title: string
  category: string
  dimension: string
  severity: string
  targets: string[]
  status: string
  path: string
  shopware_status: PlatformStatus
  shopify_status: PlatformStatus
  // Empty (field absent in frontmatter) means the guideline applies to B2C and B2B.
  audience: string[]
  // Ids of the instruments (utils/regulations.json) the guideline's citations
  // belong to; empty when it carries no `regulation`.
  instruments: string[]
}
