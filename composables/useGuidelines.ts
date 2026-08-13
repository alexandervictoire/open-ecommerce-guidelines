import type { GuidelineMeta } from '~/utils/labels'
import { SEVERITY_ORDER, deriveGuidelineId } from '~/utils/labels'
import { matchesPlatform, platformStatus } from '~/utils/platforms'
import type { PlatformFilterValue } from '~/utils/platforms'

// Fetch metadata for all published guidelines (no body).
// The canonical guideline id is derived from the stem (see deriveGuidelineId).
// Shared by the homepage, category lists, and dimension lists.
export async function useAllGuidelines() {
  const { data } = await useAsyncData('guidelines-meta', () =>
    queryCollection('guidelines')
      .where('status', '=', 'published')
      .select(
        'title', 'category', 'dimension', 'severity', 'targets', 'status', 'path', 'stem',
        'shopware_status', 'shopify_status'
      )
      .all()
  )
  return computed<GuidelineMeta[]>(() =>
    (data.value ?? []).map((d: any) => ({
      id: deriveGuidelineId(d.stem),
      title: d.title,
      category: d.category,
      dimension: d.dimension,
      severity: d.severity,
      targets: d.targets ?? [],
      status: d.status,
      path: d.path,
      // Normalized here so every consumer sees a legal value, even if the
      // frontmatter field is absent (see utils/platforms.ts).
      shopware_status: platformStatus(d, 'shopware'),
      shopify_status: platformStatus(d, 'shopify')
    }))
  )
}

// Apply the platform filter. Only `not_applicable` guidelines are dropped;
// `no_divergence` stays visible with its generic content.
export function filterByPlatform(
  items: GuidelineMeta[],
  platform: PlatformFilterValue
): GuidelineMeta[] {
  if (platform === 'all') return items
  return items.filter((g) => matchesPlatform(g, platform))
}

// Sort by severity (critical first), then id — a stable, useful default order.
export function sortGuidelines(items: GuidelineMeta[]): GuidelineMeta[] {
  return [...items].sort((a, b) => {
    const s = (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
    return s !== 0 ? s : a.id.localeCompare(b.id)
  })
}
