---
id: PDP-DC-PRICE-01
title: Price visible without interaction
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
---

## What is being checked

Checks whether the product price is visible on the PDP without requiring any prior user interaction such as variant, size, or quantity selection.

## Why it matters

If the price is not immediately visible, users cannot evaluate affordability and agents cannot perform purchase validation. This introduces decision friction and increases abandonment risk.

## Failure signals

- Price is only shown after selecting a size or variant
- Price is hidden behind disabled states or placeholders
- Price is injected only after user interaction
- Price is rendered as an image or non-text element

## How to verify

1. Load the PDP in a clean session.
2. Verify whether a numeric price value is rendered in the DOM and visible to the user without interacting with variant selectors, dropdowns, or buttons.

## Recommended fix

Ensure that the base product price is rendered as visible text on initial page load, independent of variant or size selection.
