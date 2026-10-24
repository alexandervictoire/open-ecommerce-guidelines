---
id: CART-DC-FREESHIP-01
title: The cart says how much is missing for free shipping
category: cart
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether a shop with a free shipping threshold shows in the cart how much more the shopper needs to spend to reach it, and whether that amount is correct after discounts.

## Why it matters

Shipping costs are the most common reason for leaving at checkout. In a study by the Baymard Institute, 40 % of shoppers who abandoned a purchase named extra costs such as shipping. A shopper who is €8 short of free shipping often prefers to add something small than to pay €5 for shipping, but only if they know.

In December many people buy several small gifts at once, so a threshold is often within reach.

## Failure signals

- The free shipping threshold is not mentioned in the cart.
- The remaining amount is wrong after a discount code or sale prices.
- The message still says "almost there" when the threshold is reached.
- It is not clear whether the threshold applies before or after discounts.
- The threshold only applies to some countries or shipping methods, and this is not stated.

## How to verify

1. Add products below the threshold to the cart.
2. Confirm the cart shows the threshold and the remaining amount.
3. Apply a discount code. Confirm the remaining amount updates and matches the shop's rule (before or after discount).
4. Add products until the threshold is passed. Confirm the message changes and shipping is shown as free.
5. Change the shipping country if possible. Confirm the message is correct for that country.

## Recommended fix

Show one short line above the cart total: "€8 more for free shipping" and, once reached, "Free shipping". Calculate it from the same totals the cart uses. State whether the threshold applies before or after discounts. See also [CART-DC-TOTALS-01](/guidelines/cart/cart-dc-totals-01/).
