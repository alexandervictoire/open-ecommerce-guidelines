#!/usr/bin/env node
// validate-guidelines.mjs — build-time gate for content/guidelines/**.
//
// Runs before `nuxt build` / `nuxt generate` (see package.json). Exits non-zero
// with a report so a broken guideline fails the build instead of shipping.
//
// Checks:
//   - frontmatter enums are legal (incl. the two platform status fields)
//   - optional legal fields are well-formed: regulation, jurisdiction, audience
//   - every citation belongs to an instrument in utils/regulations.json, and the
//     registry itself is well-formed
//   - id matches the filename (filename = lowercased id, by contract), and the
//     file sits in the directory named by its category
//   - the five core H2 sections exist, in order, non-empty
//   - platform status <-> platform section coupling:
//       platform_specific  => the matching section MUST exist
//       otherwise          => the section MUST NOT exist
//   - no score-like field anywhere (score policy, PLAN §4)
//
// Usage: node scripts/validate-guidelines.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_ROOT = join(REPO_ROOT, 'content', 'guidelines')

const CATEGORIES = ['plp', 'pdp', 'cart', 'checkout', 'global']
const SEVERITIES = ['low', 'medium', 'high', 'critical']
const TARGETS = ['human', 'agent', 'machine']
const STATUSES = ['draft', 'published', 'deprecated']
const DIMENSIONS = [
  'decision-clarity',
  'system-robustness',
  'semantic-integrity',
  'machine-extractability',
  'trust-decision-enablement'
]

const CORE_SECTIONS = [
  'What is being checked',
  'Why it matters',
  'Failure signals',
  'How to verify',
  'Recommended fix'
]

// Keep in sync with utils/platforms.ts.
const PLATFORMS = ['shopware', 'shopify']
const PLATFORM_LABELS = { shopware: 'Shopware', shopify: 'Shopify' }
const PLATFORM_STATUSES = ['not_applicable', 'no_divergence', 'platform_specific']
const DEFAULT_PLATFORM_STATUS = 'no_divergence'

// Legal anchoring (all optional; see CLAUDE.md).
const AUDIENCES = ['b2c', 'b2b']
const JURISDICTION_PATTERN = /^(eu|[a-z]{2})$/

// Instrument registry behind the regulation filter, shared with utils/legal.ts.
const REGULATIONS_FILE = join(REPO_ROOT, 'utils', 'regulations.json')
const INSTRUMENT_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const INSTRUMENT_GROUP_PATTERN = /^(eu|standard|[a-z]{2})$/

// Keep in sync with instrumentsFor() in utils/legal.ts.
const instrumentsFor = (registry, citation) =>
  registry.filter((i) => i.match.some((m) => citation.includes(m))).map((i) => i.id)

const sectionHeading = (p) => `${PLATFORM_LABELS[p]} specific`

function walk(dir) {
  const out = []
  let entries
  try { entries = readdirSync(dir) } catch { return out }
  for (const entry of entries) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.md')) out.push(full)
  }
  return out
}

// Split leading frontmatter from the body. Returns null if absent.
function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text)
  if (!match) return null
  return { fm: match[1], body: match[2] }
}

// The frontmatter our converter and contributors write is flat `key: value`.
function parseFrontmatter(fm) {
  const out = {}
  for (const line of fm.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    out[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return out
}

// `regulation` values contain commas and brackets of their own, so the field is
// written as a flow sequence of double-quoted strings, which is also valid JSON.
function parseQuotedList(value) {
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) && parsed.every((v) => typeof v === 'string') ? parsed : null
  } catch {
    return null
  }
}

function parseList(value) {
  return String(value ?? '')
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

// H2 headings with their content, ignoring fenced code blocks.
function parseSections(body) {
  const withoutFences = body.replace(/^```[\s\S]*?^```/gm, '')
  const sections = []
  const re = /^##[ \t]+(.+?)[ \t]*$/gm
  let match
  const marks = []
  while ((match = re.exec(withoutFences)) !== null) {
    marks.push({ title: match[1].trim(), start: match.index, end: re.lastIndex })
  }
  for (let i = 0; i < marks.length; i++) {
    const next = i + 1 < marks.length ? marks[i + 1].start : withoutFences.length
    sections.push({
      title: marks[i].title,
      content: withoutFences.slice(marks[i].end, next).trim()
    })
  }
  return sections
}

// The registry is data the site renders, so a broken entry fails the build too.
function loadRegistry() {
  const rel = relative(REPO_ROOT, REGULATIONS_FILE)
  let registry
  try {
    registry = JSON.parse(readFileSync(REGULATIONS_FILE, 'utf8'))
  } catch (error) {
    return { registry: [], failures: [{ file: rel, errors: [`cannot read registry: ${error.message}`] }] }
  }
  if (!Array.isArray(registry)) return { registry: [], failures: [{ file: rel, errors: ['registry must be a JSON array'] }] }

  const errors = []
  const seen = new Set()
  registry.forEach((entry, index) => {
    const at = `entry ${index + 1}${entry?.id ? ` ("${entry.id}")` : ''}`
    if (!INSTRUMENT_ID_PATTERN.test(entry?.id ?? '')) errors.push(`${at}: \`id\` must be kebab-case`)
    else if (seen.has(entry.id)) errors.push(`${at}: duplicate id`)
    else seen.add(entry.id)
    for (const field of ['label', 'reference']) {
      if (typeof entry?.[field] !== 'string' || !entry[field].trim()) errors.push(`${at}: missing \`${field}\``)
    }
    if (!INSTRUMENT_GROUP_PATTERN.test(entry?.group ?? '')) errors.push(`${at}: \`group\` must be "eu", "standard" or a lowercase country code`)
    if (!Array.isArray(entry?.match) || entry.match.length === 0 || entry.match.some((m) => typeof m !== 'string' || !m.trim())) {
      errors.push(`${at}: \`match\` must be a non-empty list of non-empty strings`)
    }
  })
  return { registry: errors.length ? [] : registry, failures: errors.length ? [{ file: rel, errors }] : [] }
}

function validateFile(file, registry) {
  const errors = []
  const rel = relative(REPO_ROOT, file)
  const text = readFileSync(file, 'utf8')

  const split = splitFrontmatter(text)
  if (!split) return [{ file: rel, errors: ['missing or malformed frontmatter'] }]

  const fm = parseFrontmatter(split.fm)
  const sections = parseSections(split.body)
  const titles = sections.map((s) => s.title)

  // ---- frontmatter enums --------------------------------------------------
  const id = (fm.id ?? '').trim()
  if (!id) errors.push('missing `id`')
  else {
    const expected = `${id.toLowerCase()}.md`
    const actual = file.split('/').pop()
    if (expected !== actual) errors.push(`filename "${actual}" does not match id "${id}" (expected "${expected}")`)
  }
  if (!fm.title) errors.push('missing `title`')
  if (!CATEGORIES.includes(fm.category)) errors.push(`illegal category "${fm.category}"`)
  else {
    // The directory decides the URL, so it must agree with the frontmatter.
    const directory = file.split('/').slice(-2, -1)[0]
    if (directory !== fm.category) errors.push(`category "${fm.category}" but file lives in "${directory}/"`)
  }
  if (!DIMENSIONS.includes(fm.dimension)) errors.push(`illegal dimension "${fm.dimension}"`)
  if (!SEVERITIES.includes(fm.severity)) errors.push(`illegal severity "${fm.severity}"`)
  if (!STATUSES.includes(fm.status)) errors.push(`illegal status "${fm.status}"`)

  const targets = parseList(fm.targets)
  if (targets.length === 0) errors.push('empty `targets`')
  for (const t of targets) if (!TARGETS.includes(t)) errors.push(`illegal target "${t}"`)

  // ---- legal anchoring (optional fields) ----------------------------------
  if (fm.regulation !== undefined) {
    const regulation = parseQuotedList(fm.regulation)
    if (!regulation) errors.push('`regulation` must be a list of double-quoted strings, e.g. ["Dir 2011/83/EU Art. 8(2)"]')
    else if (regulation.length === 0 || regulation.some((r) => !r.trim())) errors.push('`regulation` must not be empty or contain empty entries')
    else if (registry.length) {
      for (const citation of regulation) {
        if (instrumentsFor(registry, citation).length === 0) {
          errors.push(`citation "${citation}" belongs to no instrument in utils/regulations.json (add the instrument, or a \`match\` string to an existing one)`)
        }
      }
    }
  }
  if (fm.jurisdiction !== undefined) {
    const jurisdiction = parseList(fm.jurisdiction)
    if (jurisdiction.length === 0) errors.push('`jurisdiction` is present but empty (omit it when the guideline is not jurisdiction-bound)')
    for (const j of jurisdiction) {
      if (!JURISDICTION_PATTERN.test(j)) errors.push(`illegal jurisdiction "${j}" (expected "eu" or a lowercase two-letter country code)`)
    }
  }
  if (fm.audience !== undefined) {
    const audience = parseList(fm.audience)
    if (audience.length === 0) errors.push('`audience` is present but empty (omit it when the guideline applies to both)')
    for (const a of audience) if (!AUDIENCES.includes(a)) errors.push(`illegal audience "${a}"`)
  }

  // ---- core sections ------------------------------------------------------
  const coreFound = titles.filter((t) => CORE_SECTIONS.includes(t))
  for (const heading of CORE_SECTIONS) {
    const section = sections.find((s) => s.title === heading)
    if (!section) errors.push(`missing section "## ${heading}"`)
    else if (!section.content) errors.push(`empty section "## ${heading}"`)
  }
  if (coreFound.length === CORE_SECTIONS.length && coreFound.join('|') !== CORE_SECTIONS.join('|')) {
    errors.push(`core sections out of order: ${coreFound.join(' -> ')}`)
  }

  // ---- platform status <-> section coupling -------------------------------
  for (const platform of PLATFORMS) {
    const field = `${platform}_status`
    const raw = fm[field]
    const status = raw === undefined ? DEFAULT_PLATFORM_STATUS : raw

    if (!PLATFORM_STATUSES.includes(status)) {
      errors.push(`illegal ${field} "${raw}" (expected one of: ${PLATFORM_STATUSES.join(', ')})`)
      continue
    }

    const heading = sectionHeading(platform)
    const section = sections.find((s) => s.title === heading)

    if (status === 'platform_specific') {
      if (!section) {
        errors.push(`${field} is "platform_specific" but section "## ${heading}" is missing`)
      } else if (!section.content) {
        errors.push(`section "## ${heading}" is empty`)
      }
    } else if (section) {
      errors.push(`section "## ${heading}" is present but ${field} is "${status}" (must be "platform_specific")`)
    }
  }

  // Platform sections must come last, after the five core sections.
  const platformHeadings = PLATFORMS.map(sectionHeading)
  const firstPlatformIdx = titles.findIndex((t) => platformHeadings.includes(t))
  if (firstPlatformIdx !== -1) {
    const trailing = titles.slice(firstPlatformIdx)
    const stray = trailing.filter((t) => !platformHeadings.includes(t))
    if (stray.length) errors.push(`section(s) after the platform block: ${stray.join(', ')}`)
    // Shopware before Shopify.
    const ordered = trailing.filter((t) => platformHeadings.includes(t))
    const expected = platformHeadings.filter((h) => ordered.includes(h))
    if (ordered.join('|') !== expected.join('|')) {
      errors.push(`platform sections out of order: ${ordered.join(' -> ')}`)
    }
  }

  // ---- score policy (PLAN §4) --------------------------------------------
  if (/(^|\n)\s*(max[_\s-]*)?score\s*:/i.test(text) || /max\s*score/i.test(text)) {
    errors.push('contains a score-like field — scores must never appear in this repo')
  }

  return errors.length ? [{ file: rel, errors }] : []
}

function main() {
  const files = walk(CONTENT_ROOT).sort()
  if (files.length === 0) {
    console.error(`No guidelines found under ${relative(REPO_ROOT, CONTENT_ROOT)}`)
    process.exit(1)
  }

  const { registry, failures: registryFailures } = loadRegistry()
  const failures = [...registryFailures, ...files.flatMap((file) => validateFile(file, registry))]

  if (failures.length === 0) {
    console.log(`✔ ${files.length} guidelines valid.`)
    return
  }

  console.error(`\n✖ Guideline validation failed — ${failures.length} of ${files.length} file(s):\n`)
  for (const failure of failures) {
    console.error(`  ${failure.file}`)
    for (const error of failure.errors) console.error(`    - ${error}`)
  }
  console.error('')
  process.exit(1)
}

main()
