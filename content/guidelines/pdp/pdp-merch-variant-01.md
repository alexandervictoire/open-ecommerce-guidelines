---
id: PDP-MERCH-VARIANT-01
title: Related product variants are clearly discoverable and cross-linked
category: pdp
dimension: decision-clarity
severity: high
targets: [human]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether related product variants are structurally interconnected and immediately discoverable, ensuring customers can frictionlessly navigate to preferred alternatives without disrupting the purchase journey.

## Why it matters

High commercial impact.

If alternative variants are not easily discoverable, customers may incorrectly assume limited availability and abandon the purchase despite viable options existing.

Improving variant visibility preserves demand, increases product exposure, and materially strengthens conversion probability.

## Failure signals

- No visible path to alternative variants
- Users must rely on search or category navigation to find other versions
- Related variants exist but are not cross-linked
- Variant discovery requires multiple navigation steps
- Only one version is presented despite additional available options
- Text-only references without visual affordances
- Cross-links exist but lack prominenceVariant relationships are not immediately recognizable

## How to verify

1. Review the PDP and determine whether users can immediately recognize and access alternative variants without leaving the product context.
2. Check for:
3. • Color swatches
4. • Variant selectors
5. • “Available in other colors/materials”
6. • Visual navigation modules
7. • Grouped product families
8. If discovering another variant requires returning to listing pages → fail.

## Recommended fix

Ensure that related product variants (e.g., colors, materials, configurations) are visibly interconnected on the PDP through intuitive navigation elements such as swatches, variant selectors, or “available in other options” modules.

When variants are separated into individual product pages, implement bidirectional cross-linking to allow frictionless exploration between alternatives.

Prioritize visual navigation over text-based discovery.
