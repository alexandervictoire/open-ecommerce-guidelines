---
id: PDP-DC-ATF-01
title: Above-the-fold decision completeness
category: pdp
dimension: decision-clarity
severity: high
targets: [human]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the PDP above-the-fold area contains all critical purchase decision elements required for a confident buying action.

## Why it matters

Incomplete above-the-fold structures increase hesitation, reduce impulse purchasing behavior, and negatively impact paid traffic efficiency and bounce rate.

## Failure signals

- Primary CTA not visible without scroll
- Final price not visible within initial viewport
- Variant selection state unclear or hidden
- Delivery information only visible after scrolling
- No visible trust reinforcement element above-the-fold

## How to verify

1. Load PDP in clean browser session.
2. Test on standard desktop resolution (1440px width) and common mobile viewport (390px width).
3. Do not scroll.
4. Check whether the following elements are immediately visible:
   - Product title
   - Final price
   - Selected variant
   - Primary CTA
   - Delivery information
   - At least one trust element
5. Document missing elements per device type.

## Recommended fix

Restructure above-the-fold section so that purchase decision can be made without scrolling: show final price, clear primary CTA, variant state, delivery expectations, and at least one trust signal within the initial viewport (desktop + mobile).
