---
id: PDP-DC-VAR-01
title: Variant friction index
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether variant selection is intuitive, clearly communicated, and requires minimal cognitive and interaction effort before enabling purchase.

## Why it matters

High variant friction increases abandonment before add-to-cart, especially in multi-option products (e.g., size, color, configuration). Reducing interaction complexity directly improves add-to-cart rate and overall conversion.

## Failure signals

- • User must interact (click/open dropdown) to understand available variants
- • Selected variant state is visually unclear
- • CTA remains disabled without clear explanation
- • Error messages appear only after failed add-to-cart attempt
- • Variant labels are ambiguous (e.g., unclear sizing, color names without visual support)
- • Excessive number of clicks required before CTA becomes active

## How to verify

1. Open PDP in clean session.Identify whether variant selection is required before purchase.Attempt to understand available options without interacting.Select variants and count required interaction steps before CTA activation.Attempt add-to-cart without selecting variant to test error clarity.Evaluate visual clarity of selected state and variant differentiation.

## Recommended fix

Simplify and clarify variant selection by reducing interaction steps, making selected states immediately visible, and ensuring that users can complete required selections without confusion or unnecessary effort.
