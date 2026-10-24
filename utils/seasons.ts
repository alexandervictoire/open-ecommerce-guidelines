// Seasonal guidelines.
//
// A guideline without a `season` applies year-round, which is the norm. One
// with a season applies in addition to those, in a particular stretch of the
// year, and the site says so wherever it is listed.
//
// The list of allowed values lives in `seasons.json` because two toolchains
// need it: this file for the site and the schema, and
// `scripts/validate-guidelines.mjs`, which is plain Node and cannot read a
// TypeScript module. Adding a season is one entry there plus one line in each
// map below.

import seasons from './seasons.json'

export const SEASONS = seasons as ['holiday', ...string[]]
export type Season = (typeof SEASONS)[number]

/** The pill reads the same for every season; the page it links to explains it. */
export const SEASON_BADGE_LABEL = 'Seasonal'

/** Where a season's own collection page lives. */
export const SEASON_COLLECTIONS: Record<string, string> = {
  holiday: '/collections/holiday/'
}

/** The line under the meta row on a seasonal guideline's page. */
export const SEASON_NOTES: Record<string, string> = {
  holiday:
    'Seasonal guideline. Applies in the run-up to Black Friday, Cyber Week and Christmas, in addition to the year-round guidelines.'
}

export function isSeason(value: unknown): value is Season {
  return typeof value === 'string' && (SEASONS as readonly string[]).includes(value)
}

export function seasonCollection(season: string): string | null {
  return SEASON_COLLECTIONS[season] ?? null
}

export function seasonNote(season: string): string | null {
  return SEASON_NOTES[season] ?? null
}
