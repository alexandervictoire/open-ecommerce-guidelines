---
id: GLOBAL-TDE-GARAN-01
title: Products with a producer durability guarantee carry the GARAN label, and no other product does
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

Whether products covered by a producer's commercial guarantee of durability show the EU GARAN label, filled in for that specific model, before the purchase is made, and whether the label appears nowhere else.

**Who this applies to: only specific products, and only if one condition is met.**
A product needs the label only when its **producer** offers a guarantee that meets all four of these conditions:

1. It is given by the producer, not by the shop.
2. It costs the customer nothing extra.
3. It covers the entire product, not just a part such as the motor or the compressor.
4. It runs for more than two years.

If all four are true, the product must show the GARAN label, filled in with the producer name, the model identifier and the number of years. If even one is false, the product must not show the label.

Most products in a typical shop have no such guarantee, so most products will never carry the label.

**Which shop has to do what**

- A shop with no qualifying producer guarantees in its range: nothing under this guideline.
- A shop selling products such as appliances, tools, electronics or furniture where producers already advertise multi-year guarantees: the label on exactly those products.
- A shop offering its own warranty or a paid extended warranty: nothing under this guideline. Those warranties must never use the GARAN label.

Independently of this guideline, every B2C shop must show the legal guarantee notice. That is covered in [GLOBAL-TDE-GUARANT-01](/guidelines/global/global-tde-guarant-01).

## Why it matters

Customers routinely confuse a producer's guarantee with whatever warranty a shop advertises. The GARAN label gives producer durability guarantees one recognisable format across the EU, so a shopper can tell at a glance which product comes with a guarantee from the producer, for how long, and that it is on top of the legal guarantee rather than instead of it.

From 27 September 2026 the label is part of the required pre-contractual information for online sales of covered products. Problems rarely come from bad intent. They come from a label that was never filled in, a label that only shows up after the order is placed, or a guarantee badge placed on products it does not apply to.

For agents and machines the label is otherwise invisible: it is an image with a QR code. Unless the guarantee is also stated as text, an agent comparing two fridges cannot see that one carries a ten-year producer guarantee and the other does not.

## Failure signals

- A product with a qualifying producer guarantee shows no label.
- The label is used for something it does not cover: a shop warranty, a paid extended warranty, a guarantee on one component, or a guarantee of two years or less.
- The label still shows placeholders ("XX", "Brand/Trademark", "Model identifier"), or one generic label is reused for different models.
- The duration is something other than whole or half years, such as 2,4.
- The label is hidden deep in the image gallery, or is missing at checkout before the order button.
- A compact version of the label is used, but the full label does not open on the first click, hover or tap, or only opens on hover and cannot be reached on a phone.
- A banner with several products shows one label in a way that suggests all of them are covered.
- The label is only an image, with no text saying how many years and that it is a producer durability guarantee.
- The shop's own guarantee badges imitate the look of the GARAN label.

## How to verify

1. Find out which products have a producer guarantee meeting all four conditions. The usual source is supplier data or the producer's product information. If there are none, this guideline does not apply.
2. For each of these products, confirm the product page shows the label with the correct producer name, model identifier and number of years.
3. Confirm the label is visible again directly before the order button in checkout, and appears in the confirmation email.
4. If a compact version is used in space-limited places such as product tiles, confirm the full label opens on the first interaction by mouse, keyboard and touch.
5. Confirm the label has a text equivalent and a clickable link to the same page as its QR code. If the label sits inside a product image, confirm the image opens in a larger, zoomable view.
6. Check the reverse: confirm no product carries the label unless its guarantee meets all four conditions, and that banners with several products attach the label only to the covered items.

**Timing note:** the requirement applies from 27 September 2026. The binding design and content of the label are fixed by the implementing regulation. The Commission's practical guidelines on how to display it are published as the preliminary view of its services, and their placement examples (product page, checkout, confirmation email, promotional placements) are not exhaustive. National details should be confirmed with counsel. This guideline checks what is visible on the site and does not assess whether any individual guarantee is valid.

The shop does not have to research producer websites to find guarantees. The obligation covers guarantees the producer makes available to the shop, which is why gaps usually start in the supplier data feed.

## Recommended fix

Store the producer durability guarantee as structured product data (duration, producer, model identifier) and generate the label for each product from the official template, instead of uploading images by hand. Change nothing on the template except those three fields, and use the RGB colour version for the web.

Show the label on the product page and before the order button, include it in the confirmation email, and use the compact version only where space is limited. Pair every label with a short text such as "5-year producer durability guarantee" and a link to the Your Europe page. Where structured data is exposed, the same fact can be expressed through the `warranty` property of the offer, so agents can read what the image shows.

Keep shop warranties and paid extended warranties visually and verbally separate from the GARAN label, so no customer mistakes one for the other.
