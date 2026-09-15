---
id: CART-DC-CODE-01
title: Entering a discount code gives a clear result
category: cart
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether submitting a discount code produces an unambiguous success or failure message, whether an applied code is visibly listed with the amount it produced, and whether it can be removed.

## Why it matters

The discount code field is the point where users most often conclude that a shop is broken. A code that silently fails, or that appears to apply but changes nothing visible, leaves the user unable to tell whether they mistyped it, whether it expired, or whether the site is faulty. A meaningful share of abandonment at this step is not price sensitivity but uncertainty.

The removal path matters for the same reason. A user who applied the wrong code and cannot remove it has lost control of their own order.

## Failure signals

- Submitting an invalid code reloads the cart with no message.
- A code is accepted but no line appears showing what it did.
- The error message does not distinguish an unknown code from one whose conditions are not met.
- An applied code cannot be removed without emptying the cart.
- The code field is present in a cart that supports no codes at all.

## How to verify

1. Submit a deliberately invalid code and confirm an explicit failure message appears.
2. Submit a valid code and confirm both a success indication and a line showing the amount it produced.
3. Submit a valid code whose conditions are not met, for example below a minimum order value, and confirm the message says so rather than reporting the code as unknown.
4. Remove the applied code and confirm the totals return to their prior state.
5. Confirm messages are text in the document rather than transient toasts only, so that a returning or assistive-technology user can still read them.

## Recommended fix

Return distinct outcomes for unknown, expired, and conditions-not-met, and render the result as persistent text. List every applied code as its own line with its amount and a removal control. If a surface cannot apply codes, do not show a field there.

## Shopware specific

Promotion codes are applied as promotion line items in the cart, so an applied code has a natural place to be listed. Check that the theme renders that line with its amount and a removal control.

## Shopify specific

Discount codes can be applied to the cart itself through the cart API, but whether the cart page offers a field depends on the theme: Horizon's cart summary has a code field with apply, remove and error states, while Dawn's cart leaves code entry to checkout. If a cart shows a field, it must behave as described here.
