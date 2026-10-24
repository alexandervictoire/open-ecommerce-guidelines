---
id: GLOBAL-SR-WEIGHT-01
title: Sale additions do not make the shop slower
category: global
dimension: system-robustness
severity: high
targets: [human, agent, machine]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the home page, a category page and a product page still load fast on a phone once all sale elements are live: banners, timers, pop-ups, videos, apps and tracking scripts.

## Why it matters

The busiest days of the year are the days when the shop adds the most extra code. Each app, widget and video adds weight, and they are often added in the last week without anyone measuring the result.

Speed is money. A study commissioned by Google and carried out by Deloitte found that 0.1 seconds faster mobile load time raised retail conversion by 8.4 % and spending by 9.2 %. The same works the other way: every slow widget costs sales on the days that matter most.

## Failure signals

- On a phone, the main image or main heading of the page appears later than 2.5 seconds (Largest Contentful Paint).
- Sale banners or pop-ups appear after the page has loaded and push the content down (Cumulative Layout Shift above 0.1).
- Apps or scripts from earlier campaigns are still loaded.
- Campaign images are much larger in file size than they need to be.
- A video starts loading before the visitor has scrolled to it.

## How to verify

1. Run a mobile performance test (for example PageSpeed Insights) on the home page, a category page and a product page with all sale elements switched on. Note Largest Contentful Paint and Cumulative Layout Shift.
2. Confirm Largest Contentful Paint is 2.5 seconds or less and Cumulative Layout Shift is 0.1 or less.
3. Run the same test with the sale elements switched off, or compare it with a test from before the campaign. Note how much slower the sale makes each page.
4. List all third-party scripts the pages load. Confirm each one has a current purpose.

## Recommended fix

Measure before and after every new sale element, not only once at the end. Remove apps and scripts that are no longer used. Compress campaign images and load videos only when they come into view. Reserve space for banners in the layout so they do not push content down. Freeze larger changes a few days before the sale starts, so there is time to fix what slows the shop down.
