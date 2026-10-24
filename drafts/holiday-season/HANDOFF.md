# Handoff: holiday season batch

For the Claude Code session in this repository. The 18 guideline files in this
folder are final and approved by the maintainer. Read `README.md` here for the
selection rule and sources, and `CLAUDE.md` in the root for the conventions.

## Goal

Publish the 18 guidelines as **seasonal** guidelines, visibly separate from the
year-round ones:

1. a "Seasonal" pill wherever a guideline shows its badges,
2. a small section on the home page,
3. a collection page that lists only these guidelines.

Everything else about them (categories, dimensions, filters, JSON-LD, sitemap)
works like any other guideline.

## Steps

### 1. Schema: the `season` field

Each file carries `season: holiday` in its frontmatter. Make it a real,
optional field:

- `content.config.ts`: add `season: z.enum(['holiday']).optional()`.
- `scripts/validate-guidelines.mjs`: accept the field, reject unknown values.
  Keep the allowed seasons in one shared constant (e.g. `utils/seasons.ts`),
  so a future season is one entry, not three edits.
- `CLAUDE.md` and `CONTRIBUTING.md`: document the field next to the other
  optional fields. Absent means year-round, which is the norm.
- `server/routes/guidelines.json.ts`: add `season` to each entry when present.
  Adding a field is allowed without bumping `schemaVersion`.

### 2. Seasonal pill

New component `components/SeasonBadge.vue`, rendered next to
`SeverityBadge` and `StatusBadge` in `GuidelineList.vue` and on the detail page
`pages/guidelines/[category]/[id].vue`. Only rendered when `season` is set.

Look (approved in the preview): same shape and type as the other badges
(rounded-full, `px-2 py-0.5 text-xs font-medium uppercase tracking-wide`), but
**filled** instead of outlined, so it never reads as a severity:

- light: background `#e9f0f4`, text `#2c5468`
- dark: background `#1d2b33`, text `#9cc3d6`

Add both as theme colors in `uno.config.ts` (e.g. `season.bg`, `season.fg`)
rather than hard-coding them. Label: `Seasonal`.

On the detail page, add one line under the meta row, in the same colors:

> Seasonal guideline. Applies in the run-up to Black Friday, Cyber Week and
> Christmas, in addition to the year-round guidelines.

The line links to the collection page.

### 3. Collection page

Route: `/collections/holiday/` (not under `/guidelines/`, which is the
`[category]` route). Trailing slash, canonical and sitemap entry as for every
other page.

- Seasonal pill above the H1, H1 "Holiday readiness".
- Intro: "What to check before Black Friday, Cyber Week and Christmas. Each
  guideline is tied to this season and applies in addition to the year-round
  guidelines. Sorted by funnel step, most important first."
- List grouped by category in `CATEGORY_ORDER`, within each group sorted by
  severity (critical, high, medium, low), reusing `GuidelineList.vue`.
- The existing platform filter should work here too, if it drops in cleanly.
- `HelpBox` once at the bottom, like on category pages.
- JSON-LD: `CollectionPage` with an `ItemList` of the guidelines.

### 4. Home page section

In `pages/index.vue`, between the intro and "Browse by category". A bordered
block (`rounded-lg border border-line p-6`, like the category cards):

- Seasonal pill, then a small faint label "Black Friday to Christmas"
- H2 "Holiday readiness"
- Text: "Guidelines for the busiest weeks of the year: delivery before the
  holidays, gifting, honest sales and a shop that stays fast under load. They
  apply on top of the year-round guidelines."
- Counts, computed, not hard-coded: number of guidelines, how many are high or
  critical, how many categories.
- Link "Browse holiday readiness →" to the collection page.

Keep `SeasonalNote` (the Black Friday checklist pointer) as it is.

Show the section all year? Decision: **yes, always visible**. The guidelines
stay valid; only the moment they matter is seasonal.

### 5. Move the files and publish

1. Move each file from `drafts/holiday-season/<category>/` to
   `content/guidelines/<category>/`. Keep `README.md` and this file in
   `drafts/holiday-season/` as the review trail, like `drafts/batch-01/`.
2. `npm run validate` must pass except for missing date entries.
3. Commit, then `npm run dates` and commit `guideline-dates.json`.
4. `npm run generate` and check: the 18 detail pages, the collection page, the
   home page section, the pill in lists and on detail pages, light and dark.
5. One pull request, so all cross-references go live together.

## Not part of this task

- Platform sections. All 18 stay `no_divergence` until the maintainer has
  checked the Shopify and Shopware defaults (gift options, express checkout and
  back-in-stock notices are the likely candidates).
- Any change to guideline wording.
