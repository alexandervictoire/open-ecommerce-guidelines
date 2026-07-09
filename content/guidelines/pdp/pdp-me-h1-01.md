---
id: PDP-ME-H1-01
title: Single semantic H1 on PDP
category: pdp
dimension: machine-extractability
severity: medium
targets: [agent, machine]
status: published
---

## What is being checked

Checks whether the PDP contains exactly one semantic `<h1>` element that represents the primary product title.

## Why it matters

Without a single semantic product title, machines cannot reliably identify the product and agents may misinterpret the page context, reducing comparability and retrieval accuracy.

## Failure signals

- Multiple `<h1>` elements are present on the page
- No `<h1>` element exists on the PDP
- The `<h1>` contains marketing copy instead of the product name
- The product name is rendered using a non-heading element

## How to verify

1. Inspect the DOM structure of the PDP and count the number of `<h1>` elements.
2. Verify that exactly one `<h1>` is present and that it contains the product name.

## Recommended fix

Ensure that the primary product title is rendered as a single semantic `<h1>` element and that no additional `<h1>` elements are used on the PDP.
