---
id: CART-SR-EDIT-01
title: Cart line items can be changed and removed in place
category: cart
dimension: system-robustness
severity: high
targets: [human, agent]
status: published
shopware_status: no_divergence
shopify_status: no_divergence
---

## What is being checked

Whether quantity can be changed and a line removed from within the cart, with the rest of the cart state surviving the change, and whether the resulting totals update to match.

## Why it matters

The cart is where the order is finalised, which means it is where corrections happen. If correcting requires leaving the cart, returning to a product page and starting again, the user has to rebuild work they already did, and a proportion of them will not.

Existing cart guidelines cover whether the quantity value remains readable and whether it survives navigation into checkout. Neither covers whether it can be changed at all, which is the more basic property.

For agents this is the difference between a cart that can be corrected and one that can only be abandoned and rebuilt.

## Failure signals

- Quantity is displayed but not editable, so changing it requires returning to the product page.
- Removing a line clears unrelated state such as an applied discount code or a selected delivery method.
- Changing a quantity resets the page to the top, losing the user's position in a long cart.
- The quantity control accepts a value above available stock and fails only at checkout. `CART-SR-AVAIL-01` covers stock that runs out while the cart sits; this signal is about a quantity that was never available at the moment it was entered.
- Totals do not update after a change until the page is reloaded manually.

## How to verify

1. Build a cart with three lines, an applied discount code and, if the cart supports it, a selected delivery method.
2. Increase the quantity of the second line and confirm totals update without a full reload losing position.
3. Remove the third line and confirm the discount code and delivery selection survive.
4. Enter a quantity above available stock and confirm it is rejected or corrected at the cart, with an explanation, rather than accepted.
5. Confirm every change is reflected in the breakdown required by `CART-DC-TOTALS-01`, not only in the grand total.

## Recommended fix

Make quantity and removal first-class cart operations on every cart surface, drawer included, and re-render totals from the server response rather than adjusting them client-side. Validate quantity against purchasable stock at the point of change and explain any correction.
