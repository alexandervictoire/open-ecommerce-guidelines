# CLAUDE.md — Conventions for this repository

This is a public, community-maintained collection of e-commerce guidelines,
published as a static docs site (Nuxt 3 + Nuxt Content + UnoCSS, deployed on
Vercel). Content is Markdown; the site is a reference implementation of
agent-readable content (semantic HTML, JSON-LD, sitemap, fast static pages).

Read `PLAN.md` for the full project brief. This file is the day-to-day contract
for editing content and code.

## Guideline frontmatter schema

Every file in `content/guidelines/**` MUST have exactly this frontmatter:

```yaml
---
id: CART-DC-QTY-01            # uppercase, unique, immutable once published
title: Cart quantity value remains fully readable at all supported quantities
category: cart                 # enum: plp | pdp | cart | checkout | global
dimension: decision-clarity    # kebab-case (see dimension list below)
severity: high                 # enum: low | medium | high | critical
targets: [human, agent]        # array; subset of [human, agent, machine]
status: published              # enum: draft | published | deprecated
shopware_status: no_divergence # not_applicable | no_divergence | platform_specific
shopify_status: no_divergence  # not_applicable | no_divergence | platform_specific
regulation: ["Dir 2011/83/EU Art. 8(2)", "BGB §312j(3) (DE)"]  # optional
jurisdiction: [eu, de]         # optional; eu and/or lowercase ISO country codes
audience: [b2c]                # optional; subset of [b2c, b2b]
---
```

The last three fields are optional and absent on most guidelines — see "Legal
references and audience" below.

> **`targets` note:** PLAN §3's example lists `[human, agent]`, but the source
> content also uses `machine` (machine-readability is a first-class concern for
> this project). The valid set is therefore `[human, agent, machine]`.

> **Release policy (maintainer decision):** everything goes live, new guidelines
> included. Guidelines are released and revised afterwards, so others can review
> and correct them on the live site. `status: draft` marks a guideline with
> genuinely large uncertainty — it does not hold the guideline back.

> **Status on the site:** `published` and `draft` guidelines are both live in
> every build: listed, in navigation and the sitemap, with a detail page
> (`LISTED_STATUSES` in `utils/labels.ts`). A draft carries a "Draft" badge in
> lists and on its page, a notice that it may still change with a link to edit
> it, and `creativeWorkStatus: Draft` in its JSON-LD. `deprecated` guidelines
> are not listed, and since detail pages are prerendered by following links,
> their page is not generated either: the URL returns 404. The file stays so the
> ID remains reserved. A guideline must only cross-reference guidelines that
> exist under `content/` and are not deprecated.

> **Reserved `id` gotcha:** Nuxt Content v3 reserves the `id` field internally
> (it stores the file key there), so a guideline's own `id:` frontmatter is
> **not queryable** — `doc.id` returns the internal path. Keep `id:` in the
> frontmatter anyway (it is the human-facing, immutable identifier and the
> converter validates it), but the site derives the display id from the
> filename via `deriveGuidelineId(stem)` in `utils/labels.ts`. This works
> because the filename is the lowercased id by contract.

### Body sections — exact headings, exact order

```markdown
## What is being checked
## Why it matters
## Failure signals
## How to verify
## Recommended fix
```

All five must be present and non-empty. `Failure signals` is a `-` bullet list;
`How to verify` is a numbered list (one step per line).

### Platform sections (optional, always last)

```markdown
## Shopware specific
## Shopify specific
```

Present **only** when the matching `*_status` is `platform_specific`; absent for
`no_divergence` (the default) and `not_applicable`. Missing status field means
`no_divergence`. The five core sections stay vendor-neutral — the platform
sections are the one place where product names, default storefront behavior, and
plugin types belong.

`npm run validate` (wired into `build`/`generate`) fails the build on any
mismatch between status and section. See `utils/platforms.ts` for the shared
logic and `scripts/validate-guidelines.mjs` for the rules.

> **Do not guess platform behavior.** The classification per guideline is a
> manual, maintainer-owned judgement. Leave `no_divergence` unless the actual
> platform default is known.

### Categories

- `plp` — listings: category pages, collections, search results
- `pdp` — the product detail page
- `cart` — cart page and cart drawer
- `checkout` — checkout through to the order confirmation
- `global` — conditions that hold on every page rather than one funnel step
  (site chrome, legal reachability, consent layer, trust marks, market access)

`CATEGORY_ORDER` in `utils/labels.ts` follows the funnel, `global` last; it sets
the order on the homepage and in the header. Categories without a visible
guideline get no page and no navigation entry.

### Legal references and audience (optional)

- `regulation` — double-quoted citations (the validator parses the field as a
  JSON list, because citations contain commas and brackets). Citations are
  pointers to the provision a reviewer should read, never legal conclusions;
  the guideline page renders them as plain text with a not-legal-advice notice
  (`LEGAL_DISCLAIMER` in `utils/legal.ts`). EU instruments before national ones.
  Every citation must belong to an instrument in `utils/regulations.json` (it
  contains one of the instrument's `match` strings; an amending act can be a
  second instrument). The validator fails otherwise. A new directive, law,
  standard or court decision adds an entry or a `match` string there — a court
  decision goes under the instrument it interprets. The registry drives the
  "Legal reference" dropdown on category and dimension pages
  (`?regulation=<instrument id>`), which lists only instruments cited on the page.
- `jurisdiction` — `eu` and/or lowercase ISO country codes. Absent means the
  guideline is not jurisdiction-bound.
- `audience` — `[b2c]` or `[b2b]`. Absent means it applies to both, which is the
  norm; restrict only where the guideline would be wrong or inapplicable for the
  other audience. Category and dimension pages offer an audience filter only
  when a guideline in the list is restricted.

> **Accessibility guidelines** are filed under the dimension matching what they
> check, not a separate dimension. Each must say in its own text that it is an
> accessibility requirement, name the standard and the specific success
> criteria, and carry them in `regulation` too.

### Dimensions (kebab-case enum, derived from content)

- `decision-clarity`
- `system-robustness`
- `semantic-integrity`
- `machine-extractability`
- `trust-decision-enablement`

Add a new dimension only when a guideline genuinely does not fit an existing one.

## ID scheme

Format: `<CATEGORY>-<DIMENSION-ABBREV>-<TOPIC>-<NN>`, uppercase.

- `CATEGORY` — matches the `category` enum (`PLP`, `PDP`, `CART`, `CHECKOUT`,
  `GLOBAL`).
- `DIMENSION-ABBREV` — short code per dimension. Canonical codes for **new**
  guidelines: `DC` decision-clarity · `SR` system-robustness ·
  `SI` semantic-integrity · `ME` machine-extractability ·
  `TDE` trust-decision-enablement.
- `TOPIC` — short uppercase topic slug (e.g. `PRICE`, `QTY`, `H1`).
- `NN` — two-digit sequence within that topic, starting `01`.

The `id` is **immutable once published**. The filename is the lowercased id
(`content/guidelines/pdp/pdp-dc-price-01.md`).

> **Legacy abbreviations:** some already-published IDs carried over from the
> original export use variant codes — `C` and `MERCH` (decision-clarity),
> `MI` (semantic-integrity), `TD` and `TE` (trust-decision-enablement). These
> are immutable and left as-is; the `dimension` frontmatter field is the source
> of truth for browsing/filtering. Use the canonical codes above for new IDs.

> **Retired, never published:** `PDP-SR-VAR-01` ("Active Variant State
> Synchronization") exists only as a row in the Notion export. It is
> deliberately not published — its checks are covered by `PDP-SI-IMAGE-01`,
> `PDP-MI-ID-01`, `PDP-SR-VARIANT-01` and `PDP-SI-SURFACE-01` — and the converter
> refuses it. Do not reuse the ID.

## Score policy (do not violate)

"Max Score" belongs to the maintainer's private audit/scoring system and MUST
NOT appear anywhere in this repo — not in frontmatter, body, comments, or
scripts' output. The repo is public; even unrendered frontmatter would leak the
scoring model. The conversion script silently drops the field and **fails
validation** on any output that contains a score-like field. If a score field
appears in a contributor PR or a converted file, remove it before merge.

## Writing style for guidelines

- Imperative and testable. The five core sections stay vendor-neutral; only the
  platform sections may name platforms and their defaults. No marketing language
  anywhere.
- Every guideline must be verifiable by following the steps in "How to verify".
- Describe observable behavior and DOM/UX facts, not opinions.
- Never modify a published guideline's `id`. A breaking change to its meaning
  requires deprecating it (`status: deprecated`) and minting a new ID.

## Commands

Node is provided via nvm (`nvm use` picks up the repo default). Then:

```bash
npm install            # install deps (better-sqlite3 backs Nuxt Content)
npm run dev            # local dev server
npm run validate       # validate all guidelines (runs automatically on build)
npm run generate       # fully static build (nuxt generate) → .output/public
npm run preview        # preview the generated build

# Create guidelines from a Notion export (a CSV) that do not exist yet:
node scripts/convert-notion.mjs <path-to-notion-export.csv>
# Regenerate existing files from the export (discards repo edits to core sections):
node scripts/convert-notion.mjs <path-to-notion-export.csv> --overwrite
```

> **The repo is the source of truth, not Notion.** Nothing syncs from Notion;
> the converter only runs when started by hand. By default it leaves existing
> files untouched. Only `--overwrite` regenerates them, and it carries over
> platform status, platform sections and the legal fields but replaces the five
> core sections —
> so never use it on a guideline whose core text has been edited in the repo.

> **Conversion input note:** PLAN §5 describes the export as a folder of Notion
> Markdown files; the actual export the maintainer provided is a single CSV
> (`notion-export.csv`) with one row per guideline. The script parses the CSV.
> The field→frontmatter mapping in PLAN §3 is unchanged. If a future export is a
> Markdown folder instead, the script's input parsing is the only part to swap.
