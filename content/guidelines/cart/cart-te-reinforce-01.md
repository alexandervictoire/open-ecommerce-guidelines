---
id: CART-TE-REINFORCE-01
title: Cart reinforces the user’s selected product decision with clear visual and attribute confirmation
category: cart
dimension: trust-decision-enablement
severity: high
targets: [human]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether the cart clearly confirms the user’s previously selected product by displaying sufficient visual and textual information to enable immediate recognition without requiring recall. The cart must make it obvious what exact product and configuration was added.

## Why it matters

If the cart does not clearly reinforce the selected product, users cannot confidently confirm their decision and begin to doubt whether the correct item was added. This increases hesitation, slows progression to checkout, and raises abandonment risk. Trust decreases as users feel forced to re-verify their choice. For agents, weak product representation increases ambiguity in interpreting line items and reduces reliability of the cart as a confirmation state.

## Failure signals

- Product image is missing, too small, or not recognizable
- Key attributes (e.g. size, color, configuration) are missing or unclear
- Product representation is too generic to distinguish between variants
- Price is not clearly associated with the displayed product
- User must rely on memory to confirm what was added
- Multiple items appear visually ambiguous or indistinguishable

## How to verify

1. Add a product with a specific variant (e.g. size and color) to the cart.
2. Without referring back to the PDP, check whether the cart alone makes it immediately clear what exact product and configuration was selected.
3. Repeat with similar variants to confirm that items remain distinguishable and unambiguous.

## Recommended fix

Render each cart item as a clear product block including a recognizable image, explicit variant attributes, and unambiguous product naming. Ensure that all decision-relevant attributes are visible without interaction. Prioritize recognition over recall by making the selected configuration immediately identifiable.
