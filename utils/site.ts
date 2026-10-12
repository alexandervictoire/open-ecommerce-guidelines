// Single source of truth for site-level constants.
// NOTE: GITHUB_REPO is a placeholder until the real remote exists (working
// title project, see PLAN.md). Update the slug here once the repo is created;
// it drives "Edit this page" and "Contribute" links and the sitemap host.

export const SITE_NAME = 'Open E-Commerce Guidelines'
export const SITE_DESCRIPTION =
  'An open, community-maintained collection of UX and technical e-commerce guidelines — including machine-readability, agentic-commerce readiness, and what applies specifically on Shopware and Shopify.'

// GitHub "owner/repo" slug and default branch.
export const GITHUB_REPO = 'alexandervictoire/open-ecommerce-guidelines'
export const GITHUB_BRANCH = 'main'

// Public site origin used for canonical URLs / sitemap.
// No trailing slash. If Vercel's primary domain is the apex, change to
// https://ecommerce-guidelines.org.
export const SITE_URL = 'https://www.ecommerce-guidelines.org'

export function githubBlobUrl(pathInRepo: string): string {
  return `https://github.com/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${pathInRepo}`
}

export function githubEditUrl(pathInRepo: string): string {
  return `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${pathInRepo}`
}

// ---- URL convention ---------------------------------------------------------
//
// Every page URL on this site ends with a trailing slash. `vercel.json` enforces
// it (`trailingSlash: true`), so a request without the slash is answered with a
// 308 to the slashed URL. Canonicals, the sitemap and internal links therefore
// have to use the same form, or every one of them points at a redirect.
//
// Nuxt Content stores document paths without the trailing slash
// (`/guidelines/pdp/pdp-dc-price-01`), which is where the mismatch came from:
// use the raw path to query the collection, and the slashed form for anything
// that is rendered as a URL.

export function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`
}

// Absolute URL for <link rel="canonical">, JSON-LD and the sitemap.
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${withTrailingSlash(path)}`
}
