// Platform-specific guideline support (Shopware / Shopify).
//
// Each guideline carries one status per platform. The status controls both the
// platform filter and whether a platform section is required in the body:
//
//   not_applicable    — does not apply structurally; hidden in the filtered view
//   no_divergence     — applies, verify/fix identical to the generic version
//   platform_specific — applies with a platform-specific twist; REQUIRES the
//                       matching `## <Platform> specific` H2 section
//
// Missing frontmatter defaults to `no_divergence`, so existing guidelines stay
// valid. The coupling between status and section is enforced at build time by
// scripts/validate-guidelines.mjs.

export const PLATFORMS = ['shopware', 'shopify'] as const
export type Platform = (typeof PLATFORMS)[number]

export const PLATFORM_LABELS: Record<Platform, string> = {
  shopware: 'Shopware',
  shopify: 'Shopify'
}

export const PLATFORM_STATUSES = ['not_applicable', 'no_divergence', 'platform_specific'] as const
export type PlatformStatus = (typeof PLATFORM_STATUSES)[number]

export const DEFAULT_PLATFORM_STATUS: PlatformStatus = 'no_divergence'

// Frontmatter field name for a platform, e.g. "shopware" -> "shopware_status".
export function statusField(platform: Platform): string {
  return `${platform}_status`
}

// Anchor id / heading text of a platform's body section.
// Matches the id Nuxt Content derives from "## Shopware specific".
export function sectionAnchor(platform: Platform): string {
  return `${platform}-specific`
}

export function sectionHeading(platform: Platform): string {
  return `${PLATFORM_LABELS[platform]} specific`
}

// Read a guideline's status for a platform, applying the default.
export function platformStatus(
  guideline: Record<string, any> | null | undefined,
  platform: Platform
): PlatformStatus {
  const raw = guideline?.[statusField(platform)]
  return (PLATFORM_STATUSES as readonly string[]).includes(raw)
    ? (raw as PlatformStatus)
    : DEFAULT_PLATFORM_STATUS
}

// Filter rule: only `not_applicable` disappears from a platform's view.
// `no_divergence` stays visible with the generic content — dropping it would
// hide relevant guidelines from merchants.
export function matchesPlatform(guideline: Record<string, any>, platform: Platform): boolean {
  return platformStatus(guideline, platform) !== 'not_applicable'
}

// Split a guideline body into the generic part and the trailing platform
// sections, so the platform content can be rendered in its own container.
//
// Nuxt Content stores the body as `minimark`: a flat array of
// [tag, props, ...children] nodes. The platform sections always come last, each
// introduced by an `h2` whose id is the platform anchor.
export function splitPlatformBody(doc: Record<string, any> | null | undefined): {
  core: any[]
  sections: Record<Platform, any[] | null>
} {
  const value: any[] = Array.isArray(doc?.body?.value) ? doc!.body.value : []

  const starts = new Map<Platform, number>()
  value.forEach((node, index) => {
    if (!Array.isArray(node) || node[0] !== 'h2') return
    const id = node[1]?.id
    const platform = PLATFORMS.find((p) => sectionAnchor(p) === id)
    if (platform && !starts.has(platform)) starts.set(platform, index)
  })

  const boundaries = [...starts.values()].sort((a, b) => a - b)
  const core = value.slice(0, boundaries.length ? boundaries[0] : value.length)

  const sections = {} as Record<Platform, any[] | null>
  for (const platform of PLATFORMS) {
    const start = starts.get(platform)
    if (start === undefined) {
      sections[platform] = null
      continue
    }
    const next = boundaries.find((b) => b > start)
    sections[platform] = value.slice(start, next ?? value.length)
  }

  return { core, sections }
}

// Wrap a subset of body nodes back into a doc-shaped value for ContentRenderer.
export function docWithBody(doc: Record<string, any>, nodes: any[]): Record<string, any> {
  return { ...doc, body: { ...doc.body, value: nodes } }
}

// The filter value used in the URL (`?platform=shopware`); 'all' is the default
// and is represented by an absent query parameter.
export type PlatformFilterValue = Platform | 'all'

export function normalizePlatformFilter(raw: unknown): PlatformFilterValue {
  const value = Array.isArray(raw) ? raw[0] : raw
  return (PLATFORMS as readonly string[]).includes(String(value))
    ? (String(value) as Platform)
    : 'all'
}
