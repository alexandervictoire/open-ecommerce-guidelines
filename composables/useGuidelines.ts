import type { GuidelineMeta } from '~/utils/labels'
import { SEVERITY_ORDER, deriveGuidelineId } from '~/utils/labels'

// Fetch metadata for all published guidelines (no body).
// The canonical guideline id is derived from the stem (see deriveGuidelineId).
// Shared by the homepage, category lists, and dimension lists.
export async function useAllGuidelines() {
  const { data } = await useAsyncData('guidelines-meta', () =>
    queryCollection('guidelines')
      .where('status', '=', 'published')
      .select('title', 'category', 'dimension', 'severity', 'targets', 'status', 'path', 'stem')
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
      path: d.path
    }))
  )
}

// Sort by severity (critical first), then id — a stable, useful default order.
export function sortGuidelines(items: GuidelineMeta[]): GuidelineMeta[] {
  return [...items].sort((a, b) => {
    const s = (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9)
    return s !== 0 ? s : a.id.localeCompare(b.id)
  })
}
