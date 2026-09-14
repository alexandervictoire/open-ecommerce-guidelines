---
id: GLOBAL-TDE-BADGE-01
title: Trust marks name who issued them
category: global
dimension: trust-decision-enablement
severity: medium
targets: [human, agent]
status: draft
platforms: [shopware, shopify]
---

## What is being checked

Whether every trust mark, certification logo, award and rating badge displayed on the site identifies who issued it and, where the issuer maintains a verification page, links to the shop's own entry there.

## Why it matters

A badge is a claim someone else is supposed to be making about the shop. If the reader cannot tell who is making it, the badge is a graphic, and readers have adjusted accordingly: unattributed badges now carry close to no persuasive weight while still occupying prime layout.

This cuts one way only. A shop that really holds a certification throws away its whole value by showing it as a flat image, because a shop that holds nothing can show the same image. Naming the issuer is what separates the two, and only the first shop can do it.

## Failure signals

- Certification or seal images with no issuer name and no link.
- A badge linking to the issuer's homepage rather than to the shop's own verification entry.
- Awards with no year or awarding body.
- Aggregate rating badges that do not link to the underlying reviews.
- Self-created badges styled to resemble third-party certifications.
- A badge for a certification that has lapsed.

## How to verify

1. Inventory every badge in the header, footer, product pages and checkout.
2. For each, confirm the issuer is identifiable from the page.
3. Follow any link and confirm it reaches a verification entry for this shop, not a generic page.
4. Confirm any rating badge is traceable to the reviews behind it.
5. Confirm claimed certifications are current.
6. Confirm no badge is self-issued while presented as third-party.

**Shopware and Shopify:** identical in substance. Trust badges are usually theme assets or app-injected widgets, and neither platform validates them. Where a badge comes from an app, confirm the app is actually connected to the certification rather than rendering a static image.

## Recommended fix

Render every badge with its issuer named as text and link it to the shop's verification entry where one exists. Remove badges that cannot be attributed; they occupy attention without earning it. Review the inventory when certifications are renewed.
