---
id: CHECKOUT-DC-SUMMARY-01
title: What is ordered and what it costs is shown next to the order button
category: checkout
dimension: decision-clarity
severity: high
targets: [human, agent, machine]
status: draft
audience: [b2c]
platforms: [shopware, shopify]
regulation: ["Dir 2011/83/EU Art. 8(2) with Art. 6(1)(a),(e),(o),(p)", "BGB §312j(2) (DE)"]
jurisdiction: [eu, de]
---

## What is being checked

Whether the essential characteristics of what is being ordered, the total price including all charges, and, where applicable, the duration and minimum term of any continuing obligation are visible directly adjacent to the order control, without requiring navigation, scrolling away, or opening a linked page.

## Why it matters

The order control is only meaningful if the user can see what they are ordering at the moment they activate it. A summary that sits at the top of a long page, or behind an accordion, or on the previous step, is not adjacent in any sense the user experiences.

The information also has to be provided directly before the order is placed as a matter of law. Do not overstate the consequence, though, and note the difference from the order button: in German transposition the sanction of the contract not coming into existence attaches specifically to the button labelling duty, not to this adjacent information duty, which is enforced through the ordinary unfair-competition and information-duty routes instead. That is why this guideline is `high` where `CHECKOUT-DC-BUTTON-01` is `critical`.

It is also the single most effective place to prevent post-purchase disputes, because it is the last moment at which a misunderstanding is cheap to correct.

## Failure signals

- The order control is visible without any part of the item summary being visible with it.
- The summary is collapsed behind an accordion that is closed by default.
- The total shown adjacent to the control excludes delivery or is labelled provisional.
- The summary appears only on a previous step.
- For recurring items, the per-period price is shown adjacent but the term is not.
- On mobile, a sticky order control floats over content while the summary is far above it.

## How to verify

1. Reach the final checkout step with a cart containing two items, one of which is recurring if the shop sells such items.
2. Without scrolling, confirm the item descriptions, the total including all charges, and any term information are visible together with the order control.
3. Repeat at a mobile viewport, where a sticky control frequently separates itself from the summary.
4. Confirm no required element of the summary is behind a closed disclosure control.
5. Confirm the total shown here matches the total charged.

**Shopware:** the confirm page presents line items and totals above the order control by default. The frequent regression is a custom theme that collapses the item list on mobile, which splits the two apart precisely where most orders are placed.

**Shopify:** the checkout's final step is platform-rendered and generally presents an order summary, but on narrow viewports the summary is commonly collapsed by default while the order control remains visible. Verify the rendered mobile behaviour rather than the desktop layout.

## Recommended fix

Render the summary immediately above the order control and keep it expanded at every viewport. If space is the reason for collapsing, shorten the item presentation rather than hiding it, and never let a sticky order control separate itself from the summary it belongs to.
