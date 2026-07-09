---
id: PDP-SI-IMAGE-01
title: Product imagery matches selected variant
category: pdp
dimension: semantic-integrity
severity: medium
targets: [human, agent]
status: published
---

## What is being checked

Checks whether the product imagery dynamically reflects the currently selected variant.

## Why it matters

If product imagery does not reflect the selected variant, users may misinterpret the product configuration, increasing error risk, returns, and trust erosion.

## Failure signals

- Image does not change when variant changes
- Incorrect variant imagery displayed
- Default imagery persists across selections
- Visual mismatch with selected attributes

## How to verify

1. Switch between variants and confirm that the primary product imagery updates accordingly and does not display conflicting representations.

## Recommended fix

Ensure that variant selection triggers accurate and synchronized imagery updates.
