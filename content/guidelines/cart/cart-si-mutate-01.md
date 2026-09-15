---
id: CART-SI-MUTATE-01
title: The cart contains only what the customer chose
category: cart
dimension: semantic-integrity
severity: high
targets: [human, agent]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 22"]
jurisdiction: [eu]
---

## What is being checked

Whether every line in the cart was put there by the user, and whether no line was replaced without the user accepting it. Automatically added samples, gifts, insurance, packaging options, service plans and donations are in scope, whether or not they carry a charge.

Neighbouring checks are covered elsewhere: a paid option or consent control that is pre-selected or pre-ticked, in the cart as well as in checkout, by `CHECKOUT-DC-OPTIN-01`; quantities that change across navigation by `CART-SR-QTY-01`; and the selected variant carried from the product page into the cart by `CART-SR-PERSIST-01`.

## Why it matters

A cart the user did not build is not a cart, it is a proposal presented as a record. The practical harm is direct where the addition is paid, since the user pays for something they did not choose, and EU consumer law requires express consent for any payment beyond the main obligation rather than consent inferred from a default.

Even where the addition is free, the harm is real: the user can no longer trust the cart as a statement of what they selected, which means every line has to be re-read, which is friction introduced by the shop's own merchandising.

A free gift added automatically and then removed when the qualifying line changes is the version of this that produces support tickets, because the user perceives a deletion they did not make.

## Failure signals

- A paid item such as insurance, express handling or extended warranty is added to the cart as a line without the user having chosen it.
- A free item is auto-added and later auto-removed as the cart changes, with no explanation.
- An upsell module changes a line's variant in place, for example upgrading a size, rather than offering a separate line.
- A paid line has no way to remove it.
- A free promotional line appears with no explanation of why it is there and what makes it go away.

## How to verify

1. Build a cart consisting only of deliberately chosen lines.
2. Compare the cart contents against what was selected and confirm they match exactly.
3. Confirm every paid line can be removed. A free promotional item added by a rule may not be removable on its own, which is acceptable; what it must have is a visible explanation of why it is in the cart.
4. Cross a promotional threshold, for example a free gift or free delivery threshold, and confirm any resulting addition is announced rather than silent.
5. Fall back below that threshold and confirm any removal is announced.

## Recommended fix

Require an explicit user action for every paid line. Where a promotion adds an item automatically, render it with a visible explanation of why it is there and what removes it, and announce both addition and removal. Never let an upsell mutate an existing line; offer a replacement the user has to accept.

## Shopware specific

Native promotions apply discounts, including automatic promotions without a code, but none of their discount types adds a product to the cart. An automatically added gift or paid item therefore comes from an extension; review the extensions that can write to the cart.

## Shopify specific

Check the installed apps that can write to the cart before auditing; the theme does not reveal them.
