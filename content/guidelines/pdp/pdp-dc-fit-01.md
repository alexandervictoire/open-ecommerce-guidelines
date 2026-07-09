---
id: PDP-DC-FIT-01
title: Product suitability should be clearly self-evident on the PDP
category: pdp
dimension: decision-clarity
severity: critical
targets: [human, agent, machine]
status: published
---

## What is being checked

Whether the PDP enables users to confidently determine if the product is suitable for their specific use case, without needing external research or guesswork.
The page must provide enough context, guidance, and constraints so that the user can validate fit, compatibility, or appropriateness directly within the decision flow.

## Why it matters

Users hesitate because they cannot confidently determine whether the product will work for them. This increases perceived risk and leads to delayed or abandoned decisions.
Even if interest is high, uncertainty around fit or compatibility often prevents conversion entirely.
For machines and agents, missing fit logic makes it impossible to reliably match products to user needs or constraints.

## Failure signals

- The PDP describes the product but does not clarify who it is for or not for.
- Users must guess whether the product fits their situation, size, device, or context.
- Important compatibility or usage constraints are missing, hidden, or only revealed after purchase.
- Variant differences exist but are not explained in terms of real-world use.
- Users are forced to leave the PDP to find basic suitability information.

## How to verify

1. Review the PDP from the perspective of a first-time user with a specific use case.
2. Check whether the page clearly answers the question: “Is this the right product for me?”
3. Look for missing constraints, unclear applicability, or gaps in explanation.
4. Confirm whether a user can make a confident decision without leaving the page.

## Recommended fix

Provide clear, decision-relevant guidance that allows users to validate suitability directly on the PDP.

This can include structured size guidance, compatibility information, usage scenarios, and explicit clarification of who the product is intended for and who it is not suitable for.

Where multiple variants exist, differences should be explained in terms of real-world impact, not just technical attributes.
