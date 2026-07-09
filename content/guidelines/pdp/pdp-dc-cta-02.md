---
id: PDP-DC-CTA-02
title: Primary CTA state is always explainable
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
---

## What is being checked

Checks whether the primary call-to-action on the PDP always communicates a clear and explicit reason when it is disabled or unavailable.

## Why it matters

Unexplained CTA states block purchase progression by obscuring required conditions, leading to user confusion and preventing agents from resolving transaction blockers.

## Failure signals

- CTA is disabled without explanation
- CTA state changes without visible reason
- User must guess which condition is missing
- Explanation is only provided via tooltip or hover

## How to verify

1. Observe the primary CTA across all product states (e.g. unavailable, out of stock, variant not selected).
2. Verify that any disabled or inactive state is accompanied by an explicit textual explanation.

## Recommended fix

Ensure that any disabled or unavailable primary CTA state is paired with a visible textual explanation describing the blocking condition.
