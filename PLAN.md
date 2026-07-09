# PLAN.md — Open E-Commerce Guidelines Project

> Execution brief for Claude Code. Read fully before scaffolding.
> Strategic decisions in this document are settled — do not re-litigate them.
> Working title used throughout: **ecom-guidelines** (rename is a find-and-replace later; do not block on naming).

## 1. What we are building

A public, community-maintained collection of e-commerce guidelines, published as a
static docs site. Think "Baymard meets MDN": UX guidelines PLUS technical guidelines
(performance, semantic structure, machine-readability, agentic-commerce readiness).

- Content = Markdown files in a public GitHub repo (docs-as-code).
- Site = Nuxt 3 + Nuxt Content, styled with UnoCSS, deployed on Vercel.
- Contributions = pull requests, reviewed and merged by the maintainer.
- The site must itself be a reference implementation of agent-readable content:
  clean semantic HTML, JSON-LD per guideline page, sitemap, fast static pages.

**MVP scope (this build):** repo structure, conversion of existing Notion-exported
guidelines, guideline pages, category + dimension browsing, homepage, README,
CONTRIBUTING.md, CLAUDE.md, Vercel-ready. Nothing else.

**Explicitly OUT of scope for MVP** (do not build, even if tempting):
search, JSON API export, i18n, dark mode toggle, newsletter, comments,
scoring/audit tooling, logo/branding work, personal-site integration.

## 2. Repository structure

```
ecom-guidelines/
├── CLAUDE.md                  # conventions for future Claude Code sessions (see §7)
├── README.md                  # project intro, how to run, how to contribute (short)
├── CONTRIBUTING.md            # contribution guide (see §8)
├── LICENSE                    # CC BY-SA 4.0 for /content, MIT for code — see §9
├── PLAN.md                    # this file
├── content/
│   └── guidelines/
│       ├── pdp/               # one folder per category
│       │   └── pdp-dc-xyz-01.md
│       ├── cart/
│       │   └── cart-dc-qty-01.md
│       └── checkout/
├── scripts/
│   └── convert-notion.mjs     # Notion export → guideline files (see §5)
├── app/ | pages/ | components/  # standard Nuxt 3 app structure
├── uno.config.ts
└── nuxt.config.ts
```

Filenames = lowercase guideline ID: `cart-dc-qty-01.md`.

## 3. Guideline frontmatter schema

Every file in `content/guidelines/**` MUST have exactly this frontmatter:

```yaml
---
id: CART-DC-QTY-01            # uppercase, unique, immutable once published
title: Cart quantity value remains fully readable at all supported quantities
category: cart                 # enum: pdp | cart | checkout (extendable)
dimension: decision-clarity    # kebab-case; derive enum list from actual content
severity: high                 # enum: low | medium | high | critical
targets: [human, agent]        # array; subset of [human, agent]
status: published              # enum: draft | published | deprecated
---
```

Body sections, in this exact order, using these exact H2 headings:

```markdown
## What is being checked
## Why it matters
## Failure signals
## How to verify
## Recommended fix
```

Mapping from the Notion export fields:

| Notion field           | Destination                          |
|------------------------|--------------------------------------|
| Criterion ID           | `id` + filename                      |
| (page title)           | `title`                              |
| Audit Type             | `category` (lowercased)              |
| Dimension              | `dimension` (kebab-cased)            |
| Severity               | `severity` (lowercased)              |
| Target                 | `targets` (split, lowercased, array) |
| Max Score              | DROPPED — see §4                     |
| What is being checked? | `## What is being checked`           |
| Operational Impact     | `## Why it matters`                  |
| Failure Signals        | `## Failure signals` (bullet list)   |
| How to verify?         | `## How to verify` (numbered list)   |
| Default Fix            | `## Recommended fix`                 |

## 4. Score policy (important)

"Max Score" belongs to the maintainer's proprietary audit/scoring system and
must NOT appear anywhere in this repository — the repo is public, so even
unrendered frontmatter would expose the scoring model. The conversion script
silently drops the field. Scores remain in the maintainer's private tooling,
keyed by guideline `id`. If a score-like field ever shows up in a contributor
PR or a converted file, remove it before merge; the validation step in the
conversion script must fail any output that contains a score field.

## 5. Conversion script (`scripts/convert-notion.mjs`)

Input: a folder of Notion Markdown exports (structure like the sample below).
Output: correctly named, schema-conformant files under `content/guidelines/<category>/`.

Notion export format to parse — a level-1 heading (title), then `Key: Value`
lines where values may span multiple lines/paragraphs until the next known key:

```
# Cart quantity value remains fully readable at all supported quantities

Audit Type: Cart
Criterion ID: CART-DC-QTY-01
Default Fix: Redesign the quantity control so ...
(possibly multi-paragraph)
Dimension: Decision Clarity
Failure Signals: - Quantity text is clipped ...
How to verify?: Add a product to the cart.
(multi-line steps)
Max Score: 9
Operational Impact: ...
Severity: High
Target: Agent, Human
What is being checked?: ...
```

Requirements:
- Treat the known field names as delimiters; everything between two field names
  belongs to the first. Field order in exports may vary — do not assume order.
- "How to verify?" prose lines become a numbered Markdown list (one step per line/sentence as exported).
- "Failure Signals" become a `-` bullet list (they mostly already are).
- Drop the "Max Score" field entirely (see §4).
- Validate output: all enum values legal, id matches filename, all five H2
  sections present and non-empty, no score field present. On validation
  failure: report and skip the file, never emit a broken guideline. Print a summary (converted / skipped + reasons).
- Idempotent: re-running overwrites cleanly.
- Usage: `node scripts/convert-notion.mjs <input-dir>`.

## 6. Site scope (MVP)

Pages:
- `/` — one-paragraph project intro, category cards with guideline counts,
  link to CONTRIBUTING. No marketing fluff.
- `/guidelines/<category>/` — list of guidelines in category: ID, title,
  severity badge, dimension, targets. Sortable is nice-to-have, skip if slow.
- `/guidelines/<category>/<id>/` — the guideline page: title, meta badges
  (severity, dimension, targets), the five body sections,
  "Edit this page on GitHub" link, prev/next within category.
- `/dimensions/<dimension>/` — same list view, filtered by dimension
  (cross-category browsing is a deliberate differentiator).

Technical requirements:
- Fully static output (`nuxt generate`), deployable on Vercel free tier.
- Semantic HTML (article, nav, headings hierarchy correct).
- JSON-LD on every guideline page: `TechArticle` with headline, identifier
  (the guideline ID), articleSection (category), keywords (dimension, targets).
- `sitemap.xml`, sensible `<title>`/meta description per page.
- Design: restrained, typographic, fast. Read the frontend-design skill if
  available; otherwise: system-ish font stack or one variable font, generous
  whitespace, severity as the only strong color accent. No hero images.

## 7. CLAUDE.md must contain

- The frontmatter schema and body-section order (copy from §3).
- ID scheme documentation: `<CATEGORY>-<DIMENSION-ABBREV>-<TOPIC>-<NN>`,
  uppercase, immutable once published; filename = lowercase id.
- Score policy from §4 (no score fields anywhere in the repo).
- Writing style for guidelines: imperative, testable, vendor-neutral,
  no marketing language; every guideline must be verifiable by the steps
  in "How to verify".
- Commands: dev, generate, convert script usage.
- Rule: never modify a published guideline's `id`; breaking changes to
  meaning require deprecating (status: deprecated) and minting a new ID.

## 8. CONTRIBUTING.md must contain

- How to propose a new guideline (fork → branch → PR) and how to propose
  changes to an existing one.
- A copy-pasteable guideline template (schema from §3).
- The ID scheme and how to pick the next free number.
- Acceptance criteria: testable, vendor-neutral, non-duplicative, includes
  failure signals and verification steps.
- Note that every PR gets a Vercel preview deployment for review.
- Licensing note: contributions are accepted under CC BY-SA 4.0.

## 9. Licensing

- `/content/**`: CC BY-SA 4.0 (open, attribution, share-alike).
- Everything else (site code, scripts): MIT.
- LICENSE file explains the split; short notice in README.

## 10. Build order

1. Scaffold Nuxt 3 + Nuxt Content + UnoCSS, commit.
2. Write CLAUDE.md, README.md, CONTRIBUTING.md, LICENSE.
3. Implement conversion script; run against the Notion export folder the
   maintainer provides; fix parsing until validation passes for all files.
4. Build the four page types (§6) against the real converted content.
5. JSON-LD, sitemap, meta tags.
6. `nuxt generate` clean, push, connect Vercel, verify preview deployments on a test PR.

Definition of done: site is live on a vercel.app URL with all existing
guidelines browsable, and a test PR shows a preview deployment.
