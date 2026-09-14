---
id: CHECKOUT-ME-AUTOFILL-01
title: Address and contact fields carry correct autocomplete tokens
category: checkout
dimension: machine-extractability
severity: medium
targets: [human, agent, machine]
status: draft
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["EN 301 549 / WCAG 2.1 AA: 1.3.5"]
jurisdiction: [eu]
---

## What is being checked

Whether every contact and address field in checkout carries the correct autocomplete token, with billing and delivery addresses distinguished by the appropriate section grouping, and whether the tokens match the field's actual purpose.

## Why it matters

This single attribute serves three audiences at once, which is why it is worth a guideline despite being one line of markup per field. It lets browsers and password managers fill the form, which is the largest available reduction in checkout effort. It satisfies the accessibility requirement to identify input purpose, which helps users with cognitive disabilities and people who use symbol-based communication tools. And it tells an automated client what each field is without inference from label text, which is otherwise guesswork across languages.

Incorrect tokens are worse than absent ones, because the browser fills confidently and wrongly, and the user does not always notice before submitting.

## Failure signals

- Fields carry no autocomplete attributes.
- Billing and delivery fields carry identical tokens with no section grouping, so the browser fills one address into both.
- A token does not match the field, for example a postcode field tokenised as address line two.
- Autocomplete is actively disabled on address or contact fields.
- Custom fields added by a plugin or app carry no tokens while the standard fields do.

## How to verify

1. Inspect each field on the address and contact steps and record its autocomplete token.
2. Confirm tokens match the field purpose and that billing and delivery are distinguished by section grouping.
3. With a browser profile containing a saved address, trigger autofill and confirm values land in the correct fields.
4. Repeat where billing and delivery differ, confirming the two are not conflated.
5. Confirm any custom fields are tokenised or deliberately left untokenised because no token applies.

## Recommended fix

Tokenise every contact and address field, group billing and delivery with the appropriate section prefixes, verify with a real browser profile rather than by inspection alone, and include tokenisation in the definition of done for any custom checkout field.

## Shopware specific

Core address and contact fields in the standard storefront carry autocomplete tokens. Check fields added by extensions, which may not.

## Shopify specific

The checkout is rendered by Shopify. Check theme-owned forms earlier in the path and fields added through checkout extensions.
