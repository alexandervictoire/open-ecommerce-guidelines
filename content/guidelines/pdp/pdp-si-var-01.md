---
id: PDP-SI-VAR-01
title: Variant selection does not redefine product identity
category: pdp
dimension: semantic-integrity
severity: high
targets: [agent, machine]
status: published
---

## What is being checked

Checks whether selecting a product variant modifies attributes without redefining the core product identity or semantic meaning.

## Why it matters

If variant selection alters product identity, systems cannot reliably group or compare products, leading to semantic instability and flawed recommendations.

## Failure signals

- Product title changes to a different product concept
- Variant selection introduces conflicting descriptions
- Core attributes are reinterpreted per variant
- Variant behaves like a separate product without clarification

## How to verify

1. Switch between variants and observe changes to product title, description, and core attributes.
2. Verify that variants adjust properties without changing the underlying product identity.

## Recommended fix

Ensure that variant selection only modifies defined attributes and does not alter the core semantic identity of the product.
