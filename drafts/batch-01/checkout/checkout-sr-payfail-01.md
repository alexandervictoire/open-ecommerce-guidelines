---
id: CHECKOUT-SR-PAYFAIL-01
title: A failed or cancelled payment returns the user to an intact cart
category: checkout
dimension: system-robustness
severity: high
targets: [human]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether a payment that fails, is declined, times out, or is cancelled by the user at an external provider returns the user to the shop with the cart complete, the entered data preserved, an explanation of what happened, and the ability to choose another method.

## Why it matters

Payment failure is common and mostly not the shop's fault: cards are declined, providers time out, second-factor prompts are missed. What is the shop's fault is what the user finds on their return. An empty cart after a declined card reads as the order having vanished, and a user in that state does not retry, they leave and frequently contact support to ask whether they were charged.

This is also where duplicate orders are created, when a user who cannot tell what happened tries again from the beginning.

## Failure signals

- The cart is empty after returning from a failed payment.
- The user lands on a generic error page with no route back into checkout.
- No explanation distinguishes a decline from a cancellation from a technical failure.
- The failed payment method remains selected with no prompt to choose another.
- The user cannot tell whether they were charged.
- Returning from the provider produces a session that is no longer signed in.

## How to verify

1. In a test environment, reach the payment step and trigger a decline using the provider's test credentials.
2. Confirm the return lands inside checkout with the cart and entered data intact.
3. Confirm the message distinguishes what happened and states whether any charge was made.
4. Confirm another payment method can be selected and the order completed.
5. Repeat by cancelling at the provider rather than being declined, since these are different paths and are frequently handled differently.
6. Repeat by abandoning the provider page and navigating back manually.

**Shopware:** failed payments typically leave an order in a failed payment state with a route to retry. Confirm that route is reachable from the error the user actually sees, and that the cart is restored rather than left consumed by the failed order.

**Shopify:** the platform handles the return from most providers and generally preserves checkout state. Verify custom or locally popular payment apps individually, since the return path is theirs.

## Recommended fix

Treat payment failure as an expected branch, not an exception: restore the cart and entered data, explain the outcome in terms of what the user should do next, state the charge status explicitly, and offer method reselection without restarting checkout.
