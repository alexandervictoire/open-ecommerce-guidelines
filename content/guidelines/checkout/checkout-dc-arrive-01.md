---
id: CHECKOUT-DC-ARRIVE-01
title: Each delivery option shows the expected arrival date
category: checkout
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether every delivery option in checkout shows an expected arrival date or date range, based on the current day and the shopper's address, and not only a duration.

## Why it matters

In checkout the shopper makes their last decision: which delivery option? For a gift, that choice only makes sense with a date. "Standard, 3 to 5 working days" asks the shopper to count weekends and holidays. "Arrives Thu 18 to Sat 20 December" answers the question directly.

In a 2025 survey by Narvar, 56 % of US shoppers said an accurate delivery date makes them more likely to buy. 20 % of shoppers in a Baymard study abandoned a purchase because delivery was too slow, often because they could not tell whether it was.

## Failure signals

- Delivery options only show a duration, not a date.
- The date does not change with the order day, weekends or holidays.
- The date does not change with the delivery country.
- After the last order date, standard delivery still appears to arrive in time.
- The order confirmation shows no expected arrival date.

## How to verify

1. Go to the delivery step in checkout with a test address.
2. Confirm each option shows a date or date range.
3. Repeat on a Friday afternoon or before a holiday. Confirm the dates move accordingly.
4. Change the address to another country. Confirm the dates change.
5. Place a test order. Confirm the confirmation shows the expected arrival date.

## Recommended fix

Calculate the arrival date from order time, processing time, carrier transit time, weekends and public holidays. Show it next to each delivery option, and repeat it in the order confirmation. During the holiday season, add a note to each option that will not arrive before the holiday. See [GLOBAL-DC-CUTOFF-01](/guidelines/global/global-dc-cutoff-01/).
