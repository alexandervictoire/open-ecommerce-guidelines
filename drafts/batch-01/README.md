# Batch 01 — staging area

37 draft guidelines from `HANDOFF-guidelines-batch-01.md`, staged outside
`content/` so they are neither validated nor built until they are reconciled.

The history of this directory is the review trail:

1. the files exactly as written in the handoff
2. gate one: overlaps with the published corpus and within the batch resolved
3. gate two (pending): platform notes checked against current documentation,
   then lifted into `## Shopware specific` / `## Shopify specific` sections

Files move into `content/guidelines/<category>/` in the content PRs, after the
schema changes for the `plp` and `global` categories and the `regulation`,
`jurisdiction` and `audience` fields have landed.

`edits/` holds proposed changes to already published guidelines. They go live
only together with the publication of the draft they refer to — a published
guideline must not point readers at a draft (see CLAUDE.md).
