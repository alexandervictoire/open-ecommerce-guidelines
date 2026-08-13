---
id: PDP-SR-PRICE-01
title: Price is rendered as authoritative text in DOM
category: pdp
dimension: system-robustness
severity: critical
targets: [human, agent, machine]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether the final purchasable price is rendered as static, machine-readable text in the DOM, consistent with structured data, and does not change unexpectedly during checkout.

## Why it matters

If price cannot be reliably parsed, automated systems cannot evaluate affordability, rank products, or execute transactions.

## Failure signals

- Price missing in DOM
- Price injected only via JavaScript
- Structured data price differs from visible price
- Price changes at checkout
- Currency mismatch
- Hidden mandatory fees

## How to verify

1. Inspect the PDP and confirm the final price is visible as machine-readable text in the DOM (not JavaScript-only).
2. Disable JavaScript to verify a server-rendered fallback exists.
3. Cross-check structured data for price consistency.
4. Add the product to cart and confirm the price does not change or reveal hidden mandatory fees.

## Recommended fix

Render the final purchasable price as static, machine-readable text in the DOM that does not rely solely on client-side rendering.
