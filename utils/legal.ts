// Legal anchoring fields (see CLAUDE.md). All three are optional in frontmatter:
//
//   regulation   — the provisions a guideline relates to, as plain citations
//   jurisdiction — `eu` or a lowercase ISO country code; absent when the
//                  guideline is not jurisdiction-bound
//   audience     — `b2c` and/or `b2b`; absent when it applies to both
//
// The citations are pointers, not legal advice; the disclaimer below ships with
// every guideline page that shows them.

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
