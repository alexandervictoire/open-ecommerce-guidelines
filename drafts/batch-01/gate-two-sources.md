# Gate two — sources for the platform-note changes

Working log from verifying every platform note in batch 01 against current
documentation and, where the claim concerns a storefront or theme default, the
source code itself (shopware/shopware trunk, Shopify/horizon and Shopify/dawn main,
checked 2026-09-14). Verdicts: CONFIRMED, CORRECT(ED), WRONG, OUTDATED, REFINE.
Notes without a verifiable platform fact were softened to a check or dropped
(status no_divergence).

Checked against: shopware/shopware trunk, latest release v6.7.14.0 (2026-09-09).

## Shopware

- CHECKOUT-DC-BUTTON-01 — CONFIRMED + STRENGTHEN. snippet checkout.confirmSubmit:
  de "Zahlungspflichtig bestellen" (compliant), en "Submit order" (does NOT state
  payment obligation). Source: src/Storefront/Resources/snippet/storefront.{de,en}.json
- PLP-DC-PRICE-01 — CORRECT. Tile tax/shipping notice rendered ONLY when
  config core.listing.allowBuyInListing is on (block component_product_box_price_tax_info,
  code comment: "If a product can be added to the shipping directly from the listing,
  we need to display information about taxes and shipping."). Note claimed disclosures
  travel with tile price by default. Source: component/product/card/price-unit.html.twig
- PDP-DC-REF-01 — CONFIRMED field + STRENGTHEN. regulationPrice exists since 6.4.10.0
  (changelog 2022-02-28-price-indication-regulation-guideline). Listing tile AND PDP buy
  widget compute the "(x% gespart / saved)" from listPrice.percentage and show
  regulationPrice separately as "vorher / previously %price%". List price visible label
  absent; only visually-hidden "Regulärer Preis:" on tile. => default rendering produces
  C-330/23 pattern whenever list price > regulation price.
  Sources: card/price-unit.html.twig, buy-widget/buy-widget-price.html.twig
- PDP-TDE-REVAUTH-01 — WRONG. ProductReviewSaveRoute: needs core.listing.showReview,
  logged-in customer, one review per customer per product; NO purchase/order check.
  New reviews saved status=false (moderation). "Verified buyer" marker
  (reviewVerifcation == 1 in review-item.html.twig) is never set by core.
- PLP-DC-UNIT-01 — CONFIRMED. tile renders referencePrice.purchaseUnit, unitName,
  referenceUnit (price-unit.html.twig).
- CHECKOUT-DC-COST-01 — WRONG (payment half). docs.shopware.com Settings > Payment methods:
  fields = name, technical name, position, description, logo, active, allow change after
  order, availability rule. No surcharge field. Payment surcharges only via extensions.
  Shipping costs do sit on shipping methods (correct).
- CHECKOUT-SR-PAYFAIL-01 — WRONG + CORE-TEXT ISSUE. Order is created before payment
  (CheckoutController: paymentProcessor->pay(orderId, ..., finishUrl, errorUrl=
  frontend.account.edit-order.page); PaymentException -> finish page paymentFailed=true).
  Cart is converted to the order and never restored; retry = change payment method on
  "edit order" page, subject to isPaymentChangeable (transaction state) and payment
  method setting "Allow change of payment method after order completion".
  Core text demands "intact cart" -> every default Shopware shop would fail. Core must
  accept "order kept with its data and payable with another method".
- CHECKOUT-DC-GUEST-01 — WRONG. No "enable guest checkout" setting. loginRegistration.xml
  has createCustomerAccountDefault ("Create customer account by default"; help: if
  inactive, no account is created, user purchases as guest by default). register.html.twig
  pre-checks account creation when it is on. Guest purchase always offered by standard
  storefront. Check: that setting off, or guest path equally prominent.
- CART-SI-MUTATE-01 — WRONG. PromotionDiscountEntity types: percentage, absolute,
  fixed_unit, fixed; scopes cart, delivery, set, setgroup. No type adds a product.
  Automatic promotions add a discount line, not an item. Auto-added gift products = extensions.
- GLOBAL-DC-CAROUSEL-01 — CONFIRMED + STRENGTHEN. cms-element-image-slider.html.twig:
  autoplay: sliderConfig.autoSlide.value, autoplayButtonOutput: false (no pause/play
  control rendered), ariaLive off when autoSlide on; no pause option configured.
  => auto-sliding default slider has no pause control by construction.
- CHECKOUT-SR-BACK-01 — CORRECT "silently". Since 6.4.8.0 (changelog NEXT-10628)
  BlockedShippingMethodSwitcher switches a blocked shipping method and raises
  ShippingMethodChangedError (LEVEL_NOTICE, does not block order), message key
  checkout.shipping-method-changed (core messages snippet). Silent only if theme drops
  cart notices. Separate routes: cart / register / confirm / finish (confirmed routes).
- CHECKOUT-ME-AUTOFILL-01 — CONFIRMED (partial). Storefront templates contain tokens
  given-name, family-name, postal-code, address-level2, email; street field token not
  found under "street-address" (may use another token) -> keep as "check".
- PLP-DC-FROM-01 — CONFIRMED + precise. variantListingConfig: displayParent, mainVariantId,
  configuratorGroupConfig. Tile label listing.cheapestPriceLabel = "Variants from" when
  cheapest variant price differs (price-unit.html.twig).
- CART-DC-TOTALS-01 — CONFIRMED. summary-tax.html.twig loops summary.price.calculatedTaxes,
  one line per rate.
- PLP-SR-URL-01 — CONFIRMED. listing.plugin.js window.history.pushState with filter params
  incl. p (page) and order (sort).
- CART-SR-AVAIL-01 — CONFIRMED (render). cart page index.html.twig includes alert/flashbags.
- PDP-SR-VARIANT-01 — CONFIRMED. configurator.html.twig: fieldset + legend + input
  type=radio + label.
- GLOBAL-TDE-LEGAL-01 — CONFIRMED (refine). basicInformation.xml assigns per sales channel:
  tosPage, revocationPage, shippingPaymentInfoPage, privacyPage, imprintPage, contactPage,
  revocationRequestPage (!), newsletterPage...

## OUT OF SCOPE BUT IMPORTANT
- EU withdrawal function (Art. 11a CRD, inserted by Dir (EU) 2023/2673), applies since
  19 June 2026 to any distance contract concluded via an online interface: labelled
  "withdraw from contract here" or unambiguous equivalent, continuously available during
  withdrawal period, prominently displayed. NOT covered anywhere in batch 01 (LEGAL-01 only
  has DE §312k cancellation for continuing obligations). Shopware ships revocationRequestPage;
  Shopify help "EU right of withdrawal compliance" points to return/cancellation rules.
  Sources: lexology/hlc/williamfry articles; help.shopify.com/en/manual/compliance/legal/eu-right-of-withdrawal

## Shopify
- GLOBAL-TDE-LEGAL-01 — OUTDATED. Settings > Policies: Return, Privacy, Terms of service,
  Shipping, Legal notice, Subscription policy. Policies linked automatically in checkout
  footer; storefront footer only if merchant adds them to a menu.
  (help.shopify.com/en/manual/checkout-settings/refund-privacy-tos)
- CHECKOUT-DC-BUTTON-01 — WRONG. Default checkout text editable: Settings > Checkout >
  Edit checkout content, no plan restriction stated. Market-specific checkout/accounts
  customization = Advanced or Plus only. (checkout-language, checkout-editor help pages)
- CHECKOUT-SR-BACK-01 — OUTDATED premise. Default layout is one-page checkout ("By default,
  the checkout layout on your store is set to be a one-page checkout."); three-page
  selectable. No steps in default layout.
- CHECKOUT-DC-SUMMARY-01 — CONFIRMED + precise. Mobile default: "both the order summary and
  discount code field are hidden in a collapsed section". "Always show discount code field":
  one-page -> discount field above COLLAPSED summary; three-page -> top summary expanded.
  => in default one-page layout no setting expands the summary.
  (checkout-style help page)
- CHECKOUT-DC-GUEST-01 — OUTDATED model. Option "Require customers to sign in to their account
  before checkout" (Customer contact method section, Settings > Checkout). When active: email-
  only checkout, accelerated checkouts hidden in online store cart. Default state not quoted.
  (help.shopify.com/en/manual/checkout-settings/checkout-form-options)
- GLOBAL-SR-GEO-01 — IMPRECISE. Automatic redirection: Online Store > Preferences. EU exemption
  only for EU visitors on localized experience with EU ccTLD ("customers from the EU who access a
  localized experience with an EU country code top-level domain name (ccTLD) aren't automatically
  redirected"). Subfolder/subdomain setups not exempt per wording. Geolocation app (consent-based
  recommendations) shut down 24 Mar 2025 (changelog "Geolocation app removal").
- CART-DC-CODE-01 — REFINE. Ajax Cart API /cart/update.js {discount: 'code'} applies codes to the
  cart (shopify.dev ajax cart reference). shopify.dev themes discounts page still says manual codes
  only at checkout (outdated/inconsistent). Horizon cart-summary has discount code field
  (content.discount_code, actions.apply, actions.remove_discount, content.discount_code_error,
  assets/cart-discount.js). Dawn main-cart-footer: no code field.
- PLP-DC-FROM-01 — SPLIT. Horizon snippets/price.liquid: price = selected_or_first_available_variant
  .price, no "from"; min–max range only with volume pricing. Dawn snippets/price.liquid: "From"
  (products.product.price.from_price_html) when product.price_varies.
- CART-DC-TOTALS-01 — CONFIRMED for Dawn: estimated total + "taxes/shipping at checkout" texts
  (sections.cart.taxes_at_checkout_shipping_at_checkout_without_policy etc.). Horizon: subtotal,
  cart-level discounts, estimated total (tax/shipping text not verified).
- GLOBAL-DC-CAROUSEL-01 — REFINE. Dawn slideshow: pause button (slideshow__autoplay, aria-label
  sections.slideshow.pause_slideshow) whenever auto_rotate. Horizon: autoplay option is part of
  slideshow-controls (param "Whether the controls will display an autoplay option"); controls have
  styles incl. 'none' -> check control visible with chosen style.
- PDP-SR-VARIANT-01 — CONFIRMED. Horizon variant-main-picker: fieldset/legend/label/input radio,
  dropdown style with <label>. Dawn product-variant-options: radio inputs.
- PLP-DC-UNIT-01 — CONFIRMED (theme). Dawn unit-price.liquid renders variant.unit_price +
  unit_price_measurement; Horizon price.liquid renders unit price only if show_unit_price passed.
- PDP-DC-REF-01 (Shopify) — CONFIRMED. "The product details in your Shopify admin have only two
  fields for product price: the price, and compare-at price." Shopify recommends a theme statement
  with the lowest prior price. (help.shopify.com/en/manual/compliance/legal/pricing-indication-directive)
- PLP-DC-UNIT-01 (Shopify) — CONFIRMED+refine: auto-displayed on product, collection, cart, checkout
  pages of any Online Store 2.0 theme; vintage themes need code; one unit price per product/variant.
- PLP-DC-PRICE-01 (Shopify) — CONFIRMED: tax inclusion per market (Markets > market > taxes and
  duties; EU default inclusive). Quick add: Dawn card setting, Horizon quick-add modal.
- PDP-DC-SUBSCR-01 (Shopware) — CONFIRMED+precise: from 6.5.4.0, commercial feature from Beyond
  plan, Shopware Commercial extension; intervals + minimum term; PDP plan selection next to cart,
  radio buttons. (docs.shopware.com/en/shopware-6-en/settings/shop/subscriptions)
- CHECKOUT-TDE-CONFIRM-01 (Shopware) — HALF WRONG: templates not assigned to sales channels
  (headers/footers are); sending via Flow Builder; translatable per language; one attachment per
  language. (docs.shopware.com/en/shopware-6-en/settings/email-templates)
- PDP-TDE-REVAUTH-01 (Shopify) — app-provided confirmed (no first-party storefront reviews app found).
- CART-SR-AVAIL-01 (Shopify) — not confirmable from docs for online store cart -> soften to check.
