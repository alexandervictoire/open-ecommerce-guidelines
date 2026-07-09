---
id: PDP-SR-STOCK-01
title: Stock status reflects real purchasability
category: pdp
dimension: system-robustness
severity: critical
targets: [human, agent, machine]
status: published
---

## What is being checked

Checks whether displayed stock status accurately reflects actual purchase capability.

## Why it matters

When stock information is unreliable, transactions fail and system credibility is severely damaged.

## Failure signals

- In stock but cannot purchase
- Out of stock but purchasable
- Stock updates too late

## How to verify

1. Attempt checkout with the displayed stock state and confirm consistency.

## Recommended fix

Synchronize stock indicators with real-time purchase logic.
