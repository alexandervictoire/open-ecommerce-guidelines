---
id: PDP-DC-SUBSCR-01
title: Subscription terms are shown where the customer subscribes
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: draft
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2011/83/EU Art. 6(1)(e),(o),(p)", "BGB §312k (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether a product offered on a recurring basis states, on the page where it is selected, the amount charged per billing period, the length of that period, any minimum term or notice period, and how the arrangement is ended.

## Why it matters

Subscription offers are usually presented with the per-period figure enlarged and the commitment shrunk, because the per-period figure is the flattering one. The result is a user who commits to a total they did not compute, which produces cancellations, chargebacks and complaints rather than retained revenue.

An existing guideline covers the visibility of payment and financing options. It does not cover termination, minimum term, or what the arrangement costs over its committed life, which are the terms that actually decide whether a subscription was a good purchase.

## Failure signals

- A per-period price is shown with no statement of the billing interval.
- A minimum term exists but appears only in terms and conditions.
- No statement of how the arrangement is cancelled anywhere on the page.
- A discounted introductory rate is displayed without the rate that follows it, or without when it begins.
- The subscription option is pre-selected over the one-time purchase option.

## How to verify

1. Open a product that offers a recurring purchase option.
2. Confirm the billing interval is stated as text next to the recurring price.
3. Confirm any minimum term and notice period are stated on the page, not only in linked terms.
4. Confirm the cancellation route is described, and follow it as a signed-in customer to confirm it exists.
5. Where an introductory rate is offered, confirm the subsequent rate and its start are stated with equal prominence.
6. Confirm the one-time purchase option, if offered, is not deselected by default in favour of the subscription.

**Jurisdiction note:** German law additionally requires a permanently and directly reachable cancellation control for continuing obligations concluded online, reachable without signing in. That is a site-level obligation rather than a product page one, so it is checked by `GLOBAL-TDE-LEGAL-01`. What this guideline checks is that the product page says how the arrangement ends; where the control itself belongs is a separate question.

## Recommended fix

Render recurring terms as a labelled block adjacent to the purchase control: amount per period, interval, minimum term, notice period, cancellation route. Derive it from the selling plan or subscription configuration so that it cannot go stale, and never pre-select a recurring option over a one-time one.

## Shopware specific

Subscriptions are a commercial feature (from 6.5.4.0, on the Beyond plan, part of the Shopware Commercial extension) with configurable intervals and a minimum term. On the product page the customer selects a plan next to the add-to-cart option. Check that the selection states the interval and minimum term as text, not only a plan name.

## Shopify specific

Subscriptions are provided by apps built on selling plans, and a plan name can be the only place the interval appears. Check that interval, minimum term and cancellation are stated as explicit text. Shopify's store policies include a subscription policy; if the shop relies on it, check that it is reachable from the product page, not only from checkout.
