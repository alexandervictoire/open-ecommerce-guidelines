---
id: GLOBAL-SI-URGENCY-01
title: Countdowns and "almost gone" messages are true
category: global
dimension: semantic-integrity
severity: critical
targets: [human, agent]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
regulation: ["Dir 2005/29/EC Annex I point 7", "Dir 2005/29/EC Annex I point 5"]
jurisdiction: [eu]
audience: [b2c]
---

## What is being checked

Whether every urgency message on the site matches reality. A countdown ends when the offer really ends. "Only 3 left" means there are 3 left. "12 people bought this today" means 12 people did. When the sale is over, the sale messages are gone.

## Why it matters

Urgency works because people trust it. A countdown that starts again after a reload, or a stock message that never changes, is noticed quickly, and then the shopper doubts everything else on the page too, including the price and the reviews.

It is also a legal risk. Falsely saying that an offer is only available for a very limited time is on the EU list of practices that are always unfair. In a European check of 399 online shops, 42 used fake countdown timers.

A true deadline, such as the last order date for Christmas or the real end of a sale, does the same job without any of these risks.

## Failure signals

- A countdown starts again when the page is reloaded, in a new browser window, or the next day.
- The offer is still available at the same price after the countdown has ended.
- A countdown shows a different end time on another device or in another time zone.
- "Only X left" stays the same number for days, or appears on every product.
- Purchase or visitor pop-ups cannot be traced back to real orders or real sessions.
- "Last chance" messages run for the whole week.
- Sale banners, badges or timers are still visible after the sale has ended.

## How to verify

1. Note the end time of a countdown. Reload the page, open it in a private window and on a second device. Confirm the end time stays the same.
2. Return after the countdown ends. Confirm the offer, the price and the message have changed.
3. Note a low-stock number on a product. Check it again after a day, or add the stated number to the cart. Confirm the number reflects real stock.
4. Ask the shop where purchase or visitor pop-ups get their data from, and check a sample against the order list.
5. Visit the site after the announced end of the sale. Confirm no sale messages remain.

## Recommended fix

Take every timer and stock message from real data: the sale end date from the price rule, the stock number from inventory. Remove any widget that shows invented numbers. Switch all sale messages off automatically at the end time. On the product page, [PDP-DC-UMS-01](/guidelines/pdp/pdp-dc-ums-01/) covers where honest urgency signals belong.
