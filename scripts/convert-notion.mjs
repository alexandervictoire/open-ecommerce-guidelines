#!/usr/bin/env node
// convert-notion.mjs — Notion export -> schema-conformant guideline Markdown.
//
// PLAN §5 describes the export as a folder of Notion Markdown files. The export
// the maintainer actually provided is a single CSV (one row per guideline), so
// this script parses CSV. The field -> frontmatter mapping (PLAN §3) is
// unchanged; only the input reader differs. See CLAUDE.md.
//
// Usage: node scripts/convert-notion.mjs <path-to-notion-export.csv>
//
// Guarantees: drops "Max Score" (PLAN §4), validates every output, skips (never
// emits) broken guidelines, is idempotent (per-file overwrite), prints a summary.

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_ROOT = join(REPO_ROOT, 'content', 'guidelines')

// ---- Enums (PLAN §3; dimensions derived from content, see CLAUDE.md) --------
const CATEGORIES = new Set(['pdp', 'cart', 'checkout'])
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
      whatIsChecked: (rec['What is being checked?'] || '').trim(),
      whyItMatters: (rec['Operational Impact'] || '').trim(),
      failureSignals: toBulletList(rec['Failure Signals'] || ''),
      howToVerify: toNumberedList(rec['How to verify?'] || ''),
      recommendedFix: (rec['Default Fix'] || '').trim()
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

function render(g) {
  const fm = [
    '---',
    `id: ${g.id}`,
    `title: ${g.title}`,
    `category: ${g.category}`,
    `dimension: ${g.dimension}`,
    `severity: ${g.severity}`,
    `targets: [${g.targets.join(', ')}]`,
    `status: ${g.status}`,
    '---',
    ''
  ].join('\n')
  const body = SECTION_ORDER.map(([key, heading]) => `## ${heading}\n\n${g.sections[key]}`).join('\n\n')
  return `${fm}\n${body}\n`
}

// A converted file must never contain a score field (PLAN §4).
function containsScore(text) {
  return /(^|\n)\s*(max[_\s-]*)?score\s*:/i.test(text) || /max\s*score/i.test(text)
}

// ---- Main -------------------------------------------------------------------
function main() {
  const input = process.argv[2]
  if (!input) {
    console.error('Usage: node scripts/convert-notion.mjs <path-to-notion-export.csv>')
    process.exit(1)
  }
  const text = readFileSync(resolve(input), 'utf8')
  const records = toRecords(text)

  let converted = 0
  const skipped = []
  const seenIds = new Map()

  for (let i = 0; i < records.length; i++) {
    const rec = records[i]
    const label = (rec['Criterion ID'] || rec['Criterion Name'] || `row ${i + 1}`).trim() || `row ${i + 1}`
    const g = buildGuideline(rec)
    const errs = validate(g)

    if (g.id && seenIds.has(g.id)) errs.push(`duplicate id (also on ${seenIds.get(g.id)})`)

    if (errs.length === 0) {
      const out = render(g)
      if (containsScore(out)) {
        skipped.push({ label, reasons: ['output contains a score field'] })
        continue
      }
      const path = filenameFor(g)
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
  console.log(`  Converted: ${converted}`)
  console.log(`  Skipped:   ${skipped.length}`)
  for (const s of skipped) {
    console.log(`    - ${s.label}: ${s.reasons.join('; ')}`)
  }
  console.log('')

  // Non-zero exit if nothing converted (likely a wrong input file).
  if (converted === 0) process.exit(1)
}

main()
