---
id: GLOBAL-ME-NAV-01
title: Main navigation is made of real links that work without scripts
category: global
dimension: machine-extractability
severity: medium
targets: [agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether the main category structure of the shop is present in the served document as anchor elements with real URLs, reachable without executing scripts or simulating hover and click.

## Why it matters

Navigation is the map of the catalogue. Anything that reads the shop without a full browser, including agents, crawlers and site search indexers, depends on that map being in the document. A mega menu assembled on hover is invisible to all of them, which means the shop's category structure effectively does not exist outside a mouse session.

The practical consequence is narrow but real: the deeper category structure, which is where most of the catalogue lives, goes undiscovered while the handful of links in the header get all the attention.

## Failure signals

- Category destinations are buttons with script-resolved targets rather than links. A button that only opens a menu is fine; the categories inside it still have to be links.
- Second-level categories exist only in a menu built on interaction.
- Menu contents are fetched on hover rather than rendered with the page.
- Category links are anchors with placeholder destinations and script-driven navigation.
- The mobile navigation exposes a different and smaller set of categories than the desktop one, with no other path to the difference.

## How to verify

1. Request a page and read the served document without executing scripts.
2. Confirm top-level and second-level category links are present as anchors with real URLs.
3. Confirm those URLs load the corresponding listings when requested directly.
4. Compare the set available without scripts against the set in the rendered mega menu.
5. Confirm the mobile navigation does not omit branches that exist nowhere else.

## Recommended fix

Render at least two levels of the category structure as anchors in the served document. Where a mega menu is loaded on demand for performance, keep a server-rendered equivalent available, and ensure every category is reachable through some addressable path even if not exposed in the menu.

## Shopware specific

The standard Twig storefront renders the main navigation from the category tree on the server. For headless frontends, including Shopware Frontends, confirm that navigation is not fetched only in the browser.

## Shopify specific

Menus are rendered by Liquid as links. Check themes and apps that build mega menus in the browser.
