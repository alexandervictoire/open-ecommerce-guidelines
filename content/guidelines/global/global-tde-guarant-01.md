---
id: GLOBAL-TDE-GUARANT-01
title: Every shop shows the legal guarantee notice and keeps commercial guarantees separate from it
category: global
dimension: trust-decision-enablement
severity: high
targets: [human, agent, machine]
status: published
audience: [b2c]
shopware_status: no_divergence
shopify_status: no_divergence
regulation: ["Dir 2011/83/EU Art. 6(1) as amended by Dir (EU) 2024/825", "Implementing Reg (EU) 2025/1960"]
jurisdiction: [eu]
---

## What is being checked

Whether the shop shows the EU harmonised notice on the legal guarantee of conformity, and whether any commercial guarantee the shop advertises or sells is presented as additional to the legal guarantee, never as a replacement for it.

**Who this applies to: every B2C shop in the EU, without exception.**
Every shop that sells goods to consumers must show one standard graphic, the same for all shops, that reminds customers of their legal guarantee: at least two years, and the seller is liable. It is not about any specific product. It is shown once at shop level, the way a legal notice or a privacy link is.

This is a prescribed notice, not a free-text statement. A shop that writes its own sentence about statutory rights does not satisfy it.

Whether individual products additionally need the GARAN label is a separate question with a separate answer. It applies only to products with a qualifying producer guarantee and is covered in [GLOBAL-TDE-GARAN-01](/guidelines/global/global-tde-garan-01).

## Why it matters

Customers routinely confuse the legal guarantee with whatever warranty a shop or brand advertises, and many do not know that the seller is liable for defects regardless of any warranty. That gap is exactly what has allowed extended warranty products to be sold that partly duplicate rights the buyer already holds. The harmonised notice replaces free-form wording with one recognisable format across the EU, so a shopper can tell at a glance what the law gives them.

From 27 September 2026 the notice is part of the required pre-contractual information for online sales. Problems rarely come from bad intent. They come from a notice rebuilt in the shop's own design, a notice that only exists in the terms and conditions, or a shop warranty worded as if it were the customer's only remedy.

There is a commercial case as well as a compliance one. A shop that states the legal position plainly and then explains what its own guarantee adds on top is making a clearer offer than one that lets the two blur. Letting them blur is itself an unfair practice risk.

## Failure signals

- The notice cannot be found anywhere on the site, or the legal guarantee is only described in the terms and conditions.
- A self-written statement about statutory rights is used in place of the official notice.
- The notice has been rebuilt in HTML, cropped, recoloured, shortened or set in the shop's own fonts instead of using the official file.
- The notice is too small to read at normal display size.
- There is only the QR code, with no clickable link to the Your Europe page in the shop's language.
- The order confirmation email does not contain the notice.
- A shop warranty or paid extended warranty is advertised with no statement that the legal guarantee exists independently of it.
- Warranty wording implies it is the only remedy available to the customer.
- Guarantee wording differs between pages in a way that suggests it is entered by hand per product rather than rendered from one source.

## How to verify

1. Check the header or footer, and the checkout, for a link such as "Your legal guarantee rights". Confirm it opens the full, unaltered, colour version of the official notice.
2. Confirm the notice is readable on desktop and mobile without zooming, and that a clickable link to the Your Europe guarantee page in the shop's language sits next to it (for German: `europa.eu/youreurope/garantien`).
3. Place a test order and confirm the notice is in the confirmation email.
4. If the shop offers or sells its own warranty, confirm it is described as additional to the legal guarantee wherever it appears, including product pages, cart add-ons and checkout.
5. Compare several pages and confirm the notice and any guarantee wording come from one shared source rather than from free text in individual product descriptions.

**Timing note:** the requirement applies from 27 September 2026. The binding design and content of the notice are fixed by the implementing regulation. The Commission's practical guidelines on how to display it are published as the preliminary view of its services, and their placement examples (header, product catalogue page, checkout) are not exhaustive. National details should be confirmed with counsel. This guideline checks what is visible on the site and compares it against the prescribed form, rather than judging whether the wording reads reasonably.

## Recommended fix

Download the official notice in the shop's language from the European Commission and use it unchanged, in the RGB colour version for the web. Add a text link to it in the header or footer and in checkout, open the full notice on the first click, place the Your Europe link next to it, and add it to the order confirmation email. This is a one-time change.

Render the notice from a single shared component, so it can be changed in one place and never drifts between pages. Where the shop offers its own warranty, render it through a separate component that states plainly that it does not affect the legal guarantee.

If products in the range carry a producer durability guarantee, continue with [GLOBAL-TDE-GARAN-01](/guidelines/global/global-tde-garan-01).
