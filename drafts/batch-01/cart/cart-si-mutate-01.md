---
id: CART-SI-MUTATE-01
title: The cart changes only when the customer changes it
category: cart
dimension: semantic-integrity
severity: high
targets: [human, agent]
status: draft
audience: [b2c]
platforms: [shopware, shopify]
regulation: ["Dir 2011/83/EU Art. 22"]
jurisdiction: [eu]
---

## What is being checked

Whether anything in the cart, meaning lines, quantities and paid options, was put there by the user. Automatically added samples, gifts, insurance, packaging options, service plans and donations are in scope, whether or not they carry a charge.

## Why it matters

A cart the user did not build is not a cart, it is a proposal presented as a record. The practical harm is direct where the addition is paid, since the user pays for something they did not choose, and EU consumer law requires express consent for any payment beyond the main obligation rather than consent inferred from a default.

Even where the addition is free, the harm is real: the user can no longer trust the cart as a statement of what they selected, which means every line has to be re-read, which is friction introduced by the shop's own merchandising.

A free gift added automatically and then removed when the qualifying line changes is the version of this that produces support tickets, because the user perceives a deletion they did not make.

## Failure signals

- A paid option such as insurance, express handling or extended warranty appears in the cart without having been selected.
- A donation, offset or round-up is added by default rather than offered.
- A free item is auto-added and later auto-removed as the cart changes, with no explanation.
- An upsell module changes a line's variant in place, for example upgrading a size, rather than offering a separate line.
- A paid line has no way to remove or deselect it.
- A free promotional line appears with no explanation of why it is there and what makes it go away.

## How to verify

1. Build a cart consisting only of deliberately chosen lines.
2. Compare the cart contents against what was selected and confirm they match exactly.
3. Confirm every paid line and every paid option can be removed or deselected. A free promotional item added by a rule may not be removable on its own, which is acceptable; what it must have is a visible explanation of why it is in the cart.
4. Cross a promotional threshold, for example a free gift or free delivery threshold, and confirm any resulting addition is announced rather than silent.
5. Fall back below that threshold and confirm any removal is announced.
6. Confirm no pre-ticked control adds a cost.

**Shopware:** promotions can add line items automatically by design. That mechanism is legitimate for free promotional items provided the addition is visible and explained; it is not legitimate for paid additions. Review the configured promotions rather than assuming the default is safe.

**Shopify:** auto-add behaviour usually comes from an installed app rather than the platform. Inventory the apps that can write to the cart before auditing, because the theme will not reveal them.

## Recommended fix

Require an explicit user action for every paid line. Where a promotion adds an item automatically, render it with a visible explanation of why it is there and what removes it, and announce both addition and removal. Never let an upsell mutate an existing line; offer a replacement the user has to accept.
