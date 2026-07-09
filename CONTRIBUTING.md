# Contributing

Thanks for helping build an open, vendor-neutral reference for e-commerce
quality. Contributions are guidelines (new or improved) submitted as pull
requests and merged by the maintainer.

## How to propose a change

1. **Fork** the repository.
2. Create a **branch** (`add-pdp-dc-stock-01`, `fix-cart-qty-01-wording`).
3. Add or edit Markdown under `content/guidelines/<category>/`.
4. Open a **pull request**. Every PR gets a **Vercel preview deployment** so you
   (and the maintainer) can review the rendered page before merge.

- **New guideline:** add a new file with a fresh, unique ID (see below).
- **Change to an existing guideline:** edit its file. Do **not** change a
  published guideline's `id`. If your change alters what the guideline *means*,
  deprecate the old one (`status: deprecated`) and add a new guideline with a new
  ID instead.

## Guideline template (copy-paste)

```markdown
---
id: PDP-DC-STOCK-01
title: Stock availability is stated in plain language on the PDP
category: pdp                  # pdp | cart | checkout
dimension: decision-clarity    # see dimension list below
severity: high                 # low | medium | high | critical
targets: [human, agent]        # subset of [human, agent, machine]
status: published              # draft | published | deprecated
---

## What is being checked

One or two sentences describing the observable condition being checked.

## Why it matters

The operational impact — for users and for agents/machines.

## Failure signals

- Concrete, observable signal that the guideline is being violated
- Another failure signal

## How to verify

1. A reproducible step
2. The next step
3. What to confirm

## Recommended fix

The default, vendor-neutral fix.
```

All five H2 sections are required, in this exact order, and must be non-empty.

### Dimensions

`decision-clarity`, `system-robustness`, `semantic-integrity`,
`machine-extractability`, `trust-decision-enablement`. Propose a new dimension
only if a guideline genuinely fits none of these.

## ID scheme — picking the next free number

Format: `<CATEGORY>-<DIMENSION-ABBREV>-<TOPIC>-<NN>`, uppercase.

- `CATEGORY`: `PDP`, `CART`, `CHECKOUT`.
- `DIMENSION-ABBREV`: `DC` (decision-clarity), `SR` (system-robustness),
  `SI` (semantic-integrity), `ME` (machine-extractability),
  `TDE` (trust-decision-enablement). A few older IDs use legacy variants
  (`C`, `MERCH`, `MI`, `TD`, `TE`); use the canonical codes for new guidelines.
- `TOPIC`: short uppercase slug for the subject (`PRICE`, `QTY`, `H1`).
- `NN`: two-digit sequence for that topic, starting at `01`.

To pick the next number, search existing files for the same
`CATEGORY-ABBREV-TOPIC` prefix and increment. The filename is the lowercased id
(`pdp-dc-price-01.md`). Once published, the id is immutable.

## Acceptance criteria

A guideline is accepted when it is:

- **Testable** — verifiable by following the "How to verify" steps.
- **Vendor-neutral** — no product names, no marketing language.
- **Non-duplicative** — not already covered by an existing guideline.
- **Complete** — includes concrete failure signals and verification steps.
- **Score-free** — never include any score/points/weighting field. Scoring is
  the maintainer's private tooling and must not appear in this public repo.

## Licensing

By contributing to `content/`, you agree to license your contribution under
**CC BY-SA 4.0**. Site code and scripts are MIT. See [LICENSE](LICENSE).
