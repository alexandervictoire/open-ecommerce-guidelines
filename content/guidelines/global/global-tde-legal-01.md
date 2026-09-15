---
id: GLOBAL-TDE-LEGAL-01
title: Trader identity and service information are reachable from every page
category: global
dimension: trust-decision-enablement
severity: high
targets: [human, agent, machine]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2000/31/EC Art. 5", "Dir 2011/83/EU Art. 6(1)(b),(c)", "DDG §5 (DE)", "BGB §312k (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether who the trader is, how to reach them, and what the delivery, return, payment and privacy terms are, can all be reached in one step from any page of the shop, and whether the pages behind those links contain substance rather than placeholders.

## Why it matters

For a first-time visitor, the identity of the seller is the single largest open question, and the footer is where they look for the answer. For an agent evaluating whether a shop can be transacted with, the same set of pages is the only available evidence that a real trader stands behind it.

Trader identity and contact details are also a standing legal requirement for online services in the EU, and one of the most frequently deficient areas in small and mid-sized shops, usually not by intent but because the pages were created during setup and never filled in.

## Failure signals

- No trader identity page, or one reachable only from checkout.
- Contact information limited to a web form, with no second channel.
- Policy pages that exist but contain template placeholder text.
- Shipping or return information reachable only from the help centre search.
- Links present in the desktop footer but omitted from the mobile layout.
- Identity information rendered as an image to deter scraping, which also removes it for legitimate readers.
- A shop selling subscriptions or other continuing obligations with no permanently reachable cancellation control, where the market requires one.

## How to verify

1. From a product page, a listing, the cart and the homepage, confirm each of the following is reachable in one step: trader identity, contact, delivery information, returns and withdrawal, payment methods, privacy.
2. Open each and confirm real content rather than placeholder text.
3. Confirm at least one direct contact channel besides a form.
4. If the shop sells subscriptions or other continuing obligations to consumers in Germany, confirm a cancellation control is permanently reachable from every page, without signing in, in the same way the identity page is.
5. Repeat at a mobile viewport.
6. Confirm the information is selectable text.

## Recommended fix

Maintain the full set as first-class pages linked from a persistent footer on every template and every viewport, repeat the assignment for every sales channel and language, and review them for placeholder content, which is the common failure rather than absence. Where the shop sells continuing obligations, treat the cancellation control as part of this set rather than as a feature of the customer account, since the whole point of it is that it works without signing in.

## Shopware specific

Imprint, privacy, terms, revocation, shipping and payment, and contact pages are assigned under Settings, Basic information, and can be set per sales channel; the footer's service navigation links to them. Check every sales channel and every language.

## Shopify specific

Store policies include a legal notice alongside the return, privacy, terms, shipping and subscription policies. Shopify links policies in the checkout footer automatically, but the storefront footer shows them only if the merchant adds them to a menu. Check that the legal notice is filled in and linked from every storefront page, not only from checkout.
