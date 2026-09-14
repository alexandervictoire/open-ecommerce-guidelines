---
id: PLP-ME-TILE-01
title: Listing tiles show title, price and availability as text
category: plp
dimension: machine-extractability
severity: high
targets: [agent, machine]
status: draft
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether each listing tile renders its product title, price and availability state as text in the document, reachable without executing user interactions such as hovering or scrolling, and whether the listing as a whole is expressed as an ordered item list in structured data.

## Why it matters

The listing is the entry point for any automated reading of a catalogue, whether that is a shopping agent, a price comparison crawler or a site search index. A tile whose price is painted in after an interaction, or whose title exists only as the alt text of an image, is invisible to all of them, no matter how clear it looks to a person.

This is the listing counterpart of the existing product page guidelines requiring price and availability to be authoritative text in the DOM. Those guidelines close the product page and leave the surface that leads to it open.

## Failure signals

- Tile prices are injected only after a client-side request that runs on scroll or hover.
- The product title exists only as image alt text or as a CSS background label.
- Availability is conveyed only by a colour, an icon, or a disabled button state with no text equivalent.
- Tiles below the initial viewport are absent from the served document and appear only after scrolling, with no non-scrolled equivalent.
- No `ItemList` structured data, or an `ItemList` whose entries do not correspond to the tiles actually rendered.

## How to verify

1. Request the listing URL and read the served document without executing scripts, or disable JavaScript in the browser.
2. Confirm that titles, prices and availability text for the tiles are present.
3. Re-enable scripts and scroll to the end of the listing. If more tiles appear than the served document contained, confirm those extra results are also reachable at their own URL, as `PLP-SR-URL-01` requires. Extra tiles are not themselves a failure; extra tiles that exist only behind scrolling are.
4. Inspect the structured data and confirm an `ItemList` exists whose members match the rendered tiles in order.

Whether the tile's availability wording agrees with the product detail page is checked separately by `PDP-SI-SURFACE-01`; this guideline only asks that the wording exists as text.

## Recommended fix

Render tile title, price and availability as server-side text. Where lazy rendering is used for performance, ensure a client that does not run scripts still receives the first page of results in full, and that further results are reachable by URL. Emit `ItemList` structured data generated from the same data that produced the tiles.

## Shopware specific

The standard Twig storefront renders listings on the server. For headless frontends, including Shopware Frontends, confirm that the listing route is server-rendered rather than rendered only in the browser.

## Shopify specific

Liquid renders the first page of a collection on the server. Where filtering or pagination is handled by an app or custom script, request a filtered URL directly and confirm the served document contains tiles.
