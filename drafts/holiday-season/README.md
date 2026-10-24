# Holiday season batch

18 guidelines for preparing a shop for Black Friday, Cyber Week and Christmas.
Staged here like batch 01. To publish, move each file into
`content/guidelines/<category>/`, commit, then run `npm run dates` and commit
`guideline-dates.json`.

All files pass `npm run validate` except for the missing date entries, which
`npm run dates` creates after the commit. Every cross-reference points to a
published guideline or to another file in this batch, so the batch should go
live together.

## Selection rule

Two internal checklists (250 operational Black Friday items, 204 homepage and
funnel ideas) were used as inspiration only. Nothing was copied. An idea became
a guideline only if it:

1. helps the shopper decide, instead of pushing them;
2. can be checked on the live shop by following steps;
3. is not already covered by a published guideline.

Left out on purpose:

- Pressure tactics without a real basis: visitor counters, purchase pop-ups,
  cart reservation timers, escalating "last chance" messages, exit-intent
  offers. Where urgency is real, `GLOBAL-SI-URGENCY-01` covers it.
- Decoration: parallax, motion graphics, hover animations.
- Operations that are not visible on the shop: load tests, staffing, email
  calendars, ad budgets, warehouse capacity, fraud settings. They matter, but
  they do not fit a guideline that is verified on the storefront.
- Pricing strategy: discount depth, doorbusters, dynamic pricing.
- Already covered: reference prices (`PDP-DC-REF-01`), guest checkout
  (`CHECKOUT-DC-GUEST-01`), autofill (`CHECKOUT-ME-AUTOFILL-01`), cost breakdown
  (`CART-DC-TOTALS-01`), delivery time on the PDP (`PDP-DC-DELIVERY-01`), return
  conditions (`PDP-DC-RETURNS-01`), stock truth (`PDP-SR-STOCK-01`), pausing
  carousels (`GLOBAL-DC-CAROUSEL-01`).

## The batch

| ID | Title | Severity |
|---|---|---|
| GLOBAL-DC-CUTOFF-01 | The shop says the last day to order for delivery before the holidays | high |
| GLOBAL-DC-SALE-01 | A sale says what is reduced, by how much, and until when | high |
| GLOBAL-SI-URGENCY-01 | Countdowns and "almost gone" messages are true | critical |
| GLOBAL-SR-BANNER-01 | Sale banners and timers do not get in the way | high |
| GLOBAL-SR-WEIGHT-01 | Sale additions do not make the shop slower | high |
| GLOBAL-DC-TRACK-01 | Customers can track an order from every page, without logging in | medium |
| GLOBAL-TDE-SUPPORT-01 | The shop says when customer service is reachable over the holidays | medium |
| GLOBAL-DC-HOLRET-01 | Holiday return terms give exact dates and explain how gifts can be returned | medium |
| PLP-DC-GIFT-01 | A gift guide can be narrowed by who the gift is for and by price | medium |
| PLP-DC-SALE-01 | All reduced products can be found in one place | medium |
| PDP-DC-GIFTCARD-01 | A gift card says how and when it arrives, how long it is valid and where it can be used | medium |
| PDP-DC-BUNDLE-01 | A bundle shows what is inside and what it saves compared to buying the items alone | medium |
| PDP-DC-SOLDOUT-01 | A sold-out product offers a next step | medium |
| CART-DC-GIFT-01 | Gift options are visible before checkout and can be chosen in the cart | medium |
| CART-DC-FREESHIP-01 | The cart says how much is missing for free shipping | medium |
| CHECKOUT-DC-ARRIVE-01 | Each delivery option shows the expected arrival date | high |
| CHECKOUT-DC-GIFT-01 | A gift order makes the recipient's address clearly separate from the buyer's | medium |
| CHECKOUT-DC-EXPRESS-01 | Express payment options appear before the long forms | medium |

## Evidence used in the texts

- Baymard Institute, reasons for checkout abandonment (extra costs 40 %, slow
  delivery 20 %, account creation 18 %): https://baymard.com/lists/cart-abandonment-rate
- Baymard Institute, gifting flow research (80 % no gift options on PDP, 42 % none
  in cart, gift address mistakes): https://baymard.com/research-articles/gifting-flow
- Salesforce, Cyber Week 2025 (70 % of orders on mobile, 27 % paid with mobile
  wallets): https://investor.salesforce.com/news/news-details/2025/Salesforce-Data-AI-and-Agents-Propel-Cyber-Week-to-Record-336-6B-in-Global-Spend/default.aspx
- Google / 55 / Deloitte, "Milliseconds make millions" (0.1 s faster mobile:
  +8.4 % retail conversion, +9.2 % spend): https://web.dev/case-studies/milliseconds-make-millions
- European Commission and national authorities, online shop sweep of 31 Jan 2023
  (148 of 399 shops with dark patterns, 42 with fake countdowns):
  https://www.cde.ual.es/en/european-commission-detects-manipulation-practices-in-148-of-the-399-online-stores-examined
- Unfair Commercial Practices Directive, Annex I points 5 and 7:
  https://www.legislation.gov.uk/eudr/2005/29/annex/I/adopted
- Narvar holiday survey 2025 (56 % more likely to buy with accurate delivery
  dates): https://corp.narvar.com/press/new-narvar-holiday-data
- HDE Christmas forecast 2025 (gift vouchers the most popular present, online
  €22.2 bn in Nov/Dec): https://einzelhandel.de/images/presse/weihnachten/2025/PM_Weihnachtsprognose.pdf

## Open points for the maintainer

- Platform status is `no_divergence` everywhere. Gift options, express checkout
  and back-in-stock notices behave differently on Shopify and Shopware, so these
  are candidates for platform sections once the defaults are checked.
- A seasonal grouping ("Holiday readiness") would need a new optional field or
  a curated page; the schema has none yet.
