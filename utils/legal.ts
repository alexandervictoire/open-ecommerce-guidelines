// Legal anchoring fields (see CLAUDE.md). All three are optional in frontmatter:
//
//   regulation   — the provisions a guideline relates to, as plain citations
//   jurisdiction — `eu` or a lowercase ISO country code; absent when the
//                  guideline is not jurisdiction-bound
//   audience     — `b2c` and/or `b2b`; absent when it applies to both
//
// The citations are pointers, not legal advice; the disclaimer below ships with
// every guideline page that shows them.

import REGULATIONS from './regulations.json'

export const AUDIENCES = ['b2c', 'b2b'] as const
export type Audience = (typeof AUDIENCES)[number]

export const AUDIENCE_LABELS: Record<Audience, string> = {
  b2c: 'B2C',
  b2b: 'B2B'
}

export function jurisdictionLabel(code: string): string {
  return code.toUpperCase()
}

export const LEGAL_DISCLAIMER =
  'Some guidelines reference legal provisions. These references identify the rules a guideline relates to. They are not legal advice, they are not a statement that any particular shop complies or does not comply, and they may not reflect the current state of national transposition. Consult qualified counsel for questions about your own compliance.'

// The filter value used in the URL (`?audience=b2b`); 'all' is the default and
// is represented by an absent query parameter.
export type AudienceFilterValue = Audience | 'all'

export function normalizeAudienceFilter(raw: unknown): AudienceFilterValue {
  const value = Array.isArray(raw) ? raw[0] : raw
  return (AUDIENCES as readonly string[]).includes(String(value))
    ? (String(value) as Audience)
    : 'all'
}

// A guideline without an audience applies to both, so it stays in every view.
export function matchesAudience(audience: string[], filter: AudienceFilterValue): boolean {
  return filter === 'all' || audience.length === 0 || audience.includes(filter)
}

// ---- Regulation filter ------------------------------------------------------
//
// Citations are free text ("Dir 2011/83/EU Art. 8(2)"), so the filter works on
// instruments instead: utils/regulations.json maps citations to the directive,
// regulation, national law or standard they belong to. A citation belongs to
// every instrument whose `match` string it contains, so a citation to an amended
// provision can name both the base act and the amending one. The validator fails
// on a citation that matches no instrument (keep the rule in sync with
// scripts/validate-guidelines.mjs).

export interface Instrument {
  id: string
  label: string // full name, e.g. "Consumer Rights Directive"
  reference: string // short form as cited, e.g. "Dir 2011/83/EU"
  group: string // `eu`, `standard`, or a lowercase country code
  match: string[]
}

export const INSTRUMENTS: Instrument[] = REGULATIONS

// Instrument ids a guideline's citations belong to, in registry order.
export function instrumentsFor(citations: string[]): string[] {
  return INSTRUMENTS.filter((i) => citations.some((c) => i.match.some((m) => c.includes(m)))).map((i) => i.id)
}

export function instrumentLabel(instrument: Instrument): string {
  return `${instrument.label} (${instrument.reference})`
}

export function instrumentGroupLabel(group: string): string {
  if (group === 'eu') return 'EU law'
  if (group === 'standard') return 'Standards'
  if (group === 'de') return 'German law'
  return `National law (${group.toUpperCase()})`
}

// The filter value used in the URL (`?regulation=consumer-rights`); 'all' is the
// default and is represented by an absent query parameter.
export function normalizeRegulationFilter(raw: unknown): string {
  const value = String(Array.isArray(raw) ? raw[0] : raw)
  return INSTRUMENTS.some((i) => i.id === value) ? value : 'all'
}

// Unlike audience, a selected instrument hides guidelines without a citation.
export function matchesRegulation(instruments: string[], filter: string): boolean {
  return filter === 'all' || instruments.includes(filter)
}
