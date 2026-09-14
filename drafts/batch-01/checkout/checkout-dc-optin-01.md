---
id: CHECKOUT-DC-OPTIN-01
title: No paid addition is pre-selected and no consent is pre-ticked
category: checkout
dimension: decision-clarity
severity: high
targets: [human, agent]
status: draft
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 22", "Reg (EU) 2016/679 Art. 4(11), Art. 7"]
jurisdiction: [eu]
---

## What is being checked

Whether every additional charge offered during checkout, such as shipping insurance, express handling, gift wrapping, extended warranty, carbon offset or donation, is unselected by default, and whether every consent control, such as newsletter subscription or marketing permission, is unticked by default.

## Why it matters

A default selection is not a choice. It converts inattention into revenue, which is why it converts well and why it is prohibited: payment beyond the main contractual obligation requires express consent, and consent inferred from a pre-ticked control is not consent.

The commercial argument for pre-selection also does not survive contact with the refund and chargeback data it produces, and the reputational cost lands on the shop rather than on whoever configured the default.

Note what is not in scope: pre-selecting a delivery *method* among several is legitimate, provided it is not the most expensive one presented as unavoidable. The distinction is between choosing a default among alternatives the user must pick from, and adding something the user did not ask for.

## Failure signals

- An insurance, protection or warranty option is selected by default.
- A donation or round-up is active by default.
- A newsletter or marketing consent box is ticked on arrival.
- Consent for marketing is bundled into the same control as accepting the terms of the purchase.
- The most expensive delivery option is pre-selected with no cheaper option visible without expanding a control.
- Deselecting an addition is possible but the control is visually de-emphasised relative to accepting it.

## How to verify

1. Reach checkout with a plain cart and change nothing.
2. Inventory every selectable option and record its initial state.
3. Confirm no option carrying a charge is selected, and no consent control is ticked.
4. Confirm terms acceptance, where required, is separate from any marketing consent.
5. Confirm the pre-selected delivery method, if any, is not the most expensive available.
6. Repeat in the cart, since additions are frequently offered there rather than in checkout.

## Recommended fix

Set every paid option to unselected and every consent control to unticked, as a configuration standard rather than per campaign. Separate terms acceptance from marketing consent. Give accepting and declining equal visual weight.

## Shopware specific

Native promotions only discount. Paid additions come from extensions, for example product option extensions such as Custom Products, and each sets its own default selection. Check every extension that can add a line or a surcharge.

## Shopify specific

Add-ons, upsells and donations come from apps, and each app sets its own default. Check the state as rendered in the cart and checkout rather than as documented.
