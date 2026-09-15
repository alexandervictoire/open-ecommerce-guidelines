# Contributing

Thanks for helping build an open reference for e-commerce quality: guidelines
with a vendor-neutral core, plus explicit Shopware and Shopify notes where the
platforms actually differ. Contributions are guidelines (new or improved)
submitted as pull requests and merged by the maintainer.

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
- **Status:** publish by default (`status: published`). The collection gets
  better through revision after release, and a live guideline is one others can
  find and correct. Use `status: draft` when a guideline rests on something
  genuinely unresolved: it still goes live, marked "Draft" with a notice that it
  may change.

## Guideline template (copy-paste)

```markdown
---
id: PDP-DC-STOCK-01
title: Stock availability is stated in plain language on the PDP
category: pdp                  # plp | pdp | cart | checkout | global
dimension: decision-clarity    # see dimension list below
severity: high                 # low | medium | high | critical
targets: [human, agent]        # subset of [human, agent, machine]
status: published              # draft | published | deprecated
shopware_status: no_divergence # not_applicable | no_divergence | platform_specific
shopify_status: no_divergence  # not_applicable | no_divergence | platform_specific
# Optional, see "Legal references and audience" below:
# regulation: ["Dir 2011/83/EU Art. 6(1)(e)"]
# jurisdiction: [eu]
# audience: [b2c]
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

## Shopware specific

Only when `shopware_status: platform_specific`. What the platform does by
default, and where the real risk sits.

## Shopify specific

Only when `shopify_status: platform_specific`.
```

The **five core H2 sections** are required, in this exact order, and must be
non-empty. They stay vendor-neutral.

### Platform sections (optional)

`## Shopware specific` and `## Shopify specific` are optional and, when present,
always come **last**, in that order, after the five core sections. Each one is
coupled to its status field:

| Status | Meaning | Platform section | In the platform filter |
|---|---|---|---|
| `not_applicable` | Does not apply structurally on that platform | must be absent | hidden |
| `no_divergence` | Applies; verify/fix identical to the generic version | must be absent | shown (generic content) |
| `platform_specific` | Applies, with a platform-specific twist | **required** | shown, including the section |

`no_divergence` is the default: if a field is missing, that is what is assumed,
so you only need to set it when the answer is different.

The build enforces the coupling — a `platform_specific` status without its
section (or a section without the status) fails `npm run validate`. Run it
locally before opening a PR.

Write a platform section only when you know the platform's actual default
behavior. If you are unsure, leave the status at `no_divergence` rather than
guessing.

### Categories

- `plp` — listings: category pages, collections and search results
- `pdp` — the product detail page
- `cart` — the cart page and cart drawer
- `checkout` — checkout, from the first step to the order confirmation
- `global` — conditions that hold on every page rather than on one funnel step:
  site chrome, legal reachability, the consent layer, trust marks, market access

### Dimensions

`decision-clarity`, `system-robustness`, `semantic-integrity`,
`machine-extractability`, `trust-decision-enablement`. Propose a new dimension
only if a guideline genuinely fits none of these.

### Legal references and audience (optional)

Three optional frontmatter fields mark a guideline that rests on a legal
provision or applies to only one kind of shop:

| Field | Value | Omit when |
|---|---|---|
| `regulation` | list of double-quoted citations, e.g. `["Dir 98/6/EC Art. 3(1)", "PAngV §4 (DE)"]` | the guideline rests on testing, not on a provision |
| `jurisdiction` | `eu` and/or lowercase country codes, e.g. `[eu, de]` | the guideline is not jurisdiction-bound |
| `audience` | `[b2c]` or `[b2b]` | it applies to consumer and business shops alike (the usual case) |

Rules for citations:

- A citation is a **pointer** to the provision a reviewer should read, never a
  legal conclusion. The guideline text describes observable properties; it does
  not tell a merchant what the law requires of them. The site shows every
  citation with a not-legal-advice notice.
- List the EU instrument before a national one — this is not a German standard.
- Every citation must belong to an instrument listed in
  [`utils/regulations.json`](utils/regulations.json), which powers the "Legal
  reference" filter: the citation has to contain one of the instrument's `match`
  strings. Citing a directive, law, standard or court decision that is not
  there yet? Add an entry (or a `match` string; a court decision goes under the
  instrument it interprets) in the same pull request. `npm run validate` names
  any citation it cannot place.
- Use `audience: [b2c]` only where the guideline would be wrong or inapplicable
  in a business-facing shop, typically because it rests on consumer law. It
  marks where the guideline applies as written, not where the idea stops being
  sensible.

**Accessibility guidelines** are filed under the dimension that matches what
they check, not under a separate one. Because a reader arriving from that
dimension has no other signal, every accessibility guideline must say in its own
text that it is an accessibility requirement, name the standard, and name the
specific success criteria — and carry them in `regulation` as well.

## ID scheme — picking the next free number

Format: `<CATEGORY>-<DIMENSION-ABBREV>-<TOPIC>-<NN>`, uppercase.

- `CATEGORY`: `PLP`, `PDP`, `CART`, `CHECKOUT`, `GLOBAL`.
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
- **Vendor-neutral in the core** — the five core sections describe the principle
  without naming products. The two platform sections are the deliberate
  exception: there you *should* name the platform, its default storefront
  behavior, plugin types, and concrete risk areas. Marketing language is
  unwelcome everywhere.
- **Non-duplicative** — not already covered by an existing guideline.
- **Complete** — includes concrete failure signals and verification steps.
- **Reproducible** — two competent auditors following the same steps on the
  same shop record the same verdict. Needing admin access, a test order, a
  foreign IP or a screen reader is fine; a step whose outcome depends on the
  auditor's judgement rather than on the shop is not.
- **Score-free** — never include any score/points/weighting field. Scoring is
  the maintainer's private tooling and must not appear in this public repo.

## Licensing

By contributing to `content/`, you agree to license your contribution under
**CC BY-SA 4.0**. Site code and scripts are MIT. See [LICENSE](LICENSE).
