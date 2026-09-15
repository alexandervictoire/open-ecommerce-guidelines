---
id: GLOBAL-DC-CAROUSEL-01
title: Automatically moving content can be paused
category: global
dimension: decision-clarity
severity: medium
targets: [human]
status: published
shopware_status: platform_specific
shopify_status: platform_specific
regulation: ["Dir (EU) 2019/882", "EN 301 549 / WCAG 2.1 AA: 2.2.2, 2.1.1, 4.1.2"]
jurisdiction: [eu]
---

## What is being checked

Whether any content that starts moving on its own, runs for more than five seconds and sits alongside other content offers a way to pause or stop it, and whether its controls can be reached and used with the keyboard without the rotation stealing focus.

The five second threshold is the one the accessibility standard uses. A carousel that advances once and stops is out of scope; one that keeps cycling is in scope.

## Why it matters

The auto-advancing hero carousel is the most common single accessibility defect on an e-commerce homepage, and its effects are not limited to users with disabilities. It moves content away from anyone reading slowly, in a second language, or on a slow connection where the first slide arrives late. For users with attention difficulties or motion sensitivity it makes the page genuinely hard to use.

The keyboard dimension compounds it. A carousel that advances while a keyboard user is inside it moves the focused element out from under them, which in the worst implementations traps focus or sends it to the document root.

The commercial case runs the same way. A carousel that rotates away from a slide before it has been read is not communicating that slide.

**Scope note:** the accessibility requirement binds e-commerce services in the EU, but microenterprises providing services, meaning fewer than ten people and turnover or balance sheet at or below two million euro, are exempt from it. Many smaller merchants fall inside that exemption. The condition described here remains worth meeting for them, since it decides whether some customers can buy at all, but record it as an improvement rather than as a compliance failure where the exemption applies.

## Failure signals

- An auto-advancing carousel with no pause control.
- Pause is available only by hovering, which is unavailable to keyboard and touch users.
- Rotation continues while focus is inside the carousel.
- Slide controls are not reachable by keyboard, or have no accessible names.
- Slides outside the visible one remain focusable, so keyboard users tab into content they cannot see.
- Auto-playing video or animated promotional content with no stop control.

## How to verify

1. Open any page with automatically moving content.
2. Confirm a visible pause or stop control exists and works.
3. Confirm the control is reachable and operable by keyboard.
4. Tab into the carousel and confirm rotation stops or that focus is not moved by it.
5. Continue tabbing and confirm focus does not enter non-visible slides.
6. Confirm controls have accessible names that describe their action.

## Recommended fix

Prefer not to auto-advance at all; the evidence that carousels earn their position is thin, and disabling autoplay resolves the whole class of problem in one setting. Where autoplay is required, provide a persistent, keyboard-reachable pause control, stop rotation on focus and on hover, and keep non-visible slides out of the focus order.

## Shopware specific

The standard image slider supports automatic sliding but renders no pause control when it is enabled. An auto-sliding slider built from the standard element therefore fails this guideline by construction; switch automatic sliding off in the layout.

## Shopify specific

Dawn's slideshow renders a pause button whenever auto-rotate is on. In Horizon the autoplay control is part of the slideshow controls, whose display style can be changed; check that it stays visible with the chosen style. Disabling autoplay avoids the question.
