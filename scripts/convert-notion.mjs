#!/usr/bin/env node
// convert-notion.mjs — Notion export -> schema-conformant guideline Markdown.
//
// PLAN §5 describes the export as a folder of Notion Markdown files. The export
// the maintainer actually provided is a single CSV (one row per guideline), so
// this script parses CSV. The field -> frontmatter mapping (PLAN §3) is
// unchanged; only the input reader differs. See CLAUDE.md.
//
// Usage: node scripts/convert-notion.mjs <path-to-notion-export.csv> [--overwrite]
//
// The Markdown files in the repo are the source of truth; Notion is not synced.
// By default the script only creates guidelines that do not exist yet and leaves
// existing files untouched, so a forgotten run cannot discard edits made in the
// repo. `--overwrite` regenerates existing files from the export: the core
// sections are replaced (repo edits to them are lost); the platform status
// fields, platform sections and legal fields (audience, regulation,
// jurisdiction) are carried over.
//
// Guarantees: drops "Max Score" (PLAN §4), validates every output, skips (never
// emits) broken guidelines, is idempotent, prints a summary.

import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_ROOT = join(REPO_ROOT, 'content', 'guidelines')

// ---- Enums (PLAN §3; dimensions derived from content, see CLAUDE.md) --------
const CATEGORIES = new Set(['plp', 'pdp', 'cart', 'checkout', 'global'])
const SEVERITIES = new Set(['low', 'medium', 'high', 'critical'])
const TARGETS = new Set(['human', 'agent', 'machine'])
const TARGET_ORDER = ['human', 'agent', 'machine']
const DIMENSIONS = new Set([
  'decision-clarity',
  'system-robustness',
  'semantic-integrity',
  'machine-extractability',
  'trust-decision-enablement'
])

const SECTION_ORDER = [
  ['whatIsChecked', 'What is being checked'],
  ['whyItMatters', 'Why it matters'],
  ['failureSignals', 'Failure signals'],
  ['howToVerify', 'How to verify'],
  ['recommendedFix', 'Recommended fix']
]

// ---- Minimal RFC-4180-ish CSV parser (no deps) ------------------------------
function parseCsv(text) {
  // Strip UTF-8 BOM if present.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } // escaped quote
        else inQuotes = false
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field); field = ''
    } else if (c === '\r') {
      // handled by \n; ignore lone \r
      if (text[i + 1] === '\n') i++
      row.push(field); field = ''; rows.push(row); row = []
    } else if (c === '\n') {
      row.push(field); field = ''; rows.push(row); row = []
    } else {
      field += c
    }
  }
  // Flush trailing field/row (unless the file ended on a newline).
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row) }
  return rows
}

function toRecords(text) {
  const rows = parseCsv(text)
  if (rows.length === 0) return []
  const header = rows[0].map((h) => h.trim())
  const records = []
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r]
    // Skip fully empty lines.
    if (cells.every((c) => c.trim() === '')) continue
    const rec = {}
    header.forEach((key, idx) => { rec[key] = (cells[idx] ?? '').trim() })
    records.push(rec)
  }
  return records
}

// ---- Field transforms -------------------------------------------------------
function kebab(s) {
  return s.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function normalizeSeverity(s) {
  return s.toLowerCase().replace(/[^a-z]/g, '') // strips emoji/whitespace: "CRITICAL ‼️" -> "critical"
}

function toTargets(s) {
  const parts = s.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
  const uniq = [...new Set(parts)]
  // Canonical order for deterministic, idempotent output.
  return uniq.sort((a, b) => TARGET_ORDER.indexOf(a) - TARGET_ORDER.indexOf(b))
}

// Literal HTML-tag mentions in prose (e.g. "<h1>") must not render as real
// elements. Wrap them as inline code so they display as text. Safe here: the
// only angle-bracket tokens in the source are element names (verified), and
// bare "<" as a less-than sign does not occur.
function escapeTags(s) {
  return s.replace(/<\/?[a-zA-Z][a-zA-Z0-9]*[^>]*>/g, (m) => `\`${m}\``)
}

function toBulletList(s) {
  const lines = s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  return lines.map((l) => `- ${l.replace(/^[-*]\s*/, '')}`).join('\n')
}

function toNumberedList(s) {
  let steps = s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (steps.length <= 1) {
    // Single prose block: one step per sentence.
    steps = (steps[0] ?? '').split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map((x) => x.trim()).filter(Boolean)
  }
  steps = steps.map((l) => l.replace(/^\d+[.)]\s*/, '').replace(/^[-*]\s*/, '')).filter(Boolean)
  return steps.map((l, i) => `${i + 1}. ${l}`).join('\n')
}

// ---- Build one guideline from a record --------------------------------------
function buildGuideline(rec) {
  const id = (rec['Criterion ID'] || '').trim().toUpperCase()
  const g = {
    id,
    title: (rec['Criterion Name'] || '').trim(),
    category: (rec['Audit Type'] || '').trim().toLowerCase(),
    dimension: kebab(rec['Dimension'] || ''),
    severity: normalizeSeverity(rec['Severity'] || ''),
    targets: toTargets(rec['Target'] || ''),
    status: 'published',
    sections: {
      whatIsChecked: escapeTags((rec['What is being checked?'] || '').trim()),
      whyItMatters: escapeTags((rec['Operational Impact'] || '').trim()),
      failureSignals: escapeTags(toBulletList(rec['Failure Signals'] || '')),
      howToVerify: escapeTags(toNumberedList(rec['How to verify?'] || '')),
      recommendedFix: escapeTags((rec['Default Fix'] || '').trim())
    }
  }
  return g
}

// ---- Validation (PLAN §4, §5) -----------------------------------------------
function validate(g) {
  const errs = []
  if (!g.id) errs.push('missing id')
  else if (!/^[A-Z0-9]+(-[A-Z0-9]+)+$/.test(g.id)) errs.push(`malformed id "${g.id}"`)
  if (!g.title) errs.push('missing title')
  if (!CATEGORIES.has(g.category)) errs.push(`illegal category "${g.category}"`)
  if (!DIMENSIONS.has(g.dimension)) errs.push(`illegal dimension "${g.dimension}"`)
  if (!SEVERITIES.has(g.severity)) errs.push(`illegal severity "${g.severity}"`)
  if (g.targets.length === 0) errs.push('empty targets')
  for (const t of g.targets) if (!TARGETS.has(t)) errs.push(`illegal target "${t}"`)
  for (const [key, heading] of SECTION_ORDER) {
    if (!g.sections[key] || !g.sections[key].trim()) errs.push(`empty section "${heading}"`)
  }
  return errs
}

function filenameFor(g) {
  return join(OUT_ROOT, g.category, `${g.id.toLowerCase()}.md`)
}

// ---- Repo-maintained data ---------------------------------------------------
// The Notion export has no platform or legal columns: platform classification and
// the legal fields are maintained by hand in the Markdown files. `--overwrite`
// must therefore carry over whatever is already on disk instead of dropping it.
const PLATFORMS = [
  { key: 'shopware', field: 'shopware_status', heading: 'Shopware specific' },
  { key: 'shopify', field: 'shopify_status', heading: 'Shopify specific' }
]
const DEFAULT_PLATFORM_STATUS = 'no_divergence'
const LEGAL_FIELDS = ['audience', 'regulation', 'jurisdiction']

function readExistingRepoData(path) {
  const result = { legal: [] }
  for (const p of PLATFORMS) result[p.key] = { status: DEFAULT_PLATFORM_STATUS, section: null }
  if (!existsSync(path)) return result

  const text = readFileSync(path, 'utf8')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!match) return result
  const [, fm, body] = match

  // Legal fields are copied line for line, in the order written in the file.
  for (const line of fm.split(/\r?\n/)) {
    if (LEGAL_FIELDS.some((field) => line.startsWith(`${field}:`))) result.legal.push(line)
  }

  for (const p of PLATFORMS) {
    const status = new RegExp(`^${p.field}:\\s*(\\S+)\\s*$`, 'm').exec(fm)
    if (status) result[p.key].status = status[1]

    // Section runs from its heading to the next H2 (or end of file).
    const section = new RegExp(`^## ${p.heading}\\s*$([\\s\\S]*?)(?=^## |\\s*$(?![\\s\\S]))`, 'm').exec(body)
    if (section) {
      const content = section[1].trim()
      if (content) result[p.key].section = content
    }
  }
  return result
}

function render(g, platform) {
  const fm = [
    '---',
    `id: ${g.id}`,
    `title: ${g.title}`,
    `category: ${g.category}`,
    `dimension: ${g.dimension}`,
    `severity: ${g.severity}`,
    `targets: [${g.targets.join(', ')}]`,
    `status: ${g.status}`,
    ...PLATFORMS.map((p) => `${p.field}: ${platform[p.key].status}`),
    ...platform.legal,
    '---',
    ''
  ].join('\n')
  const sections = SECTION_ORDER.map(([key, heading]) => `## ${heading}\n\n${g.sections[key]}`)
  // Platform sections stay last, and only exist for `platform_specific`.
  for (const p of PLATFORMS) {
    if (platform[p.key].status === 'platform_specific' && platform[p.key].section) {
      sections.push(`## ${p.heading}\n\n${platform[p.key].section}`)
    }
  }
  return `${fm}\n${sections.join('\n\n')}\n`
}

// A converted file must never contain a score field (PLAN §4).
function containsScore(text) {
  return /(^|\n)\s*(max[_\s-]*)?score\s*:/i.test(text) || /max\s*score/i.test(text)
}

// ---- Main -------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2)
  const overwrite = args.includes('--overwrite')
  const input = args.find((a) => !a.startsWith('--'))
  if (!input) {
    console.error('Usage: node scripts/convert-notion.mjs <path-to-notion-export.csv> [--overwrite]')
    process.exit(1)
  }
  const text = readFileSync(resolve(input), 'utf8')
  const records = toRecords(text)

  let converted = 0
  const kept = []
  const skipped = []
  const seenIds = new Map()

  for (let i = 0; i < records.length; i++) {
    const rec = records[i]
    const label = (rec['Criterion ID'] || rec['Criterion Name'] || `row ${i + 1}`).trim() || `row ${i + 1}`
    const g = buildGuideline(rec)
    const errs = validate(g)

    if (g.id && seenIds.has(g.id)) errs.push(`duplicate id (also on ${seenIds.get(g.id)})`)

    if (errs.length === 0) {
      const path = filenameFor(g)
      if (existsSync(path) && !overwrite) {
        seenIds.set(g.id, label)
        kept.push(label)
        continue
      }
      const out = render(g, readExistingRepoData(path))
      if (containsScore(out)) {
        skipped.push({ label, reasons: ['output contains a score field'] })
        continue
      }
      mkdirSync(dirname(path), { recursive: true })
      writeFileSync(path, out, 'utf8')
      seenIds.set(g.id, label)
      converted++
    } else {
      skipped.push({ label, reasons: errs })
    }
  }

  // ---- Summary --------------------------------------------------------------
  console.log(`\nConversion complete.`)
  console.log(`  Written:   ${converted}`)
  console.log(`  Kept:      ${kept.length}${kept.length ? ' (file exists — pass --overwrite to regenerate from the export)' : ''}`)
  console.log(`  Skipped:   ${skipped.length}`)
  for (const s of skipped) {
    console.log(`    - ${s.label}: ${s.reasons.join('; ')}`)
  }
  console.log('')

  // Non-zero exit if no row was usable at all (likely a wrong input file).
  if (converted === 0 && kept.length === 0) process.exit(1)
}

main()
