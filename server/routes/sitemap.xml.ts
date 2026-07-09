import { SITE_URL } from '~/utils/site'
import { CATEGORY_LABELS, DIMENSION_LABELS } from '~/utils/labels'

// Static sitemap generated at prerender time from the guidelines collection.
export default defineEventHandler(async (event) => {
  const docs = await queryCollection(event, 'guidelines')
    .where('status', '=', 'published')
    .select('path', 'category', 'dimension')
    .all()

  const urls = new Set<string>()
  urls.add('/')

  // Categories that actually have guidelines.
  const cats = new Set(docs.map((d) => d.category))
  for (const c of Object.keys(CATEGORY_LABELS)) if (cats.has(c)) urls.add(`/guidelines/${c}/`)

  // Dimensions that actually have guidelines.
  const dims = new Set(docs.map((d) => d.dimension))
  for (const dslug of Object.keys(DIMENSION_LABELS)) if (dims.has(dslug)) urls.add(`/dimensions/${dslug}/`)

  // Each guideline.
  for (const d of docs) urls.add(d.path)

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls]
      .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
      .join('\n') +
    `\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml')
  return body
})
