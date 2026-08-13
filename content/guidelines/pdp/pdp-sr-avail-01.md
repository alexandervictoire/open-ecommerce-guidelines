---
id: PDP-SR-AVAIL-01
title: Availability status rendered as text in DOM
category: pdp
dimension: system-robustness
severity: high
targets: [agent, machine]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether the product availability status is rendered as readable text in the DOM and is accessible without relying on images, icons, or client-side interpretation.

## Why it matters

If availability is not rendered as readable text, automated systems cannot determine purchase feasibility, preventing agents from executing or recommending transactions.

## Failure signals

- Availability is only indicated via icons or color states
- Availability text is injected dynamically without a static fallback
- Availability is encoded only in aria labels or tooltips
- No textual availability information exists in the DOM

## How to verify

1. Inspect the PDP DOM and verify that availability information (e.g. in stock, out of stock) is present as visible or hidden text nodes and not solely conveyed via icons, colors, or images.

## Recommended fix

Render product availability status as explicit text in the DOM that can be parsed independently of visual styling or client-side logic.
