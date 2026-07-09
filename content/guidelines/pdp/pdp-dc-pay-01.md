---
id: PDP-DC-PAY-01
title: Payment options and financing conditions should be clearly visible before checkout
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: published
---

## What is being checked

Whether the PDP clearly communicates how the product can be paid for, including available payment methods and any relevant financing or installment options, without requiring the user to proceed to checkout.
The user must understand the actual payment reality before committing to the purchase flow.

## Why it matters

Users delay or abandon decisions because they cannot confirm whether the purchase is feasible for them.

This is especially critical for higher-priced products, where payment flexibility directly affects conversion.

For machines and agents, missing payment context limits the ability to evaluate whether a transaction is executable.

## Failure signals

- Payment methods are not visible on the PDP.
- Financing or installment options exist but are only shown in checkout.
- Additional costs or payment constraints are revealed late in the process.
- Users must click through multiple steps to understand how they can pay.
- The PDP creates uncertainty about whether preferred payment methods are supported.

## How to verify

1. Open the PDP and check whether payment methods are visible without interaction.
2. Verify whether financing options, if available, are clearly explained.
3. Confirm that no critical payment information is only revealed in checkout.
4. Assess whether a user can decide if the purchase is financially feasible directly on the PDP.

## Recommended fix

Expose all relevant payment methods directly on the PDP in close proximity to the purchase decision.

If financing or installment options are available, clearly communicate the conditions, including indicative monthly cost where applicable.

Ensure that users can fully understand how they can pay without entering the checkout flow.
