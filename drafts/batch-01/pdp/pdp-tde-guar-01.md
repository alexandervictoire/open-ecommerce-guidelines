---
id: PDP-TDE-GUAR-01
title: The legal guarantee notice is present before purchase
category: pdp
dimension: trust-decision-enablement
severity: high
targets: [human, machine]
status: draft
audience: [b2c]
platforms: [shopware, shopify]
regulation: ["Dir 2011/83/EU Art. 6(1) as amended by Dir (EU) 2024/825", "Implementing Reg (EU) 2025/1960"]
jurisdiction: [eu]
---

## What is being checked

Whether the product detail page carries the reminder of the statutory conformity guarantee that the consumer has by law, in the harmonised form prescribed for it, and whether any commercial guarantee offered alongside is distinguished from that statutory right rather than presented as a substitute for it.

Note that this is a prescribed notice, not a free-text statement. A shop that writes its own sentence about statutory rights does not satisfy it.

## Why it matters

Consumers routinely do not know they have a statutory remedy, which is precisely why traders have been able to sell extended warranty products that partly duplicate rights the buyer already holds. Surfacing the statutory position is the correction, and from the application date of the amending directive it is a required notice rather than good practice.

There is a commercial case as well as a compliance one. A shop that states the statutory position plainly and then explains what its own commercial guarantee adds on top is making a clearer offer than one that lets the two blur, and blurring them is itself an unfair practice risk.

## Failure signals

- No mention of the statutory guarantee anywhere in the purchase path.
- A paid or free commercial guarantee is advertised with no statement that statutory rights exist independently of it.
- Commercial guarantee wording implies it is the only remedy available.
- The notice exists only in terms and conditions rather than at the point of sale.
- Guarantee wording differs between product pages in a way that suggests it is being entered per product by hand.
- A self-authored statement about statutory rights is used in place of the prescribed harmonised notice.
- A producer commercial guarantee of durability is advertised without the harmonised label that goes with it.

## How to verify

1. Open a product detail page for a physical good sold to consumers.
2. Confirm the harmonised notice is present and reachable without leaving the purchase path, and that what is rendered corresponds to the prescribed form rather than to house wording.
3. If a commercial guarantee is offered, confirm the two are distinguished and that the commercial one is described as additional.
4. Confirm the notice is rendered from a shared component rather than from free text in the product description.
5. Repeat in the checkout summary, where the same information is expected at the point of contract.

**Timing note:** the notice requirement stems from the directive amending the Consumer Rights Directive, which enters into application on 27 September 2026. Its binding design and content were fixed by a Commission implementing regulation adopted in September 2025, covering both the harmonised notice on the legal guarantee of conformity and the harmonised label for a producer commercial guarantee of durability, and applying online as well as in store. Verification should therefore compare what the shop renders against the prescribed form rather than judge whether the wording reads reasonably. Confirm the current form and the national transposition detail with counsel before publishing this guideline.

**Shopware:** there is no dedicated field for this; it is usually solved as a shared storefront block or a CMS element inserted into the product layout. Do not solve it in the product description field, which cannot be maintained centrally.

**Shopify:** usually solved as a section or block in the product template, or a metafield rendered for all products. The same caution applies: per-product free text will drift.

## Recommended fix

Render the statutory guarantee notice from a single shared component included in the product template and the checkout summary, so that its wording can be changed in one place. Where a commercial guarantee is sold, render it through a separate component that explicitly states it does not affect statutory rights.
