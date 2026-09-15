---
id: CHECKOUT-DC-BUTTON-01
title: The order button says that ordering means an obligation to pay
category: checkout
dimension: decision-clarity
severity: critical
targets: [human, agent, machine]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 8(2)", "BGB §312j(3), (4) (DE)", "BGH I ZR 159/24 (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether the control that concludes the order is labelled so that its effect is unambiguous: that activating it creates an obligation to pay. Labels that describe a step rather than an obligation do not satisfy this.

## Why it matters

This is the single point in the whole funnel where the user's action has legal consequence, and it is routinely labelled as though it were navigation. A control reading "continue" or "next" tells the user they are moving forward, not that they are buying, and users act on that reading.

The severity is set to critical because the consequence is not degraded experience. Under EU distance selling rules a consumer is not bound by an order where the trader failed to label this control unambiguously, and in German transposition the contract does not come about at all. A shop failing this is generating orders that a consumer can walk away from.

German case law has recently hardened rather than softened this. A 2025 decision of the Federal Court of Justice takes the provision at its word: a contract meant to be concluded without the required express confirmation of the payment obligation does not come into existence, and cannot be repaired afterwards by informal confirmation. There is no partially valid state to fall back on, which is why this is the one guideline in the batch where a failure is worth escalating immediately rather than scheduling.

## Failure signals

- The order control reads as a navigation step: "continue", "next", "proceed".
- The control describes a method rather than an obligation, for example naming only the payment provider.
- The label is an icon, or text rendered inside an image.
- The label is unambiguous in the default language but was not adjusted in a translated storefront.
- Express payment controls placed earlier in the flow conclude the order but are labelled as though they only select a method.

## How to verify

1. Proceed to the final step of checkout without completing a purchase.
2. Read the label of the control that would conclude the order and confirm it states the payment obligation.
3. Repeat in every storefront language, since this is where the failure usually survives.
4. For every express payment control offered earlier in the flow, follow it as far as it goes without completing, and establish whether it leads to a review step carrying its own compliant order control or whether the express control is itself the last step. Only the second case falls under this guideline, and where the path cannot be resolved without placing an order, place one.
5. Confirm the label is text, not an image, and is the accessible name of the control.

## Recommended fix

Label the concluding control with wording that states the payment obligation, in every storefront language, and treat that label as a controlled string rather than editable theme copy. Audit express payment paths separately, since they conclude orders outside the main flow.

## Shopware specific

The default German storefront labels the order button "Zahlungspflichtig bestellen", which states the payment obligation. The default English label is "Submit order", which does not. Check the rendered label in every storefront language, and check that no theme or snippet override has replaced the German wording.

## Shopify specific

The order button is rendered by Shopify's checkout rather than the theme, but its default wording can be changed under Settings, Checkout, Edit checkout content; only wording that differs per market requires the Advanced or Plus plan. Check the rendered label in every checkout language rather than assuming the default translation is sufficient.
