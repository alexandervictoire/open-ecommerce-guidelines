---
id: PDP-SR-STOCK-01
title: Stock status reflects real purchasability
category: pdp
dimension: system-robustness
severity: critical
targets: [human, agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Checks whether displayed stock status accurately reflects actual purchase capability.

## Why it matters

When stock information is unreliable, transactions fail and system credibility is severely damaged.

## Failure signals

- In stock but cannot purchase
- Out of stock but purchasable
- Stock updates too late

## How to verify

1. Attempt checkout with the displayed stock state and confirm consistency.

## Recommended fix

Synchronize stock indicators with real-time purchase logic.

## Shopware specific

Stock mismatches usually originate in product data, not in the template.
Shopware only runs a stock update when one of three fields changes: `stock`,
`isCloseout`, `minPurchase`. These are the fields to check first.

`isCloseout` (admin: Clearance sale) — off by default on a new product. With it
off, the product remains orderable past zero stock; the product definition
describes the enabled state as hiding the product when sold out. Since Stock
also defaults to 0, a newly created or imported product is orderable with no
stock present unless this is changed. This is the most common source of the "out
of stock but purchasable" signal after bulk imports.

`minPurchase` / `purchaseSteps` (admin: Min. order quantity, Purchase steps) — a
product with stock 1 and `minPurchase` 2 renders as available but cannot be
added to the cart, usually with no error state in the DOM.

Version boundary: from 6.6.0.0, `product.stock` is the primary real-time source
and the Available Stock field mirrors it — both values are always identical, and
the field is read-only in the admin. Before 6.6.0.0 a different model applied,
in which available stock was derived from open orders. On shops below 6.6,
verify which of the two values the template and any product feed actually read.

Stock management can be disabled entirely
(`shopware.stock.enable_stock_management: false`). With it off, `product.stock`
is not updated when orders are placed or completed, and displayed stock drifts
from reality until an external system writes it back. Confirm whether an ERP or
inventory system owns stock before treating a mismatch as a storefront defect.

Variants are separate product entities with their own stock. Verify at variant
level, not on the parent.

## Shopify specific

Purchasability is decided per variant, not per product. A product can appear
available while the selected variant is not orderable.

Two settings interact, both in the product's Inventory section:

`Track quantity` (`inventory_management`) — when off, quantity values are not
enforced. Displayed quantity and actual purchasability become unrelated.

`Continue selling when out of stock` (`inventory_policy`) — with `CONTINUE`,
customers can buy the variant after it is out of stock; with `DENY` they cannot.
Inventory goes negative and no sold-out state appears. In a product CSV this is
the column `Variant Inventory Policy` with the values `continue` or `deny`.
Frequently enabled in bulk during migrations or by inventory apps.

Machine-readable gap: the Storefront API exposes `availableForSale`,
`currentlyNotInStock` and `quantityAvailable` on `ProductVariant`, but not
`inventoryPolicy` — that field exists only in the Admin API. A headless
frontend, feed or agent reading `availableForSale` alone cannot distinguish real
stock from continue-selling at zero. Read `quantityAvailable` alongside it.

Policy is variant-level, not location-level. With multiple locations, `continue`
means selling continues once total inventory across all locations reaches zero;
there is no native per-location toggle for the online store.

Point of sale is excluded from `continue`: the setting governs the online store
only. A variant at zero can be purchasable online and refused at POS. This is
intended behaviour, not a mismatch.

Themes typically render availability from the variant object in the initial HTML
and update it client-side on variant change. Verify the rendered state after
switching variants, not only on page load.

Third-party inventory or pre-order apps override the native state. Where such an
app is installed, displayed availability may come from the app rather than the
variant, and the two can diverge.
