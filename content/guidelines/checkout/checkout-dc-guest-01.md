---
id: CHECKOUT-DC-GUEST-01
title: Consumers can complete a purchase without creating an account
category: checkout
dimension: decision-clarity
severity: high
targets: [human]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
---

## What is being checked

Whether a consumer storefront allows an order to be completed without registering an account, and whether the guest path is presented as an equal option rather than as a concession.

Scope: this guideline applies to consumer-facing sales channels. Business-facing channels legitimately require identified, approved accounts, and a B2B storefront that requires registration does not fail this.

## Why it matters

Forced registration asks the user to make a second decision, about an ongoing relationship, in the middle of making the first one, about a purchase. Many users decline the second and lose the first with it. The account can be offered afterwards, from the confirmation page, where the user already has a reason to accept it.

The data argument for forced registration is weaker than it looks, since the order already carries the contact and address details that make the account useful.

## Failure signals

- Checkout begins with a registration form and offers no alternative.
- A guest option exists but is visually subordinate, for example rendered as a text link beneath a prominent registration panel.
- Guest checkout collects a password anyway, creating an account without describing it as one.
- The guest path omits order confirmation details that the registered path provides.
- Guest checkout exists but is disabled for the payment method the user has chosen.

## How to verify

1. Reach checkout as an anonymous visitor in a consumer sales channel.
2. Confirm a path to complete the order without registering, and confirm it is presented with comparable prominence.
3. Complete a guest order in a test environment and confirm the confirmation contains the same content as a registered order.
4. Confirm no password is required along the guest path.
5. Confirm the guest path is available for every payment method offered.

## Recommended fix

Enable guest ordering on consumer channels, present it with equal weight to signing in, and offer account creation after the order is placed, pre-filled from the order data.

## Shopware specific

The standard checkout always offers ordering without a customer account. The setting "Create customer account by default" decides whether account creation is pre-selected on the checkout page; check that it is off, or that the guest path stays equally prominent with it on.

## Shopify specific

Check whether "Require customers to sign in to their account before checkout" is active in the checkout settings' customer contact method section; with it on, customers must sign in first and accelerated checkout options are hidden in the online store cart. Also check whether an installed app forces identification.
