---
id: CART-ME-CONTENT-01
title: Cart contents are readable as text without interaction
category: cart
dimension: machine-extractability
severity: medium
targets: [agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether the cart's line items, quantities, per-line prices and totals are present as text in a document served at a stable cart URL, without requiring a drawer to be opened or any other interaction to be simulated.

## Why it matters

The cart is the only place where the complete intended order exists in one object. Anything that reads or verifies an order, whether an assistive technology, a support agent reproducing a customer's state, or a shopping agent confirming what it is about to buy, needs that object as text.

Drawer-only carts are the common failure. They are perfectly usable with a mouse and unreachable otherwise, because the content exists only after a click that a non-interactive client cannot perform.

Scope note: this guideline asks that the cart be readable at its own URL by the session that owns it. It does not ask for cart state to be shareable or linkable to third parties, which would leak information.

## Failure signals

- The cart exists only as a drawer with no addressable cart page.
- A cart page exists but renders empty without script execution, with contents injected afterwards.
- Line prices or quantities are held only in form control values with no text equivalent.
- The totals are rendered as an image or as a canvas element.
- The drawer and the cart page disagree about contents.

## How to verify

1. Add items to the cart through the normal interface.
2. Navigate directly to the cart URL and confirm it renders the full cart.
3. Request that URL without executing scripts, within the same session, and confirm line titles, quantities, per-line prices and totals are present as text.
4. Confirm the text matches what the drawer shows.
5. Confirm the cart URL is reachable from every page, not only after an add-to-cart event.

## Recommended fix

Keep a server-rendered cart page as the single true record of what is in the cart, and treat the drawer as a convenient view of it. Ensure both derive from the same response so they cannot disagree.

## Shopware specific

The standard Twig storefront renders the cart page on the server. For headless frontends, including Shopware Frontends, confirm that the cart route is server-rendered.

## Shopify specific

Every store has a cart page at `/cart`, but a theme can route all cart interaction to a drawer. Check that the cart page is maintained and complete, not merely present.
