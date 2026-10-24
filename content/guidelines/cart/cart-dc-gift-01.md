---
id: CART-DC-GIFT-01
title: Gift options are visible before checkout and can be chosen in the cart
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

Whether the shop shows its gift options (gift wrap, gift message, a delivery note without prices) on the product page or in the cart, with their price, and whether the shopper can choose them in the cart.

## Why it matters

People who buy a gift want to know two things before they buy: can I add a message, and will the recipient see the price? If they cannot find the answer, some do not add the product to the cart at all. Others assume the shop does not offer gift options and buy elsewhere.

Research by the Baymard Institute found that 80 % of large shops do not show gift options on the product page, and 42 % do not let users choose them in the cart.

## Failure signals

- Gift options exist, but only appear in the last checkout step.
- The product page and the cart do not mention gift options at all.
- The price of gift wrap is only shown at the end.
- It is not clear whether the delivery note will show prices.
- The gift message has no character limit shown, and is cut off without warning.

## How to verify

1. On a product page and in the cart, look for a mention of gift options.
2. Confirm the price of each paid option is shown where it is offered.
3. In the cart, select the gift options and write a message.
4. Continue to checkout. Confirm the choices are kept and appear in the order summary.
5. Confirm the shop states clearly that the parcel will not contain prices, if that is offered.

## Recommended fix

Add a short line on the product page, such as "Gift wrap and message available in the cart". In the cart, add a "This is a gift" option that opens gift wrap, message and a note without prices. Show prices of paid options right there. For the address step, see [CHECKOUT-DC-GIFT-01](/guidelines/checkout/checkout-dc-gift-01/).
