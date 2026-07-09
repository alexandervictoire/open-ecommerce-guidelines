---
id: PDP-SR-LOAD-01
title: PDP loads core decision data without delay
category: pdp
dimension: system-robustness
severity: high
targets: [human, agent]
status: published
---

## What is being checked

Checks whether essential product data loads reliably without blocking states.

## Why it matters

Delayed decision data interrupts evaluation flow and increases bounce probability.

## Failure signals

- Price loads late
- CTA appears delayed
- Layout shifts

## How to verify

1. Load the PDP on a standard desktop connection and observe whether price, availability, and CTA state appear immediately without intermediate loading states.

## Recommended fix

Ensure that essential decision data (price, availability, primary CTA state) is rendered reliably on initial load with stable placeholders and without blocking states or late client-side injection.
