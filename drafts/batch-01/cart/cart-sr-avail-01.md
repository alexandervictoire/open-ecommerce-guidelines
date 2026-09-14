---
id: CART-SR-AVAIL-01
title: The cart flags items that can no longer be bought
category: cart
dimension: system-robustness
severity: high
targets: [human, agent, machine]
status: draft
platforms: [shopware, shopify]
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

This check needs a stock change while an item is held in a cart, so it requires preparation. Use a low-stock product in a staging environment, or a product whose stock can be adjusted in the admin.

1. Add a product with limited stock to the cart and leave it.
2. In the admin, reduce that product's available stock below the cart quantity, or set it unavailable.
3. Reload the cart and confirm the line is identified as affected, with the available quantity stated.
4. Confirm the total either excludes the unavailable quantity or clearly states that it is provisional.
5. Confirm the line is not removed silently.
6. Attempt to enter checkout and confirm the user is stopped at the cart rather than deeper in the flow.

**Shopware:** the cart is recalculated server-side on each load, so availability errors are typically raised as cart errors. The common failure is a theme that does not render the error collection. Check that cart notices are output before concluding the platform is not detecting the change.

**Shopify:** availability is enforced at checkout, and the cart page does not necessarily revalidate. Confirm what the theme does on cart load, since the default behaviour in some themes is to display the stale line unchanged.

## Recommended fix

Revalidate availability on every cart render, mark affected lines explicitly with the quantity actually available, keep the line visible rather than deleting it, and make the state explicit in the totals. Block entry to checkout until the user has acknowledged or resolved the affected line.
