---
id: PDP-DC-BUNDLE-01
title: A bundle shows what is inside and what it saves compared to buying the items alone
category: pdp
dimension: decision-clarity
severity: medium
targets: [human, agent, machine]
status: published
season: holiday
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether a bundle or set lists every item it contains, shows the price of those items when bought separately, and states a saving that follows from these figures.

## Why it matters

Bundles and gift sets are a good holiday offer: one click, one ready gift, often a better price. But the shopper can only see the value if they can compare. "Gift set, €49" says nothing. "Contains A, B and C, together €62 when bought separately, you save €13" makes the decision easy.

If the saving does not add up, the bundle looks like a trick, and the shopper starts to doubt other prices in the shop too.

## Failure signals

- The bundle does not list all its contents, or only shows them in a photo.
- The items are not named in a way that lets the shopper find them in the shop.
- No separate price is shown, so the saving cannot be checked.
- The stated saving does not match the difference between the individual prices and the bundle price.
- The individual items cannot be bought separately, but a "saving" is still claimed.

## How to verify

1. Open a bundle product page.
2. Confirm all items are listed as text, with quantity and variant.
3. Look up the current price of each item in the shop. Add them up.
4. Confirm the bundle states the sum of the individual prices and a saving that matches the difference.
5. If the items are not sold separately, confirm no saving is claimed.

## Recommended fix

List the contents as text next to the price, each item linked to its own product page. Calculate the "bought separately" price from the live item prices, so it updates when they change. Only state a saving when the items are actually sold separately. For "what's included" in general, see [PDP-DC-OFF-01](/guidelines/pdp/pdp-dc-off-01/).
