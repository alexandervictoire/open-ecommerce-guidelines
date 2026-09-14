---
id: PLP-DC-FROM-01
title: A “from” price says which variant it belongs to
category: plp
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether a tile that represents several purchasable variants makes clear which variant the displayed price belongs to, and whether variant selectors shown on the tile agree with that price.

## Why it matters

A tile showing a single figure for a product available in five sizes is making an implicit claim that the user will read as the price. When the figure turns out to be the cheapest variant only, the product page reads as a price increase, which damages trust at the exact moment the user commits attention.

Colour swatches on tiles compound this: a user who clicks the third swatch and lands on a page showing a different price than the tile did has been shown something untrue, even if no single element was false.

## Failure signals

- A tile for a multi-variant product shows a bare price with no indication that it is a starting price.
- A "from" price is shown, but the product page opens on a variant with a different price and no explanation.
- Swatches on the tile change the image but not the price, while the variants differ in price.
- The tile shows a price range whose bounds do not correspond to any variant that can currently be bought.

## How to verify

1. Find a category containing products whose variants differ in price.
2. Confirm the tile either qualifies the figure as a starting price or shows a range.
3. Click through and confirm the price shown on arrival matches what the tile indicated.
4. If the tile carries swatches, select a variant that differs in price and confirm the tile price updates, or that the tile made clear the price was a starting price.
5. Confirm the bounds of any range correspond to variants that can actually be bought.

**Shopware:** variant listings depend on how the main variant and variant display configuration are set. A product whose variants are listed individually needs no range; one listed through a main variant does. Check both patterns if the catalogue mixes them.

**Shopify:** most themes render the price of the first available variant with no qualification. Confirm the theme's card price snippet handles `compare at` and variant ranges, rather than assuming the first variant is representative.

## Recommended fix

Where a tile stands for more than one price point, qualify the figure explicitly as a starting price or render a bounded range, and derive the bounds from purchasable variants only. If the tile offers variant selection, make the price respond to it.
