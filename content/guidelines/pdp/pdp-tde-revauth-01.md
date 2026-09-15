---
id: PDP-TDE-REVAUTH-01
title: The shop says where reviews come from and how they are checked
category: pdp
dimension: trust-decision-enablement
severity: high
targets: [human, agent, machine]
status: published
audience: [b2c]
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir 2005/29/EC Art. 7(6)", "Dir 2005/29/EC Annex I No. 23b, 23c"]
jurisdiction: [eu]
---

## What is being checked

Whether a page displaying customer reviews states where those reviews come from and what, if anything, was done to establish that the reviewers actually bought or used the product.

## Why it matters

An existing guideline covers whether reviews are informative enough to support a decision. This one covers whether the reader can tell what the reviews are. Those are different questions, and the second one now determines the value of the first: as syndicated, incentivised and generated reviews have spread, an unqualified five-star average carries almost no information.

A shop that verifies purchase and says so is giving away a real advantage by staying silent about it. A shop that does not verify and implies otherwise is in a materially worse position than one that discloses plainly.

In EU consumer law, presenting reviews as coming from actual purchasers without taking reasonable steps to check is a listed unfair practice, and information about whether and how reviews are checked is required where reviews are made accessible.

## Failure signals

- Reviews are displayed with no statement of their source.
- A "verified" badge appears with no explanation anywhere of what was verified.
- Reviews are syndicated from a manufacturer, a marketplace or a sibling product without that being stated.
- The aggregate score includes reviews of other variants or other products in a family, with no indication of this.
- Incentivised reviews are included with no disclosure of the incentive.

## How to verify

1. Open a product detail page with reviews.
2. Look for a statement of source near the review block or behind a clearly labelled link from it.
3. Confirm the statement describes the collection method and what verification, if any, is performed.
4. If any review carries a verification badge, confirm the badge's meaning is defined.
5. Determine whether the aggregate covers this product only or a family, and confirm that scope is stated.
6. Check whether structured review data expresses the same scope as the visible aggregate.

## Recommended fix

Place a short, plain statement adjacent to the review block describing the source, the verification performed and the scope of the aggregate, and link it to a fuller description. Where reviews are syndicated or aggregated across variants, say so at the point where the score appears rather than in a policy page.

## Shopware specific

Native product reviews require a signed-in customer, allow one review per customer per product, and are saved inactive until approved in the administration. Submission does not check for a purchase, and the standard code never sets the storefront's "verified buyer" marker. A shop claiming verified reviews therefore relies on an extension or a manual process; establish which before accepting the claim.

## Shopify specific

Reviews come from third-party apps, whose collection, syndication and aggregation settings differ. Check what the installed app actually does before accepting or writing a disclosure.
