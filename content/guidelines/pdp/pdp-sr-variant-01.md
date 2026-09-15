---
id: PDP-SR-VARIANT-01
title: Variant selection works with the keyboard, and the price change is announced
category: pdp
dimension: system-robustness
severity: high
targets: [human, agent]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir (EU) 2019/882", "EN 301 549 / WCAG 2.1 AA: 2.1.1, 4.1.2, 4.1.3, 1.4.1"]
jurisdiction: [eu]
---

## What is being checked

Whether variant controls such as size, colour and material selectors can be reached, operated and understood using the keyboard alone, and whether the consequences of a selection, namely the updated price and availability, are conveyed to assistive technology rather than only painted on screen.

## Why it matters

Variant selection is the one interaction on a product page that cannot be skipped. If a colour swatch is a `div` with a click handler and no accessible name, a keyboard or screen reader user cannot buy the product at all, regardless of how good the rest of the page is. This is not a degraded experience but a total block, and it is among the most common serious failures in custom storefront themes.

The announcement half matters as much as the operation half. A user who can activate a swatch but is never told that the price changed is making a decision on stale information.

**Scope note:** the accessibility requirement binds e-commerce services in the EU, but microenterprises providing services, meaning fewer than ten people and turnover or balance sheet at or below two million euro, are exempt from it. Many smaller merchants fall inside that exemption. The condition described here remains worth meeting for them, since it decides whether some customers can buy at all, but record it as an improvement rather than as a compliance failure where the exemption applies.

## Failure signals

- Swatches or option tiles cannot be reached by tab, or can be reached but not activated by keyboard.
- The selected state is conveyed by colour or border alone, with no programmatic state.
- Selecting a variant updates price and availability with no status announcement.
- Unavailable variants are rendered visually dimmed but expose no disabled or unavailable state.
- The control has no accessible name, so it is announced as an unlabelled button or as its hex colour.

## How to verify

1. Open a product detail page for a product with at least two option dimensions.
2. Using only the keyboard, reach each option control, move between options and select one.
3. Confirm a visible focus indicator is present at every step.
4. With a screen reader running, confirm each control has a meaningful accessible name and that the selected state is announced.
5. Select a variant with a different price and confirm the price change is announced rather than only rendered.
6. Confirm unavailable options are exposed as unavailable, not merely styled as such.

## Recommended fix

Build variant pickers from native form controls with visible labels, and let the browser supply focus, state and semantics. Where a custom control is unavoidable, give it a role, an accessible name and a programmatic selected state. Announce price and availability changes through a polite status region so that the consequence of the selection reaches the user who cannot see it.

## Shopware specific

The standard storefront builds the variant configurator from a fieldset with a legend and native radio inputs with labels, which gives a sound baseline. Themes that replace these with styled elements can lose it; check the theme in use.

## Shopify specific

Horizon builds variant pickers from fieldsets, legends and native radio inputs with labels, or a labelled select; Dawn also uses native radio inputs. Older and heavily customised themes vary; check whether the picker is built from inputs and labels or from generic elements with click handlers.
