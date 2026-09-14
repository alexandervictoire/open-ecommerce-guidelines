---
id: CHECKOUT-SR-BACK-01
title: Returning to an earlier step preserves entered data
category: checkout
dimension: system-robustness
severity: high
targets: [human]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether a user can return to an earlier checkout step, by the interface's own controls or by the browser's back control, correct something and continue, without losing data entered in either the earlier or the later steps.

## Why it matters

Checking an earlier step is a sign of care, not of confusion: the user is verifying the address before paying. Punishing that by discarding their work teaches users that checkout is a one-way corridor they should not inspect, which is the opposite of what a shop wants at the moment of commitment.

The browser back control matters specifically because users do not distinguish it from the interface's own controls, and because a checkout that breaks on it also breaks on an accidental swipe on mobile.

## Failure signals

- Using the browser back control produces an expired or invalid state.
- Returning to an earlier step clears later steps that were already completed.
- Editing the address resets the chosen delivery method without saying so.
- A step marked as completed cannot be reopened.
- Returning to the cart from checkout empties or rebuilds it.

## How to verify

1. Complete every checkout step up to, but not including, the final order control.
2. Use the interface's own control to return to the address step, change nothing, and continue. Confirm all later data survives.
3. Repeat using the browser back control.
4. Change the address in a way that legitimately affects delivery options, and confirm the change to the delivery method is stated rather than silent.
5. Return to the cart from checkout and confirm no line was removed and the cart was not rebuilt. Whether quantities survive this round trip is checked by `CART-SR-QTY-01`.
6. Repeat the browser back test on mobile, including the swipe gesture where the platform supports it.

**Shopware:** checkout steps are separate routes, so browser navigation between them usually works. The exposure is in the recalculation that follows an address change, which can silently reset a delivery method.

**Shopify:** the platform checkout handles step navigation itself and is generally robust here. The exposure sits at the boundary between theme-owned cart and platform checkout, which is also where returning to the cart can rebuild it.

## Recommended fix

Persist checkout state server-side keyed to the session rather than to the step, restore it on re-entry from any direction, and announce any change that an edit forces on a later step instead of applying it silently.
