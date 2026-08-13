---
id: CART-SR-PERSIST-01
title: Selected offer state persists unchanged from PDP to Cart
category: cart
dimension: system-robustness
severity: high
targets: [agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether the exact decision-relevant offer state selected on the PDP remains unchanged after the product is added to cart. The cart must preserve the same selected variant, product identity, price, and purchasability state that were shown at the moment of add-to-cart.

## Why it matters

When the selected offer changes between PDP and cart, users cannot trust that the system preserved their decision. This creates immediate purchase hesitation, increases abandonment, and makes the cart feel unreliable or broken. For machines and agents, the transition becomes non-deterministic: the selected offer cannot be safely executed, verified, or re-used as a stable transaction state.

## Failure signals

- Cart price differs from the price shown on the PDP for the selected offer
- Selected variant is reset, replaced, or incompletely transferred in cart
- Product name or identifying offer details change in cart in a way that makes the selected item unclear
- Cart shows a purchasability state that contradicts the selected PDP state without explicit explanation
- Cart resolves the added item to a different configuration than the one the user selected
- Item is added successfully, but cart state forces the user to re-decide core offer attributes

## How to verify

1. Select a specific variant or configuration on the PDP and note the visible product name, variant, price, and purchasability state.
2. Add the item to cart.
3. Compare the cart line item against the selected PDP state.
4. Confirm that no core offer attribute changed silently.
5. Repeat with multiple variants, including edge cases such as low-stock, discounted, or restricted configurations.

## Recommended fix

Pass the selected offer to cart using a stable offer or variant identifier and render cart state from the same authoritative commerce object used at add-to-cart. Do not reconstruct the cart item from loosely matched product data. Lock price, variant, and purchasability state to the selected offer snapshot unless a clearly explained system update occurs.
