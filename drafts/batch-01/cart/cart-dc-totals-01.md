---
id: CART-DC-TOTALS-01
title: The cart states a cost breakdown, not only a total
category: cart
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: draft
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 6(1)(e)"]
jurisdiction: [eu]
---

## What is being checked

Whether the cart shows the components that make up the amount payable as separately labelled figures: line subtotal, delivery, tax, each applied discount, and the grand total.

## Why it matters

A single total is unverifiable. The user who expected a different number has no way to find out which component surprised them, so the only available responses are to accept it or to leave. Because delivery and discount are precisely the components users are uncertain about, a lump sum removes the information at the moment it is most needed.

The breakdown is also what makes every later comparison possible. A user who wants to know whether adding one more item crosses a delivery threshold, or how much the code they entered actually saved, cannot answer either question from a total alone.

For agents, an unbroken total cannot be reconciled against the offer they selected, which means they cannot detect that something changed on the way to the cart.

## Failure signals

- Only a grand total is shown, with no separate delivery, tax or discount figures.
- Delivery appears as "calculated at checkout" when the destination is already known or a default applies.
- A discount is applied but shown only as a changed total, with no line stating its amount.
- Tax is shown as a figure with no indication of whether it is included in or added to the other lines.
- The breakdown exists but its components do not sum to the stated total.

## How to verify

1. Add two items to the cart, at least one of which is discounted.
2. Confirm separate labelled figures for line subtotal, delivery, tax, discount and grand total.
3. Add the components and confirm they reconcile with the stated total.
4. Change a quantity and confirm every affected component updates, not only the total.
5. Where delivery cannot be determined without a destination, confirm the cart says what is missing rather than showing nothing.

## Recommended fix

Render the breakdown from the same totals object that produces the grand total, so the figures cannot diverge. Where a component genuinely cannot be determined yet, state why and what would determine it, rather than omitting the line.

## Shopware specific

The standard cart summary lists a tax line per tax rate. Check that a theme has not collapsed it, and that net or gross presentation matches the customer group.

## Shopify specific

Dawn's cart shows an estimated total with a note that taxes and shipping are calculated at checkout. Since delivery and tax are often determinable earlier, check what is genuinely unknown at the cart rather than accepting that deferral as a constraint.
