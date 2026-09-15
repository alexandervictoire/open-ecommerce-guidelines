---
id: PLP-DC-PRICE-01
title: Listing prices are what the customer pays, and quick-add listings carry the price notices
category: plp
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 98/6/EC Art. 2(a), 3(1)", "PAngV §3, §6 (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Two conditions. First, that the figure shown on a consumer listing tile is the total price payable, on the same basis and of the same amount as the product detail page shows. Second, that where the listing itself can put an item into the cart, without the product detail page being visited, the price disclosures normally carried by the product detail page are present on the listing as well.

## Why it matters

The first condition is the substantive one. Under EU price indication rules the price shown to a consumer is the final price including tax, and the listing is where comparison actually happens, so a tile whose figure is not the payable amount corrupts every comparison made from it. This is about the number being right, not about a label sitting next to it.

The second condition exists because the reasoning that excuses the listing from carrying the disclosures depends on the product detail page being unavoidable. German case law on price indication has accepted that the statements about tax and delivery costs need not sit beside every price, provided they appear on a page the consumer necessarily passes before the ordering process begins, and provided they appear before the item enters the cart. Quick add-to-cart on a listing removes that page from the path. The disclosure obligation does not disappear with it, it moves.

That is why large retailers can show bare figures on category pages and be fine: their listings show payable prices and their listings do not buy anything. A shop that added quick-add to its tiles has changed the situation without changing the disclosures.

## Failure signals

- A consumer listing shows a figure that is not the total payable price, for example a net figure in a consumer context.
- The tile figure and the product detail page figure differ in basis or amount with no variant explanation.
- The listing offers add-to-cart and carries no tax or delivery cost statement anywhere on the page.
- A quick-add control exists on tiles while the shop relies on the product detail page for its price disclosures.
- A shop serving both consumer and business customer groups renders the same figure to both with no indication of which basis applies.

## How to verify

1. Open a category listing as an anonymous consumer visitor.
2. Compare the tile figure with the product detail page figure for the same product and confirm the basis and amount match.
3. Determine whether any control on the listing, including a quick-add button, a hover control, a quick view overlay or a "customers also bought" widget, can add an item to the cart.
4. If any such control exists, confirm the tax and delivery cost statements are present on the listing page itself, clearly assignable to the offers, and not only in a footer or in the terms.
5. If the shop serves business customer groups, repeat signed in as such a customer and confirm the basis is identifiable.

**Jurisdiction note:** the second condition follows German case law on where price disclosures may sit, which turns on the consumer necessarily encountering them before the ordering process begins. Treat it as the safe construction rather than as a settled rule in every member state, and confirm the position for the markets a shop serves.

## Recommended fix

Render tiles from the same price component as the product detail page so the payable figure cannot diverge. Treat quick-add as a decision that moves the disclosure obligation onto the listing, and either carry the statements on the listing or do not offer quick-add.

## Shopware specific

The standard storefront ties the tax and shipping notice on listing tiles to the setting that allows buying from the listing (`core.listing.allowBuyInListing`): with it on, every tile renders the notice; with it off, tiles carry none and the product page provides it. Check that a theme has not removed that block from the tile, and that any quick-view or quick-add extension that adds to the cart from the listing also brings the notice with it.

## Shopify specific

Whether displayed prices include tax is set per market, in the market's taxes and duties settings, not in the theme, so confirm that setting before inspecting templates. Both Dawn (a card setting) and Horizon (a quick-add modal) can add to the cart from a collection page; where quick add is enabled, check that the cards carry the tax and shipping statement.
