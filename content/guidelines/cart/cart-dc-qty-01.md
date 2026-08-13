---
id: CART-DC-QTY-01
title: Cart quantity value remains fully readable at all supported quantities
category: cart
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the cart UI displays the selected quantity as fully visible, legible, and unambiguous at every quantity level the interface allows the user to reach.

The quantity display must scale or adapt so that multi-digit values remain completely readable without clipping, truncation, overlap, or hidden characters.

## Why it matters

Users cannot reliably confirm how many units they are about to purchase. This directly weakens purchase confidence and increases the risk of unintended order quantities.

For decision-making, unclear quantity display prevents accurate validation of cart contents and raises the chance of hesitation, correction loops, or abandonment.

For machines and agents, the visible cart state becomes harder to interpret or validate from the interface because a core order value is not presented clearly.

## Failure signals

- Quantity text is clipped once it reaches two digits
- Values above 10 are partially hidden inside the control
- Higher values such as 20 are unreadable or only partly visible
- The quantity container does not resize or adapt as the number grows
- Users can continue increasing quantity with buttons, but cannot clearly read the resulting value
- The displayed quantity is visually ambiguous because digits are cut off or crowded

## How to verify

1. Add a product to the cart.
2. Increase quantity using the plus control until the value exceeds 10.
3. Continue to higher values such as 20 if the interface allows it.
4. Observe whether every digit remains fully visible inside the cart quantity control.
5. Confirm there is no clipping, truncation, overlap, or hidden text.
6. Repeat on desktop and mobile viewport sizes if both are supported.
7. Confirm the visible quantity can be read without guessing.

## Recommended fix

Redesign the quantity control so the value container supports all allowed quantity lengths. Use responsive width, padding, font sizing, and overflow rules that keep the full number visible.

If the control only allows button-based quantity changes, the displayed value must remain centered, fully rendered, and visually stable at every supported step. Do not rely on a fixed-width container that was only sized for single-digit values.
