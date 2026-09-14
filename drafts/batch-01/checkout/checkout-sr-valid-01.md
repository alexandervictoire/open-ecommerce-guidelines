---
id: CHECKOUT-SR-VALID-01
title: Validation errors keep what was entered and say what is wrong
category: checkout
dimension: system-robustness
severity: high
targets: [human]
status: draft
shopware_status: no_divergence
shopify_status: platform_specific
---

## What is being checked

Whether a validation failure preserves every valid value already entered, identifies the specific fields at fault, states what is wrong in terms the user can act on, and returns the user to the point of failure rather than to the top of the form.

## Why it matters

Form errors are not rare events at checkout, they are the normal case for a meaningful share of users, because addresses vary more than validation rules assume. What determines whether an error costs an order is what happens after it: a corrected field, or a re-typed form.

Clearing a password field, a card field or a whole step on error is the version that reliably ends sessions, and it is usually a side effect of re-rendering rather than a decision anyone made.

## Failure signals

- Any field is cleared on submission failure.
- The error message is generic, for example reporting only that the form contains errors.
- Errors appear as a summary at the top with no per-field indication.
- Validation rejects legitimate input, for example rejecting spaces in postcodes or refusing addresses without a house number.
- The user is returned to the first step of a multi-step checkout after an error in a later one.
- Errors surface only after submission where the rule could have been evaluated on the field itself.

## How to verify

1. Fill a checkout form completely, then introduce one invalid value.
2. Submit and confirm every other value survives.
3. Confirm the message identifies the specific field and states the problem.
4. Confirm focus or scroll position lands at the failing field.
5. Test known-awkward but valid inputs: postcodes with spaces, addresses without house numbers, names with accented characters and apostrophes, long street names.
6. On a multi-step checkout, introduce an error at the final step and confirm earlier steps retain their data.

## Recommended fix

Repopulate every field from the submitted request on error, attach messages to individual fields, move focus to the first failure, and review validation rules against real address formats in every market served rather than against a single-market assumption.

## Shopify specific

The checkout is rendered by Shopify, so validation of its standard fields is outside the theme's control. Test fields added through checkout extensions and any theme-owned forms before checkout.
