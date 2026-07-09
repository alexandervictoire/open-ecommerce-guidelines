---
id: CART-SR-QTY-01
title: Cart quantity persists across checkout navigation
category: cart
dimension: system-robustness
severity: critical
targets: [human, agent]
status: published
---

## What is being checked

Whether the user’s selected cart quantity remains unchanged and preserved in the last confirmed quantity state for each line item unless the user explicitly changes it, when e.g. moving from cart to checkout and then returning to the cart or shop flow.

The cart must preserve the last confirmed quantity state for each line item unless the user explicitly changes it or the system clearly communicates a validated reason why the quantity was adjusted.

## Why it matters

Users lose a decision-critical part of their purchase state after progressing in the buying flow. This breaks continuity, creates rework, and weakens trust in cart and checkout reliability.

For decision-making, users can no longer trust that the order they configured is the order being preserved. This increases hesitation, correction effort, and abandonment risk.

For machines and agents, the commerce state becomes unstable across navigation steps, which makes validation, execution, and recovery unreliable.

## Failure signals

- Quantity increases in cart, but returns to 1 after navigating to checkout and back
- Returning to cart shows a different quantity than the one last selected by the user
- The reset occurs across multiple products, not just one SKU
- The reset is reproducible across repeated cart-to-checkout navigation
- No message explains why the quantity changed
- Line item subtotal or total no longer matches the quantity the user selected before navigation

## How to verify

1. Add a product to the cart.
2. Increase quantity to a non-default value such as 3, 5, or 10.
3. Proceed to checkout.
4. Navigate back to the cart or shop/cart flow.
5. Confirm whether the same quantity is still shown for the same line item.
6. Repeat with multiple products.
7. Repeat the flow more than once to confirm whether the reset is reproducible.
8. Check whether subtotal and total remain aligned with the preserved quantity.

## Recommended fix

Persist cart line-item quantity as a stable session or server-backed cart attribute and rehydrate that state consistently whenever the cart drawer, cart page, or checkout-return path is reopened.

Ensure cart rendering uses the authoritative stored quantity rather than a hardcoded UI default. If inventory or business rules force a quantity change, keep the adjusted value visible and show a clear inline reason for the change.
