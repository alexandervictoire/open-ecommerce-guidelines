// Single source of truth for site-level constants.
// NOTE: GITHUB_REPO is a placeholder until the real remote exists (working
// title project, see PLAN.md). Update the slug here once the repo is created;
// it drives "Edit this page" and "Contribute" links and the sitemap host.

export const SITE_NAME = 'Open E-Commerce Guidelines'
export const SITE_DESCRIPTION =
  'An open, community-maintained collection of UX and technical e-commerce guidelines — including machine-readability and agentic-commerce readiness.'

// GitHub "owner/repo" slug and default branch.
export const GITHUB_REPO = 'OWNER/ecom-guidelines'
export const GITHUB_BRANCH = 'main'

// Public site origin used for canonical URLs / sitemap. Update this to the real
// production domain once known (currently the expected Vercel project URL).
export const SITE_URL = 'https://ecom-guidelines.vercel.app'

export function githubBlobUrl(pathInRepo: string): string {
  return `https://github.com/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${pathInRepo}`
}

export function githubEditUrl(pathInRepo: string): string {
  return `https://github.com/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${pathInRepo}`
}
