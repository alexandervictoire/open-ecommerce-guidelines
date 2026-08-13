---
id: PDP-ME-ATTR-01
title: Core product attributes are presented as structured text
category: pdp
dimension: machine-extractability
severity: high
targets: [agent, machine]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether core product attributes (e.g. material, dimensions, weight, color) are rendered as structured, readable text rather than embedded in images or unstructured prose.

## Why it matters

Unstructured attributes limit machine readability and degrade filtering, matching, and recommendation quality for both search systems and agents.

## Failure signals

- Attributes are only shown in images or icons
- Attributes are buried in long paragraph text
- Attribute labels are missing or ambiguous
- Attribute values change without label updates

## How to verify

1. Inspect the PDP content and DOM to confirm that key product attributes are present as distinct text nodes or list items and can be programmatically extracted without interpretation.

## Recommended fix

Render core product attributes as clearly labeled text elements using a consistent and structured format.
