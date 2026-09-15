---
id: PDP-DC-PAP-01
title: Price anchoring presence
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the PDP contextualizes the product price through transparent value framing mechanisms that strengthen perceived affordability or advantage.

## Why it matters

Isolated pricing reduces perceived value and increases price sensitivity. Effective price anchoring increases perceived fairness, supports justification of purchase, and improves conversion probability.

## Failure signals

- • Single standalone price shown without contextual comparison
- • No indication of savings, discount, or reference value (if applicable)
- • No bundle, multi-buy, or tiered pricing visibility (where relevant)
- • Pricing advantages hidden below primary decision area
- • A reference price or savings figure fails `PDP-DC-REF-01`: its basis is not identified, or the stated saving does not follow from the stated reference

## How to verify

1. Review pricing area near primary CTA.
2. Identify whether price is contextualized through comparison (e.g., original price, competitor reference, bundle savings).
3. Confirm clarity and transparency of any discount or savings statement.
4. Check whether pricing framing is visible without scrolling excessively.
5. Evaluate whether pricing structure supports value perception rather than ambiguity.

## Recommended fix

Introduce transparent price comparison or value framing elements (e.g., reference pricing, savings display, bundle advantage, tiered pricing) to contextualize the product price and strengthen perceived value.

Whatever is used as a reference must have its basis identified, and any percentage or saving must follow from that reference. `PDP-DC-REF-01` sets out how that is checked.
