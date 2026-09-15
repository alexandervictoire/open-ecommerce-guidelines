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
category, and go live as they move (see the release policy in CLAUDE.md); one
with genuinely large uncertainty moves as `status: draft` and is marked on the
site. A guideline another category's PR cites moves with that PR, so nothing
live cross-references a file that is still staged here. Already moved:

- `checkout/` (11), plus `CART-DC-TOTALS-01`, which `CHECKOUT-DC-COST-01` cites
- `plp/` (5), plus `PDP-SI-SURFACE-01`, which `PLP-ME-TILE-01` cites

`edits/` holds proposed changes to already published guidelines. They go live
together with the staged guidelines they refer to, since until then those do
not exist on the site.
