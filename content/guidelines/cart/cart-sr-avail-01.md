---
id: CART-SR-AVAIL-01
title: The cart flags items that can no longer be bought
category: cart
dimension: system-robustness
severity: high
targets: [human, agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether a cart line whose product has become unavailable, or whose available quantity has fallen below the quantity in the cart, is identified as such in the cart, with the affected quantity stated, before the user enters checkout.

## Why it matters

Carts persist for days. Stock does not. The gap between the two is normal, and the question is only where the user learns about it. Learning in the cart costs one adjustment. Learning after entering payment details costs the whole session, and it is experienced as the shop having wasted the user's time.

This also protects the totals: a cart that silently includes an unpurchasable line is displaying a total that cannot be charged.

For agents, an unflagged stale line means the offer they are about to accept is not the offer that exists.

## Failure signals

- An out-of-stock line appears in the cart identically to a purchasable one.
- The cart accepts a quantity that exceeds current stock and reduces it silently later.
- The line is flagged but the total still includes it.
- Availability is only revalidated at the payment step.
- The cart removes the line automatically with no notice, so the user's order silently shrinks.

## How to verify

This check needs an item to become unpurchasable while it is held in a cart, so it requires preparation. Use a staging environment, or a product whose settings can be changed in the admin.

Falling stock alone does not make every product unpurchasable. A product configured to remain orderable when out of stock stays purchasable at zero or negative stock, and a cart that keeps such a line unflagged is behaving correctly, not failing this guideline. `PDP-SR-STOCK-01` describes where each platform keeps that setting. Establish which case applies before recording a verdict.

1. In the admin, confirm whether the chosen product enforces its stock, meaning it cannot be ordered beyond what is available.
2. Add the product to the cart and leave it.
3. Make the line genuinely unpurchasable: set the product unavailable, or, only if step 1 confirmed that stock is enforced, reduce its available stock below the cart quantity.
4. Reload the cart and confirm the line is identified as affected, with the available quantity stated.
5. Confirm the total either excludes the unavailable quantity or clearly states that it is provisional.
6. Confirm the line is not removed silently.
7. Attempt to enter checkout and confirm the user is stopped at the cart rather than deeper in the flow.

## Recommended fix

Revalidate availability on every cart render, mark affected lines explicitly with the quantity actually available, keep the line visible rather than deleting it, and make the state explicit in the totals. Block entry to checkout until the user has acknowledged or resolved the affected line.

## Shopware specific

The cart page outputs cart errors as alerts, so an affected line should be announced there. Whether falling stock makes a product unpurchasable at all depends on its stock settings, see `PDP-SR-STOCK-01`.

## Shopify specific

Whether the cart page marks an affected line before checkout is theme behaviour, so reload the cart after the stock change and check it there. A variant set to continue selling when out of stock does not become unpurchasable, see `PDP-SR-STOCK-01`.
