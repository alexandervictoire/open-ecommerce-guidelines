---
id: PDP-SR-DEF-01
title: Default PDP State Is Valid
category: pdp
dimension: system-robustness
severity: critical
targets: [human, agent, machine]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether the PDP loads in a valid, representative, and immediately actionable default state without requiring user interaction.
The initial state must reflect a real, purchasable configuration and must not mislead or block the user before they engage with the page.

## Why it matters

Users are forced to resolve uncertainty before they can even start evaluating the product. This creates friction at the very beginning of the decision process and leads to unnecessary drop-offs.

If the default state is misleading or non-purchasable, users may assume the product is unavailable or not relevant to them and leave prematurely.

For machines and agents, an undefined or invalid default state prevents reliable interpretation and execution, as there is no clear baseline offer.

## Failure signals

- The page loads without a selected variant and does not clearly explain why.
- The default state shows a configuration that is not purchasable, such as an out-of-stock variant.
- Price, availability, or delivery information are missing or only appear after interaction.
- The initial state creates confusion about what exactly is being offered.
- The user must interact with the page before being able to understand or purchase the product.

## How to verify

1. Load the PDP in a clean session and observe the initial state without interacting.
2. Check whether a valid variant is selected or whether the absence of selection is clearly explained.
3. Confirm that price, availability, and delivery information are visible and consistent.
4. Assess whether a user can understand what is being offered and proceed toward purchase immediately.

## Recommended fix

Ensure that the PDP always loads with a clearly defined and purchasable state. If variants exist, either preselect a valid default or provide an explicit and immediately understandable selection requirement.

All core decision signals such as price, availability, and delivery must be visible and correct without requiring interaction. The initial state should represent a realistic and relevant version of the product.
