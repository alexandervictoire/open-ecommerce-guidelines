---
id: PDP-DC-TOTAL-01
title: Total price is determinable before checkout
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether the user can determine the total payable price before entering checkout, including mandatory costs such as shipping or required fees.

## Why it matters

If the total payable price cannot be estimated before checkout, users and agents cannot validate affordability, increasing purchase uncertainty and abandonment probability.

## Failure signals

- Shipping cost only revealed in checkout
- Mandatory fees appear late
- Pricing structure is unclear
- Cost ranges are excessively broad

## How to verify

1. Review the PDP and confirm whether all unavoidable costs can be understood prior to checkout without requiring account creation or address submission.

## Recommended fix

Provide a clear cost structure on the PDP that allows estimation of the total payable amount before checkout.
