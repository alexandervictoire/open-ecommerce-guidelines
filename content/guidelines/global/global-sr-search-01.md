---
id: GLOBAL-SR-SEARCH-01
title: Search results are addressable and the empty state is handled
category: global
dimension: system-robustness
severity: medium
targets: [human, agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether a search produces a result page at its own URL containing the query, and whether a search returning nothing gives the user a route onward rather than a dead end.

## Why it matters

Searching users convert at several times the rate of browsing users, because a search is a declaration of intent. That makes the search result page one of the highest-value templates in the shop and, in practice, one of the least maintained.

Addressability matters for the same reasons it matters on listings: a search that cannot be linked cannot be shared, bookmarked, returned to after viewing a product, or retrieved by an agent that knows what it is looking for but not where the shop filed it.

The empty state is where intent goes to die. A user who searched for something the shop sells under another name, and received a blank page, leaves believing the shop does not stock it.

## Failure signals

- Search results appear only in an overlay with no result page or URL.
- The result URL does not contain the query, so reloading clears it.
- A no-results page offers nothing but a repeat of the search field.
- The empty state gives no indication of whether the term was unrecognised or simply out of stock.
- Search ignores common alternative spellings and product codes with no fallback.
- The result page is excluded from the layout's navigation, stranding the user.

## How to verify

1. Search for a term that matches products, and confirm a result page at a URL containing the query.
2. Reload the URL and confirm the same results.
3. Open it in a fresh session and confirm it works without prior state.
4. Search for a deliberately unmatched term and confirm the empty state offers categories, popular products or a contact route.
5. Search for a product code and a misspelling of a stocked product, and confirm the behaviour is reasonable or that the empty state compensates.

## Recommended fix

Keep a real, addressable search result page even where an overlay provides the primary interface, carry the query in the URL, and treat the empty state as a merchandising surface: offer categories, popular products and a way to ask a human.

## Shopware specific

Search results are served at `/search` with the query in the `search` parameter, so addressability normally passes. The empty state is template-owned; check what it offers.

## Shopify specific

Search results are served at `/search` with the query in the `q` parameter. Where an app replaces search with an overlay, check that an addressable result page still exists.
