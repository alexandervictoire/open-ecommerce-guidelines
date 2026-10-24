---
id: PLP-DC-SALE-01
title: All reduced products can be found in one place
category: plp
dimension: decision-clarity
severity: medium
targets: [human, agent]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether there is one listing that contains exactly the products on sale, reachable from the main navigation, and whether normal category pages can be filtered to show only reduced products.

## Why it matters

A large share of sale visitors come to see what is reduced. If the sale products are spread across the whole range, the shopper has to look at every category and check each price. Most give up long before that.

The listing must also be correct. A sale page that shows full-price products, or misses half of the reduced ones, makes the shopper doubt the sale itself.

## Failure signals

- There is no sale listing, only banners that link to the home page.
- The sale listing contains products that are not reduced.
- Reduced products exist that are not in the sale listing.
- Category pages cannot be filtered to show only reduced products.
- The sale listing cannot be sorted by size of reduction or by price.

## How to verify

1. Find the sale listing from the main navigation.
2. Open ten products from it. Confirm each one is actually reduced.
3. Open a normal category and look for reduced products there. Confirm they also appear in the sale listing.
4. On a category page, confirm there is a filter for reduced products.
5. Confirm the sale listing has its own URL that can be shared. See [PLP-SR-URL-01](/guidelines/plp/plp-sr-url-01/).

## Recommended fix

Fill the sale listing automatically from the price rules, not by hand, so it cannot drift from what is actually reduced. Add a "reduced" filter to category pages. Offer sorting by price and by discount. Remove the sale listing from the navigation when the sale ends.
