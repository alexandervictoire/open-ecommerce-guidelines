---
id: PDP-C-RESTRICT-01
title: Purchase restrictions are disclosed upfront
category: pdp
dimension: decision-clarity
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether any purchase restrictions that can block or limit the transaction are clearly disclosed on the PDP before the user attempts to buy.

## Why it matters

If purchase restrictions are not disclosed upfront, users and agents encounter late-stage blockers that trigger frustration, increase abandonment, and erode transactional trust.

## Failure signals

- Restrictions are only revealed in cart or checkout
- Restrictions are hidden in legal/FAQ pages without PDP visibility
- Restriction messaging is vague or incomplete (e.g., "restrictions may apply")
- Restrictions contradict other PDP information (e.g., "ships worldwide" but checkout blocks regions)
- User can click the primary CTA and only then learns the restriction

## How to verify

1. Review the PDP for explicit restriction messaging near the purchase area (price/CTA).
2. Then attempt a purchase scenario that triggers restrictions (e.g., increase quantity, choose a restricted delivery region if possible, or proceed until the restriction would appear).
3. Confirm the restriction was disclosed on the PDP before the user committed to checkout.

## Recommended fix

Disclose all transaction-blocking restrictions on the PDP near the primary purchase action, using explicit, readable text that matches the actual enforcement logic across cart and checkout.
