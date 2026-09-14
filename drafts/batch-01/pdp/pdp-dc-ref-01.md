---
id: PDP-DC-REF-01
title: A price reduction says which price it is measured against
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: draft
audience: [b2c]
platforms: [shopware, shopify]
regulation: ["Dir 98/6/EC Art. 6a", "CJEU C-330/23 (Aldi Süd)", "PAngV §11 (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether a page that announces a price reduction states what the struck-through or reference figure is, in terms a reader can evaluate: a prior selling price over a defined period, a recommended retail price, or a comparison to another variant or pack size.

Two things are checkable from the page alone. The basis has to be identified, and the figures have to be internally consistent: the struck-through figure, the stated reference and any percentage or saving amount must all trace back to the same number.

Whether that number is factually the right one cannot be established from the page, and this guideline does not ask an auditor to pretend otherwise. The internal consistency can be, and it is where the common failure sits.

## Why it matters

A reference price with no stated basis is uninterpretable. The same visual treatment is used for a genuine reduction from a price actually charged last month, for a recommended price the shop never charged, and for a figure invented for the occasion. A reader cannot distinguish them, which is why the discount signal has been steadily losing its effect.

In the EU, an announcement of a price reduction has a defined reference point, and stating it is not sufficient on its own. The Court of Justice held in 2024 that a reduction announced as a percentage or as a promotional highlight must be calculated on the basis of the prior price, meaning the lowest price the trader applied in at least the thirty days before the reduction, and that printing that figure as a footnote while computing the headline discount from a higher, more recent price does not comply. The case concerned exactly that arrangement, and the practice is common in online shops for the same reason it was attractive in print.

That makes internal consistency an auditable property rather than a stylistic preference: if a shop displays a thirty-day low and a percentage that does not follow from it, the page contradicts itself in a way anyone can compute.

**Relationship to PDP-DC-PAP-01.** `PDP-DC-PAP-01` recommends contextualising price through reference figures and savings displays. This guideline constrains how that is done. They are not in conflict: anchoring is useful, and anchoring whose basis is unstated is what this guideline fails. Apply both.

## Failure signals

- A struck-through figure appears with no label stating what it is.
- A percentage saving is shown without the reference figure it was computed from.
- A lowest-price-in-thirty-days figure is stated, but the percentage or saving amount does not follow from it, having been computed from a different and higher figure.
- Two different reference figures appear for the same product on the same page, for example one in the price block and another in a campaign badge.
- The reference figure is labelled ambiguously, for example as a generic "old price" with no period.
- A strike-through present on every product in the category, which makes it decoration rather than a reduction.
- A countdown or campaign label implies a time-limited reduction while the reference figure has no time reference at all.

## How to verify

1. Open a product detail page that shows a reduced price.
2. Confirm the reference figure carries a label identifying what it is.
3. Recompute the percentage or saving amount yourself from the labelled reference figure and confirm it matches what the page claims. A mismatch is the failure this guideline exists to catch.
4. Where the page states both a previous price and a lowest-price-in-thirty-days figure, confirm the claimed reduction follows from the latter.
5. Repeat on a listing tile for the same product, since campaign badges are often rendered by a different component that omits the label or recomputes the percentage differently.
6. Where the shop uses a recommended retail price as the reference, confirm it is labelled as such rather than as a previous price.

**Shopware:** the catalogue distinguishes the list price from the regulation price, which exists specifically to carry the lowest prior price required by the reduction rules. Confirm which field the theme is rendering, because rendering the list price while labelling it as a previous price is the common and consequential mistake.

**Shopify:** there is no native field for a prior-price reference distinct from the compare-at price, so this usually requires a metafield or an app. Confirm that whatever populates the reference is documented, and that the label the theme renders matches what that source actually contains.

## Recommended fix

Compute the displayed percentage from the same field that supplies the displayed reference figure, rather than from whatever price the product last carried. Label every reference figure with what it is, at the component level rather than per campaign, so that no promotion can ship without one. Where two different kinds of reference exist in the catalogue, render two different labels driven by the field in use, and never let a recommended price be presented as a price previously charged.
