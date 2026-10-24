---
id: GLOBAL-DC-TRACK-01
title: Customers can track an order from every page, without logging in
category: global
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether a link to order tracking is reachable from every page (header or footer), and whether a customer can see the status of an order with only the order number and email address, without an account or password.

## Why it matters

In December, "Where is my order?" is the most common question a shop gets. The customer is worried because the parcel is a gift with a date. If they cannot find the answer themselves, they write to support, and support is busiest exactly then.

Many holiday buyers order as guests. Asking them to log in to track an order they placed without an account sends them to support as well.

## Failure signals

- There is no tracking link in the header or footer.
- Tracking requires an account, even for guest orders.
- The tracking link in the confirmation email only leads to a carrier page with no order details.
- The order status page shows no expected delivery date.

## How to verify

1. On the home page, a product page and the cart, look for a link to order tracking in the header or footer.
2. Place a guest test order. Open the tracking page in a private window and enter only the order number and email address.
3. Confirm the page shows the current status and the expected delivery date.
4. Confirm the confirmation email links to the same page.

## Recommended fix

Add a "Track order" link to the footer, and in the holiday season also to the header. Let customers look up an order with order number and email. Show the current status and the expected delivery date, and link to the carrier tracking from there.
