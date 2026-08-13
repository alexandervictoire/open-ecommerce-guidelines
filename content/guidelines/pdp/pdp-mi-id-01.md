---
id: PDP-MI-ID-01
title: Canonical Product & Offer Identity
category: pdp
dimension: semantic-integrity
severity: critical
targets: [human, agent, machine]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the product and the specific offer shown on the PDP are clearly and unambiguously identifiable, both for humans and machines.
This includes:
• the product identity (what the item actually is)
• the offer identity (what exactly is being sold in this state)

The PDP must expose a stable, consistent identity layer that does not change depending on layout, interaction, or interpretation.

## Why it matters

Users cannot confidently verify what exact product or configuration they are purchasing.
This increases hesitation and reduces trust, especially for higher-value items.
For machines and agents, the product cannot be reliably identified, compared, or matched with other offers.
This limits discoverability, automation, and future agent-based commerce interactions.

## Failure signals

- • Product name is generic or ambiguous (e.g. “Premium Hoodie”)
- • No brand or model reference visible
- • Multiple variants share the same unclear identity
- • Variant selection changes visuals but not identity (title/SKU unclear)
- • Structured data contains different product information than the visible PDP
- • Missing or inconsistent identifiers (SKU changes, not exposed, or mismatched)
- • Agent cannot determine if two PDPs represent the same product or not

## How to verify

1. • Change variants and check:
2. ◦ Does the identity update clearly and consistently?
3. • Compare:
4. ◦ visible product name vs structured data
5. • Inspect:
6. ◦ Is there a stable identifier (SKU / variant ID)?
7. • Ask:
8. ◦ Could a third party reliably identify this exact product without guessing?

## Recommended fix

• Add missing brand and model information to the PDP title or header
  • Ensure variant selection updates all identity-relevant fields
  • Align JSON-LD / structured data with visible product data
  • Introduce or expose stable identifiers (SKU, GTIN, etc.)
