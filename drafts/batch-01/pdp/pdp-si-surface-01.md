---
id: PDP-SI-SURFACE-01
title: Listing, product page, cart and checkout agree with each other
category: pdp
dimension: semantic-integrity
severity: high
targets: [human, agent, machine]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether the availability, delivery expectation and promotional claims shown for one product agree with each other across the listing tile, the product detail page, the cart line and the checkout summary.

Price is checked elsewhere, one leg at a time: listing tile against product page by `PLP-DC-PRICE-01`, product page into the cart by `CART-SR-PERSIST-01`, and stability into checkout by `PDP-SR-PRICE-01`. Purchasability carried into the cart is also covered by `CART-SR-PERSIST-01`.

## Why it matters

Existing guidelines check that a product page does not contradict its own attribute data, and that price and purchasability survive the step into the cart. Most contradictions users actually encounter fall between those checks: a tile advertising a discount the product page does not apply, a delivery estimate that shortens between page and cart, a tile reporting a product in stock that the product page says ships in ten days.

Cross-surface contradictions are more damaging than within-page ones because the user notices them at a later, more committed stage, and because the natural reading is not that the site is inconsistent but that the earlier number was bait.

For agents the problem is worse still: an agent that reads a listing and acts on it has no way to know which of two disagreeing figures is authoritative.

## Failure signals

- A promotional badge on the listing does not correspond to any reduction on the product page.
- The delivery estimate on the product page differs from the one in the cart for the same shipping method and destination.
- Availability wording differs between surfaces, for example "in stock" on the tile and "ships in 10 days" on the product page.
- Structured data on the listing disagrees with structured data on the product page.

## How to verify

1. Pick three products: one on promotion, one with limited availability, one plain.
2. For each, record availability wording, delivery statement and any badge on the listing tile.
3. Open the product detail page and compare all three.
4. Add to cart and compare the delivery statement and any promotional claim in the cart line.
5. Enter checkout and compare the delivery statement and any promotional claim once more.
6. Note any difference that is not explained by an explicit variant or shipping method change made by the user.

**Shopware:** listing and detail render from the same entity but through different price contexts, so differences usually originate in a price rule that resolves differently in the two contexts. Check advanced pricing and customer group context rather than the templates.

**Shopify:** the common origin is a discount applied at cart level while the tile renders a badge from a metafield or an app, with nothing keeping the two in step. Identify which component owns the claim.

## Recommended fix

Derive these values from one source shared across the surfaces, rather than letting each template resolve them for itself, and treat any divergence as a data problem rather than a display problem. Where a difference is legitimate, for example a delivery estimate that narrows once a destination is known, state the reason at the point where the value changes.
