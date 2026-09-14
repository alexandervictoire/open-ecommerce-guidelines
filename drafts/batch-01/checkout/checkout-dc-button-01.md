---
id: CHECKOUT-DC-BUTTON-01
title: The order button says that ordering means an obligation to pay
category: checkout
dimension: decision-clarity
severity: critical
targets: [human, agent, machine]
status: draft
audience: [b2c]
platforms: [shopware, shopify]
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

**Shopware:** the confirm page and its button label are part of the storefront template and are fully controllable, and the default German storefront ships compliant wording. Verify that a theme or a translation override has not replaced it, and check each additional language separately.

**Shopify:** the final order control is rendered by Shopify's checkout, not by the theme, so the label is platform-controlled and cannot be freely edited outside the customisation available on the higher plan tier. Verify the actual rendered label in each language rather than assuming the localisation is sufficient. Where it is not, this is a platform-level limitation to escalate and document, not a theme fix, and the shop should be told that plainly.

## Recommended fix

Label the concluding control with wording that states the payment obligation, in every storefront language, and treat that label as a controlled string rather than editable theme copy. Audit express payment paths separately, since they conclude orders outside the main flow.
