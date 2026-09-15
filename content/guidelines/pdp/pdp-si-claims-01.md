---
id: PDP-SI-CLAIMS-01
title: Product claims are supported by concrete evidence
category: pdp
dimension: semantic-integrity
severity: medium
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Checks whether key product claims are supported by concrete evidence such as specifications, certifications, or verifiable references. This includes environmental and sustainability claims, such as "eco-friendly", "sustainable" or "climate neutral".

## Why it matters

Unsupported claims reduce trustworthiness and introduce verification uncertainty, weakening both human confidence and agent-based evaluation.

## Failure signals

- Claims without explanation or proof
- Vague or generic marketing statements
- Evidence exists but is disconnected from the claim
- Claims contradict structured product data
- A generic environmental claim ("eco-friendly", "green") with no stated basis

## How to verify

1. Identify product claims on the PDP and verify whether each claim is accompanied by supporting information or evidence that can be independently evaluated.

## Recommended fix

Ensure that all significant product claims are supported by explicit, verifiable evidence presented near the claim.

Environmental claims and sustainability labels anywhere on the site are covered by `GLOBAL-TDE-GREEN-01`.
