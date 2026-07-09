---
id: PDP-DC-VAR-REQ-01
title: Variant selection is required before purchase when applicable
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
---

## What is being checked

Checks whether required variant selections are enforced before enabling purchase actions.

## Why it matters

If mandatory selections are not enforced early, users encounter preventable errors that interrupt purchase flow and increase abandonment risk.

## Failure signals

- User can trigger errors after clicking CTA
- Missing variant feedback
- Silent failure

## How to verify

1. Attempt to add the product to cart without selecting mandatory variants and observe whether the interface prevents progression with clear guidance.

## Recommended fix

Require mandatory variant selection before enabling purchase actions and provide immediate guidance.
