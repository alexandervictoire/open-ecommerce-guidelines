---
id: CHECKOUT-DC-FIELD-01
title: Every checkout field has a label, a required marker and errors tied to it
category: checkout
dimension: decision-clarity
severity: high
targets: [human]
status: draft
platforms: [shopware, shopify]
regulation: ["Dir (EU) 2019/882", "EN 301 549 / WCAG 2.1 AA: 3.3.1, 3.3.2, 3.3.3, 1.3.1, 4.1.2"]
jurisdiction: [eu]
---

## What is being checked

Whether every checkout input has a persistently visible label associated with it programmatically, whether required fields are marked in a way that is available to assistive technology and not only visually, and whether validation messages are associated with the fields they describe rather than floating near them.

## Why it matters

Checkout is a form, and a form the user cannot parse is a wall. Placeholder-only labels disappear on focus, which removes the field's meaning exactly when the user is filling it, and they are frequently not announced at all. A required marker rendered as a coloured asterisk in CSS conveys nothing to a screen reader. An error message positioned beside a field but not associated with it is never read in sequence with that field.

These are not marginal cases at this step: the user is entering an address under time pressure with a payment card in hand, and every ambiguity produces either an error or an abandonment.

**Scope note:** the accessibility requirement binds e-commerce services in the EU, but microenterprises providing services, meaning fewer than ten people and turnover or balance sheet at or below two million euro, are exempt from it. Many smaller merchants fall inside that exemption. The condition described here remains worth meeting for them, since it decides whether some customers can buy at all, but record it as an improvement rather than as a compliance failure where the exemption applies.

## Failure signals

- Fields are labelled by placeholder text only.
- Labels are present visually but not associated with their input.
- Required status is conveyed only by an asterisk with no programmatic required state.
- Error messages are rendered adjacent to fields but not associated with them.
- Fieldsets such as a full address or a payment method choice have no group label.
- Format requirements are stated only in an error, after failure, rather than with the field.

## How to verify

1. Move through every checkout field with the keyboard and a screen reader running.
2. Confirm each field announces a meaningful label and, where applicable, that it is required.
3. Confirm labels remain visible when a field contains a value.
4. Trigger a validation error and confirm the message is announced with the field when that field receives focus.
5. Confirm grouped controls announce their group label.
6. Confirm any format requirement is available before submission, not only after.

**Shopware:** the standard checkout form uses labelled inputs with required attributes. Regressions come from themes that convert labels to placeholders for density, and from plugin fields that omit the association.

**Shopify:** the platform checkout is generally sound here. The exposure is in checkout extension fields and in theme-owned forms earlier in the path, both of which are your responsibility rather than the platform's.

## Recommended fix

Give every input a visible, associated label, express required status programmatically as well as visually, associate error messages with their fields, group related controls with a group label, and state format expectations with the field rather than in the error that follows.
