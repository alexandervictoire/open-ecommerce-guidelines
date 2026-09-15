---
id: CHECKOUT-DC-COST-01
title: No cost appears at checkout that was not determinable earlier
category: checkout
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 6(1)(e), Art. 6(6)"]
jurisdiction: [eu]
---

## What is being checked

Whether every charge on the final total was either shown earlier in the funnel or made determinable there, meaning the user was told what would determine it. Surcharges for payment method, small orders, handling, packaging, remote destinations and similar are in scope.

## Why it matters

`PDP-DC-TOTAL-01` requires that the total price be determinable before checkout, checked from the product page. This guideline is its counterpart at the far end: the check, made at checkout, that nothing arrived in between. The two look at the same property from opposite ends, and a shop failing one usually fails the other; this one exists because reconciling the final total is the more reliable test.

Late costs are the most reliable predictor of abandonment, and the abandonment is not a pricing response but a trust response. A user who would have accepted a handling fee stated on the product page rejects the same fee when it appears after they have entered their address, because its timing implies it was concealed.

There is a direct commercial consequence as well as a reputational one. Where a trader has not complied with the duty to inform about additional charges before the consumer is bound, the consumer does not bear those charges. An undisclosed fee is therefore not merely risky to display late, it may be uncollectable.

## Failure signals

- A handling, service or small-order fee appears for the first time at checkout.
- A payment method surcharge appears only after the method is selected, with no earlier indication that surcharges exist.
- Delivery cost for the user's destination materially exceeds any figure indicated earlier, with no earlier statement that it varies by destination.
- The total at checkout differs from the cart total without any user action explaining the difference.

## How to verify

1. Record the total shown in the cart.
2. Proceed through checkout, changing only what the flow requires you to supply: address, delivery method and payment method. Accept every default the shop presents.
3. Compare the final total to the recorded one and account for every difference.
4. Select each available payment method in turn and confirm no surcharge appears that was not indicated before checkout.
5. Repeat with a destination away from the default market, if the shop ships beyond it.

Restrictions that block an order rather than add a charge, such as a minimum order value, are checked by `PDP-C-RESTRICT-01`.

## Recommended fix

Enumerate every configured surcharge and either display it earlier or state earlier that it exists and what determines it. How the cart presents a cost that cannot be computed before an address is known is covered by `CART-DC-TOTALS-01`.

## Shopware specific

Shipping costs are configured on the shipping methods. Payment methods have no native surcharge field, so any payment surcharge comes from an extension. List the extensions that add fees before auditing, since they do not show on the storefront until they apply.

## Shopify specific

Fees usually come from apps or from shipping rate configuration and appear only once they apply. Establish which fees exist before auditing.
