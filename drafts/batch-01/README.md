# Batch 01 — staging area

37 draft guidelines from `HANDOFF-guidelines-batch-01.md`, staged outside
`content/` so they are neither validated nor built until they are reconciled.

The history of this directory is the review trail:

1. the files exactly as written in the handoff
2. gate one: overlaps with the published corpus and within the batch resolved
3. gate two: platform notes checked against current documentation and source code,
   then lifted into `## Shopware specific` / `## Shopify specific` sections
   (evidence in `gate-two-sources.md`)

Files move into `content/guidelines/<category>/` in the content PRs, one PR per
category, and are published as they move (publish by default, see CLAUDE.md).
A guideline another category's PR cites moves with that PR, so no published
guideline points at a draft. Already moved:

- `checkout/` (11), plus `CART-DC-TOTALS-01`, which `CHECKOUT-DC-COST-01` cites

`edits/` holds proposed changes to already published guidelines. They go live
only together with the publication of the draft they refer to — a published
guideline must not point readers at a draft (see CLAUDE.md).
