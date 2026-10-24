import { canonicalUrl, withTrailingSlash } from '~/utils/site'
import { CATEGORY_LABELS, DIMENSION_LABELS, LISTED_STATUSES } from '~/utils/labels'
import { SEASON_COLLECTIONS } from '~/utils/seasons'

// Static sitemap generated at prerender time from the guidelines collection.
export default defineEventHandler(async (event) => {
  const docs = await queryCollection(event, 'guidelines')
    .where('status', 'IN', LISTED_STATUSES)
    .select('path', 'category', 'dimension', 'season')
    .all()

  const urls = new Set<string>()
  urls.add('/')

  // Categories that actually have guidelines.
  const cats = new Set(docs.map((d) => d.category))
  for (const c of Object.keys(CATEGORY_LABELS)) if (cats.has(c)) urls.add(`/guidelines/${c}/`)

  // Dimensions that actually have guidelines.
  const dims = new Set(docs.map((d) => d.dimension))
  for (const dslug of Object.keys(DIMENSION_LABELS)) if (dims.has(dslug)) urls.add(`/dimensions/${dslug}/`)

  // A season's collection page, once it actually has guidelines.
  const seasons = new Set(docs.map((d: any) => d.season).filter(Boolean))
  for (const [season, path] of Object.entries(SEASON_COLLECTIONS)) {
    if (seasons.has(season)) urls.add(path)
  }

  // Each guideline.
  for (const d of docs) urls.add(withTrailingSlash(d.path))

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls]
      .map((u) => `  <url><loc>${canonicalUrl(u)}</loc></url>`)
      .join('\n') +
    `\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml')
  return body
})
