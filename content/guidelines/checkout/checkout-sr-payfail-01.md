---
id: CHECKOUT-SR-PAYFAIL-01
title: A failed or cancelled payment leaves the order intact and payable
category: checkout
dimension: system-robustness
severity: high
targets: [human]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether a payment that fails, is declined, times out, or is cancelled by the user at an external provider returns the user to the shop with what they were buying still intact, an explanation of what happened, and the ability to pay with another method.

"Intact" can take two forms, and both pass: the cart is restored with the entered data, or the order already created is kept with its items and data and can be paid again. Which one applies depends on whether the shop creates the order before or after payment.

## Why it matters

Payment failure is common and mostly not the shop's fault: cards are declined, providers time out, second-factor prompts are missed. What is the shop's fault is what the user finds on their return. An empty cart after a declined card reads as the order having vanished, and a user in that state does not retry, they leave and frequently contact support to ask whether they were charged.

This is also where duplicate orders are created, when a user who cannot tell what happened tries again from the beginning.

## Failure signals

- The cart is empty after returning from a failed payment, and no pending order is offered for payment instead.
- The user lands on a generic error page with no route back into checkout or to the pending order.
- No explanation distinguishes a decline from a cancellation from a technical failure.
- The failed payment method remains selected with no prompt to choose another.
- The user cannot tell whether they were charged.
- Returning from the provider produces a session that is no longer signed in.

## How to verify

1. In a test environment, reach the payment step and trigger a decline using the provider's test credentials.
2. Confirm the return lands inside the shop with the items and entered data intact, either in the restored cart or in the pending order.
3. Confirm the message distinguishes what happened and states whether any charge was made.
4. Confirm another payment method can be selected and the order completed.
5. Repeat by cancelling at the provider rather than being declined, since these are different paths and are frequently handled differently.
6. Repeat by abandoning the provider page and navigating back manually.

## Recommended fix

Treat payment failure as an expected branch, not an exception: keep the items and entered data intact, by restoring the cart or by keeping the pending order payable, explain the outcome in terms of what the user should do next, state the charge status explicitly, and offer method reselection without restarting checkout.

## Shopware specific

The order is created before payment. When a payment fails or is cancelled, the customer lands on the finish page with a payment error, or on the page for editing the order, where another payment method can be chosen; the cart is not restored, because it has become the order. Whether the method can be changed depends on the transaction state and on the payment method's setting "Allow change of payment method after order completion". Verify that retry path rather than looking for a restored cart.

## Shopify specific

Test the return path of each payment provider in use, including third-party payment apps, since each handles failure and cancellation itself.
