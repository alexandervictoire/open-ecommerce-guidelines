---
id: PDP-ME-ALIGN-01
title: Structured product data aligns with visible content
category: pdp
dimension: machine-extractability
severity: critical
targets: [agent, machine]
status: published
---

## What is being checked

Checks whether structured product data (e.g., http://schema.org/ markup, JSON-LD, microdata) accurately reflects the product information visible to users on the PDP.

## Why it matters

When structured data diverges from visible content, automated systems ingest incorrect product information, leading to indexing errors, flawed recommendations, failed agent decisions, and loss of platform trust.

## Failure signals

- Structured price differs from displayed price
- Availability markup contradicts visible stock status
- Product marked as "InStock" but cannot be purchased
- Variant data missing or inconsistent
- Structured brand or product name differs from visible content
- Outdated structured data persists after product updates

## How to verify

1. Extract the structured product data using a schema validation tool or browser inspection and compare key attributes (product name, price, availability, brand, variant data) against the visible PDP content.
2. Confirm that both representations match without contradiction.

## Recommended fix

Ensure that structured product data is dynamically synchronized with the visible PDP content and updated whenever product attributes change.
