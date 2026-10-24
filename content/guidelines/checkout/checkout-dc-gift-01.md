---
id: CHECKOUT-DC-GIFT-01
title: A gift order makes the recipient's address clearly separate from the buyer's
category: checkout
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether checkout makes it easy to send an order to someone else: the delivery address is clearly labelled as the recipient's, it is not silently filled with the buyer's own address, and the order summary shows where the parcel goes.

## Why it matters

Checkout is built for people who buy for themselves. Billing and delivery address are often the same by default, and saved addresses are filled in automatically. A gift buyer in a hurry can easily send the gift to their own home, and only notice when the parcel arrives.

Research by the Baymard Institute names this as a common gift mistake. It is cheap to prevent and expensive to fix in December.

## Failure signals

- An order marked as a gift still fills the delivery address with the buyer's address.
- The delivery address field has the same label for gifts and normal orders.
- The option "deliver to a different address" is hidden or hard to find.
- The order summary does not show the delivery address next to the order button.
- A gift message is printed on an invoice that is also sent with prices.

## How to verify

1. Mark an order as a gift in the cart, if the shop offers it, and go to checkout.
2. Confirm the delivery address is labelled for the recipient and is not pre-filled with the buyer's address.
3. Without the gift option, confirm "deliver to a different address" is visible without scrolling or opening menus.
4. Confirm the final summary shows the delivery address next to the order button. See [CHECKOUT-DC-SUMMARY-01](/guidelines/checkout/checkout-dc-summary-01/).
5. Place a test gift order. Confirm the parcel contents carry no prices, if the shop says so.

## Recommended fix

When an order is marked as a gift, label the address field "Recipient's address" and leave it empty. Keep "deliver to a different address" visible for all orders. Show the delivery address in the final summary. Send the invoice to the buyer by email, not in the gift parcel.
