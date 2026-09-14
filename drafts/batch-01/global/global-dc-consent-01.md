---
id: GLOBAL-DC-CONSENT-01
title: The consent layer does not obscure commercial information
category: global
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether the cookie or consent layer leaves price, availability and the primary purchase control readable and reachable while it is displayed, and whether the page content underneath is present in the served document rather than withheld until a consent decision is made.

Scope note: this guideline does not evaluate whether the consent mechanism is lawful, which is a question for counsel and depends on facts not visible on the page. It checks only what the layer does to the commercial content around it.

## Why it matters

The consent layer is the first thing every visitor meets and the last thing anyone tests. A layer that covers the price on mobile means the first impression of every new visitor is an obstruction over the information they came for.

The machine-readability half is the one that is usually invisible to the shop: where content is genuinely withheld until consent, an automated client sees a consent notice and nothing else, and the shop's entire catalogue is absent from anything that reads it without clicking. Shops discover this when they find themselves missing from a comparison surface they expected to be in.

## Failure signals

- The layer covers price or the primary purchase control at any common viewport.
- Content is replaced by the consent notice rather than overlaid by it, so nothing is served underneath.
- The layer cannot be dismissed without scrolling on small viewports.
- It reappears on every navigation despite a decision having been recorded.
- It is not reachable or dismissible by keyboard.
- Product content loads only after a consent decision, so a non-consenting visitor sees an empty shop.

## How to verify

1. Open a product detail page in a fresh session at desktop and mobile viewports.
2. With the layer displayed, confirm price, availability and the purchase control remain readable.
3. Confirm the layer can be dismissed by keyboard alone.
4. Request the same URL without executing scripts and confirm product content is present in the served document.
5. Record a decision, navigate to three further pages, and confirm the layer does not reappear.
6. Decline non-essential consent and confirm the shop remains fully usable.

**Shopware and Shopify:** the layer is almost always third-party in both cases, injected before theme content, which is why it is rarely covered by theme QA. Test the deployed configuration rather than the vendor's demo.

## Recommended fix

Position the layer so that it never overlays price or the purchase control at any viewport, serve page content independently of the consent decision, make the layer keyboard operable, and add the consent layer to release testing rather than treating it as vendor-owned.
