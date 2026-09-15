---
id: PLP-DC-UNIT-01
title: Unit price is shown on listing tiles for products sold by measure
category: plp
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 98/6/EC Art. 3(1)", "PAngV §4 (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether listing tiles for products sold by weight, volume, length or area show the price per reference unit alongside the selling price.

## Why it matters

Unit pricing is the only thing that makes a grid of different pack sizes comparable. Without it the user is asked to do arithmetic across tiles, which in practice means they compare the headline figures instead and choose wrongly. The effect is strongest exactly where pack sizes vary most, which is also where margin usually varies most.

An existing guideline covers unit pricing on the product detail page. By the time the user is on a product detail page the comparison has already happened, so covering only that surface covers the wrong moment.

The obligation is also broader than the product page. In EU price indication law the unit price is owed wherever a selling price is offered or advertised to consumers, which covers category listings, search results and price-bearing recommendation widgets alike, and it has to sit in immediate proximity to the selling price rather than behind a link. It must not be given more visual prominence than the selling price either, since a large unit price beside a small total is its own form of misleading presentation.

## Failure signals

- Tiles for products sold by measure show only the selling price.
- Unit price is present on the product detail page but absent from tiles.
- The unit price is shown but is not in immediate visual proximity to the selling price, for example placed in a separate row or revealed on hover.
- The unit price is rendered more prominently than the selling price.
- The reference unit varies between tiles in the same category, for example per 100 g on one tile and per kg on the next, where the prescribed unit is the same for both.
- The unit price is computed from a base variant and does not update when the tile shows a different pack size.
- Cross-selling and recommendation widgets that show prices omit the unit price while the main grid includes it.

## How to verify

1. Open a category containing products sold by measure in more than one pack size.
2. Confirm each tile shows a unit price with an explicit reference unit.
3. Confirm the reference unit is consistent across tiles within the category.
4. Pick one tile, open the product page, and confirm the two unit prices agree.
5. Where a tile represents a product with variants of differing size, confirm the shown unit price corresponds to the variant whose selling price is shown.
6. Confirm the unit price is not styled more prominently than the selling price.
7. Check any price-bearing recommendation or cross-selling widget on the same page under the same criteria.

**Exclusions:** the obligation does not apply to every product. Defined exceptions exist, including very small nominal quantities, products made up of different unmixed items, and cases where the unit price would be identical to the selling price. Establish which products in the catalogue are actually in scope before recording a failure, rather than flagging every tile without a unit price.

## Recommended fix

Populate the reference unit data at the catalogue level and render it from the shared price component so that tiles, product pages and cart lines cannot disagree.

Note that the reference unit is not a free choice. The law prescribes it: one kilogram, one litre, one metre, one square metre or one cubic metre, depending on the goods, with a narrow exception allowing 100 grams or 100 millilitres for certain small quantities. Consistency across a category follows from using the prescribed unit rather than from a house rule, so a shop showing per 100 g on one tile and per kg on the next usually has a data problem, not a design decision.

## Shopware specific

Unit prices come from the product's purchase unit, reference unit and unit fields, and the listing tile renders a unit price only when they are populated. Products imported without them silently show none, so audit the catalogue for missing reference units rather than inspecting a single tile.

## Shopify specific

A unit price is set per product or variant, one each. Shopify documents unit prices as displayed automatically on product, collection, cart and checkout pages of any Online Store 2.0 theme; vintage themes need code changes. Check for variants with the unit price fields left empty, typically after a migration.
