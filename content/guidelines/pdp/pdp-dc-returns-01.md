---
id: PDP-DC-RETURNS-01
title: Return conditions are visible before purchase
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether return conditions are clearly communicated on the PDP before the user commits to a purchase. Two things are checked separately: the statutory right of withdrawal, where the customer has one, and any voluntary return policy the shop offers in addition. The page keeps them apart rather than presenting them as one policy.

## Why it matters

Absent return information elevates commitment risk and reduces purchase confidence while limiting agents' ability to evaluate transactional safety.

## Failure signals

- No return information on the PDP
- Return conditions are hidden deep in legal pages
- Return messaging is ambiguous or contradictory
- Return conditions differ between PDP and checkout
- A return period that is the statutory withdrawal right is presented as a concession of the shop

## How to verify

1. Inspect the PDP and confirm that return conditions (e.g. return period, exclusions) are visible or directly accessible without entering checkout.
2. Where the customer has a statutory withdrawal right, confirm that it is stated as a right and not only folded into the shop's voluntary return policy.

## Recommended fix

Provide clear and consistent return information on the PDP that is accessible before purchase commitment. State the statutory withdrawal right as such, and describe a voluntary policy as what it adds on top.

The legal guarantee of conformity is a separate statutory right with its own prescribed notice, covered by `PDP-TDE-GUAR-01`.
