---
id: CHECKOUT-DC-EXPRESS-01
title: Express payment options appear before the long forms
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

Whether payment methods that fill in address and payment details in one step (such as wallet payments) are offered at the start of checkout, above the address and card forms, and whether they work on phones.

## Why it matters

Typing an address and a card number on a phone is slow and error-prone. During the holiday season, most orders are placed on phones: about 70 % of online orders during Cyber Week 2025, according to Salesforce, and 27 % of orders were paid with mobile wallets.

When express options only appear at the end, many shoppers have already typed everything by hand, or given up. Placed at the start, they save most of the effort.

## Failure signals

- Express payment options only appear after the address has been entered.
- Express options are shown on desktop but not on phones.
- An express payment fails, and the shopper has to start checkout again.
- Express checkout skips the step where the shopper sees delivery costs and arrival date.
- Express options are shown for products where they cannot be used, and fail at the end.

## How to verify

1. Open checkout on a phone.
2. Confirm express payment options are visible before the address form.
3. Complete a test order with an express option. Confirm the shopper sees delivery cost and arrival date before paying.
4. Cancel an express payment halfway. Confirm the cart and entered data are still there. See [CHECKOUT-SR-PAYFAIL-01](/guidelines/checkout/checkout-sr-payfail-01/).

## Recommended fix

Show the express payment options the shop supports at the top of the first checkout step, and in the cart. Test each one on iOS and Android before the sale. Make sure express orders still show delivery cost and arrival date before the payment is confirmed.
