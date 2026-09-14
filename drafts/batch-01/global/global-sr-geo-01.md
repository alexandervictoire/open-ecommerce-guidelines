---
id: GLOBAL-SR-GEO-01
title: Customers from other member states are not blocked or redirected
category: global
dimension: system-robustness
severity: medium
targets: [human]
status: draft
platforms: [shopware, shopify]
regulation: ["Reg (EU) 2018/302 Art. 3, 4, 5"]
jurisdiction: [eu]
---

## What is being checked

Whether a visitor from another EU member state can reach and use the same storefront as a domestic visitor, without being redirected automatically, and whether payment conditions are not varied on the basis of the customer's member state or the location of their payment account.

Scope note: the regulation does not require a trader to deliver everywhere. Declining to ship to a member state is permitted. Blocking access to the site, redirecting without consent, or refusing an otherwise acceptable payment instrument because of where it was issued, are different matters, and those are what this guideline checks. Whether a delivery restriction is disclosed early enough is checked by `PDP-C-RESTRICT-01`.

## Why it matters

Automatic redirection is usually implemented as a convenience and experienced as an obstruction, particularly by the large population of EU residents who do not live where their card was issued or their browser language suggests. The user who wanted the German storefront and is sent to the French one, with no way back, simply leaves.

The payment half is the one with the sharpest edge: refusing a card because of its issuing country, while accepting the same brand and category domestically, is directly within what the regulation addresses.

## Failure signals

- Visitors are redirected to a country storefront automatically with no way to decline or to return.
- The choice of storefront is remembered from the redirect rather than from the user's own selection.
- Access is blocked entirely for visitors from certain member states.
- A payment method available domestically is refused for a card or account issued in another member state.

## How to verify

1. Reach the shop from an IP address in another EU member state, or with a browser locale set to another member state.
2. Confirm no automatic redirect occurs, or that any redirect offers an immediate, persistent way back.
3. Confirm the storefront is fully usable, including reaching checkout.
4. Confirm the payment methods offered do not differ in a way tied to the visitor's member state.

**Shopware:** country-based redirects usually come from a plugin rather than from the platform. Review any storefront-switching extension for automatic redirection without an escape.

**Shopify:** market-based recommendations and redirects are configurable, and the recommendation modes differ from the forced ones. Confirm which is active, and confirm any redirect leaves the visitor able to choose otherwise and keeps that choice.

## Recommended fix

Recommend a storefront rather than imposing one, persist the visitor's own choice above any inference, and keep every storefront reachable by direct URL.
