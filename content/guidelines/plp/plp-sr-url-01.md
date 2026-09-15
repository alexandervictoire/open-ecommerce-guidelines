---
id: PLP-SR-URL-01
title: Every set of listing results has its own URL
category: plp
dimension: system-robustness
severity: high
targets: [human, agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether the applied filters, the sort order and the position within a long result set are all expressed in the URL, so that any state of the listing can be shared, bookmarked, reloaded and retrieved directly.

## Why it matters

A filtered listing is the result of user effort. If that effort cannot be captured in a link, it cannot be shared with a colleague, recovered after a reload, or returned to after visiting a product and pressing back. Users experience this as the site losing their work.

The same property determines whether any automated client can reach the catalogue at all. An agent that cannot construct a URL for "this category, this filter, page three" has to simulate interaction to see the products, which is slow, brittle and frequently just fails.

Note the scope: this guideline is about addressability, not about interaction style. Infinite scroll layered on top of addressable pagination passes. Infinite scroll as the only path to results does not.

## Failure signals

- Applying a filter changes the result set but leaves the URL unchanged.
- Reloading after filtering returns the unfiltered listing.
- The browser back control, used after opening a product, returns to the top of an unfiltered listing.
- Results beyond the first page exist only behind repeated scroll events, with no page parameter or equivalent.
- A filter URL copied from the address bar returns different results when opened in a fresh session.

## How to verify

1. Apply two filters and a non-default sort order to a category listing.
2. Confirm the URL changed to reflect all three.
3. Copy the URL, open it in a private window, and confirm the same result set and the same active filter state appear.
4. Reload the page and confirm the state survives.
5. Open a product from the filtered listing, go back, and confirm the filtered position is restored.
6. Navigate to the end of the result set and confirm each further page has its own URL.

## Recommended fix

Treat the URL as the single source of truth for listing state. Write filters, sort and page into it on every change, and build the listing from the URL on load rather than from client-side state. Where an app or plugin owns filtering, verify it round-trips state through the URL before adopting it.

## Shopware specific

The standard listing writes active filters, the sort order (`order`) and the page (`p`) into the URL, and a listing can be requested from such a URL directly. Check that third-party filter extensions do the same rather than keeping state elsewhere.

## Shopify specific

Dawn writes the state of its filter form into the collection URL. Where filtering or sorting comes from an app or a customised theme, check that it does the same, and that the sort order is included.
