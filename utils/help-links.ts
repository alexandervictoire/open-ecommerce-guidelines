// "Need help implementing this?" — the one commercial pointer on the site.
//
// The guidelines have to read as neutral documentation, so this is a single
// quiet box per page, no call to action in the guideline text itself, and one
// target page per category at most.
//
// `enabled` is a manual switch, and it exists for one reason: a link must never
// point at a page that does not exist. Turn an entry on only after opening the
// URL and seeing the page, and turn it off again if the target is retired. The
// build does not check this — it would make builds depend on a third-party site.
//
// The targets are German pages on an otherwise English site, which is why each
// label says so: the reader should know before clicking that the page they land
// on is in another language.
//
// Targets verified live (200, no redirect) on 2026-10-13.

import { MAINTAINER_BRAND } from '~/utils/site'

export interface HelpLink {
  enabled: boolean
  url: string
  // Shown as the link text. Says where the reader lands, not what to buy.
  label: string
}

// The three categories a conversion engagement works on directly.
const CONVERSION: HelpLink = {
  enabled: true,
  url: 'https://semanticperformance.com/de/shopify-conversion-optimierung/',
  label: `Shopify conversion work at ${MAINTAINER_BRAND} (German)`
}

// Everything else starts with a look at the whole shop rather than one surface.
const ANALYSIS: HelpLink = {
  enabled: true,
  url: 'https://semanticperformance.com/de/shopify-shop-analyse/',
  label: `Shopify shop analysis at ${MAINTAINER_BRAND} (German)`
}

// Per category, so a category can get its own target later without touching
// the components.
export const HELP_LINKS: Record<string, HelpLink> = {
  // Not a category: the seasonal collection page, which spans all of them.
  collection: ANALYSIS,
  pdp: CONVERSION,
  cart: CONVERSION,
  checkout: CONVERSION,
  plp: ANALYSIS,
  global: ANALYSIS
}

export function helpLinkFor(category: string): HelpLink | null {
  const link = HELP_LINKS[category]
  return link?.enabled ? link : null
}
