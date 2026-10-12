import guidelineDates from '~/guideline-dates.json'
import { LISTED_STATUSES, deriveGuidelineId } from '~/utils/labels'
import { SITE_NAME, canonicalUrl } from '~/utils/site'

// Machine-readable index of the collection, generated at prerender time and
// served as a static file (/guidelines.json). It carries metadata only — no
// guideline body — so other sites can list, link and embed a short card without
// copying the content. The schema is documented in CLAUDE.md; treat it as a
// public contract and only add fields.

const SCHEMA_VERSION = 1
const DESCRIPTION_SENTENCES = 2
const DESCRIPTION_MAX_CHARS = 320

// Nuxt Content stores the body as `minimark`: nested [tag, props, ...children]
// arrays where the children are either strings or further nodes.
function nodeText(node: unknown): string {
  if (typeof node === 'string') return node
  if (!Array.isArray(node)) return ''
  return node.slice(2).map(nodeText).join('')
}

// First paragraph of "What is being checked", cut to a couple of sentences.
// That section states the observable condition, which is exactly what a short
// description needs to say.
function summarise(doc: Record<string, any>): string {
  const nodes: unknown[] = Array.isArray(doc?.body?.value) ? doc.body.value : []
  const start = nodes.findIndex(
    (node) => Array.isArray(node) && node[0] === 'h2' && node[1]?.id === 'what-is-being-checked'
  )
  if (start === -1) return ''

  let text = ''
  for (const node of nodes.slice(start + 1)) {
    if (Array.isArray(node) && node[0] === 'h2') break
    if (Array.isArray(node) && node[0] === 'p') {
      text = nodeText(node).trim()
      break
    }
  }
  if (!text) return ''

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g)
  const summary = sentences ? sentences.slice(0, DESCRIPTION_SENTENCES).join('').trim() : text
  return summary.length > DESCRIPTION_MAX_CHARS
    ? `${summary.slice(0, DESCRIPTION_MAX_CHARS).trimEnd()}…`
    : summary
}

// When each guideline last changed, from the committed guideline-dates.json.
// Reading git here does not work: Vercel's checkout has no usable per-file
// history, so every date collapsed onto the build day. scripts/guideline-dates.mjs
// generates the file and `npm run validate` keeps it honest.
const dates = guidelineDates as Record<string, string>

function lastModified(id: string): string {
  return dates[id] ?? new Date().toISOString()
}

export default defineEventHandler(async (event) => {
  const docs = await queryCollection(event, 'guidelines')
    .where('status', 'IN', LISTED_STATUSES)
    .all()

  const guidelines = docs
    .map((doc: any) => {
      const id = deriveGuidelineId(doc.stem)
      return {
        id,
        title: doc.title,
        description: summarise(doc),
        category: doc.category,
        dimension: doc.dimension,
        severity: doc.severity,
        status: doc.status,
        url: canonicalUrl(doc.path),
        updatedAt: lastModified(id)
      }
    })
    .sort((a, b) => a.id.localeCompare(b.id))

  setHeader(event, 'content-type', 'application/json; charset=utf-8')
  return {
    schemaVersion: SCHEMA_VERSION,
    name: SITE_NAME,
    url: canonicalUrl('/'),
    license: 'https://creativecommons.org/licenses/by-sa/4.0/',
    generatedAt: new Date().toISOString(),
    count: guidelines.length,
    guidelines
  }
})
