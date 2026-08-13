---
id: PDP-DC-DELIVERY-01
title: Delivery time is explicit and state-specific
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether a concrete delivery time or delivery window is explicitly communicated on the PDP and reflects the current product state.

## Why it matters

Missing or vague delivery information increases perceived purchase risk and prevents agents from optimizing for fulfillment constraints.

## Failure signals

- Delivery time is missing or vague (e.g. "soon", "fast shipping")
- Delivery information does not change with availability or variant state
- Delivery details are hidden behind interactions or links
- Delivery time is only communicated during checkout

## How to verify

1. Review the PDP and verify that delivery information is visible as text and reflects the current availability or variant state.
2. Change variants or quantities and observe whether delivery information updates accordingly.

## Recommended fix

Display a concrete delivery time or delivery window on the PDP that updates according to product state and availability.
