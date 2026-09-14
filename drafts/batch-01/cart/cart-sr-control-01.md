---
id: CART-SR-CONTROL-01
title: Cart controls work with the keyboard alone
category: cart
dimension: system-robustness
severity: high
targets: [human]
status: draft
platforms: [shopware, shopify]
regulation: ["Dir (EU) 2019/882", "EN 301 549 / WCAG 2.1 AA: 2.1.1, 2.4.7, 4.1.2, 4.1.3"]
jurisdiction: [eu]
---

## What is being checked

Whether quantity controls, removal controls, the discount code field and the control that proceeds to checkout can each be reached and operated by keyboard alone, with a visible focus indicator and an accessible name, and whether the resulting change to the totals is announced.

## Why it matters

The cart is a dense cluster of small controls, frequently icon-only, frequently custom-built, and it sits at the narrowest point of the funnel. A user who cannot operate a removal control cannot correct their order, and a user who cannot perceive that the total changed after an adjustment cannot confirm that what they did worked.

Icon-only controls are the specific recurring failure: a bin glyph with no accessible name is announced as an unlabelled button, and in a cart with four lines there are four of them, indistinguishable from each other.

**Scope note:** the accessibility requirement binds e-commerce services in the EU, but microenterprises providing services, meaning fewer than ten people and turnover or balance sheet at or below two million euro, are exempt from it. Many smaller merchants fall inside that exemption. The condition described here remains worth meeting for them, since it decides whether some customers can buy at all, but record it as an improvement rather than as a compliance failure where the exemption applies.

## Failure signals

- Quantity steppers are built from non-interactive elements and cannot be reached by tab.
- Removal controls are icon-only with no accessible name, or with a name that does not identify which line it removes.
- Focus is lost or reset to the top of the document after a line is removed.
- Totals update silently with no status announcement after a quantity change.
- Focus indicators are suppressed on cart controls.

## How to verify

1. Build a cart with three lines and an applied discount code.
2. Using the keyboard only, move through the cart and confirm every interactive control can be reached in a sensible order with a visible focus indicator.
3. Confirm each control has an accessible name that identifies both its action and its line.
4. Change a quantity by keyboard and confirm the totals change is announced.
5. Remove a line by keyboard and confirm focus lands somewhere sensible rather than being lost.
6. Confirm the checkout control is reachable by keyboard from the end of the cart.

**Shopware:** the standard cart uses real form controls and buttons. Custom quantity steppers built from styled elements are the usual regression, along with suppressed focus styles in the theme's reset.

**Shopify:** quantity inputs are native in most themes, but removal is often an icon anchor and drawer implementations frequently move focus unpredictably when contents change. Test the drawer specifically.

## Recommended fix

Build cart controls from native buttons and inputs, give every icon-only control a name that identifies its line, preserve focus across cart updates by moving it to a stable element rather than letting it fall to the document, and announce totals changes through a polite status region.
