---
id: CHECKOUT-TDE-CONFIRM-01
title: The order confirmation records what was agreed
category: checkout
dimension: trust-decision-enablement
severity: high
targets: [human, machine]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 8(7), Art. 6(1)(h), Art. 10"]
jurisdiction: [eu]
---

## What is being checked

Whether the confirmation the user receives, both on screen and in the confirmation message, contains the order reference, the ordered items, the complete cost breakdown, the delivery and payment method, the delivery expectation, and the contract terms including the withdrawal information.

## Why it matters

The confirmation is the user's only durable record of what they agreed to. It is also the document they consult before contacting support, which makes its completeness the cheapest available reduction in support load.

For distance contracts with consumers, confirmation on a durable medium with the pre-contractual information, including withdrawal terms, is required rather than optional, and the on-screen confirmation alone does not satisfy that.

Omitting the withdrawal information has a specific and expensive consequence: the withdrawal period does not begin as normal but extends by up to twelve months. A shop that never sends it is accepting returns for a year on every order rather than for fourteen days, which is usually news to the merchant.

## Failure signals

- The confirmation page shows a thank-you message and an order number and nothing else.
- No confirmation message is sent, or it is sent without the contract terms.
- Withdrawal information is referenced by link only, so the durable record depends on the site remaining unchanged.
- The cost breakdown in the confirmation differs from what was charged.
- No delivery expectation is stated anywhere in the confirmation.
- Guest orders receive a reduced confirmation compared with registered orders.

## How to verify

1. Place a test order as a guest and as a registered customer.
2. On the confirmation page, confirm the order reference, items, full breakdown, methods and delivery expectation are present.
3. Confirm a confirmation message arrives and contains the same content plus the contract terms and withdrawal information.
4. Confirm the withdrawal information is included as content rather than only as a link.
5. Compare the confirmation totals against the amount actually charged.
6. Confirm the guest confirmation is not less complete than the registered one.

## Recommended fix

Treat the confirmation message as the contractual record rather than as a receipt: include the full breakdown, the delivery expectation and the terms as content, attach the withdrawal information rather than linking it, and verify every language variant of the template separately.

## Shopware specific

The order confirmation email is sent through the Flow Builder. Templates are translated per language and allow one attachment per language, while headers and footers are assigned per sales channel. Check every language version, including whether the terms and withdrawal information are included as content or as an attachment.

## Shopify specific

The order confirmation is an editable notification template. Check whether it contains the terms and withdrawal information.
