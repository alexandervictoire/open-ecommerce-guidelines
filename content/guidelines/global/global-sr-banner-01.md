---
id: GLOBAL-SR-BANNER-01
title: Sale banners and timers do not get in the way
category: global
dimension: system-robustness
severity: high
targets: [human]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
regulation: ["Dir (EU) 2019/882", "EN 301 549 / WCAG 2.1 AA: 1.4.3, 2.2.2, 1.4.10"]
jurisdiction: [eu]
---

## What is being checked

Whether the extra elements added for a sale (top bars, badges, countdowns, pop-ups) can be read, can be stopped or closed, and leave the actual product information in view on a phone.

This is partly an accessibility requirement under the European Accessibility Act, checked against EN 301 549 and WCAG 2.1 AA: text contrast (1.4.3), pausing or hiding content that updates by itself (2.2.2), and use at narrow screen widths without sideways scrolling (1.4.10).

## Why it matters

During a sale, most visits come from phones. In 2025, mobile devices placed about 70 % of online orders worldwide during Cyber Week. On a small screen, a top bar, a cookie layer, a sale badge and a pop-up can together cover the product name, the price and the buy button. The shopper came for a product and sees only campaign.

A countdown that ticks every second is moving content. People who are easily distracted, and screen reader users whose device reads every change aloud, need a way to stop it.

**Scope note:** microenterprises (fewer than ten people and turnover or balance sheet at or below two million euro) are exempt from the accessibility requirement. The condition is still worth meeting, but record it as an improvement rather than a compliance failure for them.

## Failure signals

- On a 375 px wide screen, sale elements push the product name, price or buy button below the first screen.
- A sale pop-up cannot be closed, or its close button is tiny or low in contrast.
- Banner text on a coloured or image background does not reach a contrast of 4.5:1.
- A countdown updates every second and cannot be paused or hidden.
- A screen reader announces the countdown again and again.
- Several sale bars are stacked on top of each other.

## How to verify

1. Open a product page on a phone, or at 375 px width, with the sale running. Confirm product name, price and buy button are visible in the first screen. See also [PDP-DC-VIEWPORT-01](/guidelines/pdp/pdp-dc-viewport-01/).
2. Measure the contrast of all sale text against its background. Confirm at least 4.5:1, or 3:1 for large text.
3. Confirm every pop-up can be closed with a visible button and with the Escape key.
4. Confirm a countdown either has a pause or hide control, or updates no more than once a minute.
5. Turn on a screen reader and stay on the page for one minute. Confirm the countdown is not read out repeatedly.

## Recommended fix

Use one sale bar, one line high, with plain text. Show minutes or days instead of seconds on countdowns, and do not mark them as a live region. Delay pop-ups until the shopper has looked at something, and make them easy to close. Check every new sale element on a phone before it goes live. For rotating banners, see [GLOBAL-DC-CAROUSEL-01](/guidelines/global/global-dc-carousel-01/).
