---
id: PDP-DC-VIEWPORT-01
title: Primary product information is visible above initial viewport
category: pdp
dimension: decision-clarity
severity: medium
targets: [human]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether essential product information is visible within the initial viewport without requiring scroll.

## Why it matters

If essential product information is not immediately visible, decision latency increases and users must invest additional effort before evaluating the product.

## Failure signals

- Oversized hero sections push product data below the fold
- Critical decision data requires scrolling
- Promotional content displaces product information

## How to verify

1. Load the PDP on a standard laptop viewport and confirm that core decision elements such as product name, price, and primary CTA are immediately visible.
2. Then do the same for mobile.

## Recommended fix

Prioritize core product information within the initial viewport to support immediate decision evaluation.
