# Add-to-Cart & PayMongo Implementation

## Overview

Implements cart state management and PayMongo payment API routes on the `main` branch (App Router), ported from `Feature/add-to-cart`.

---

## New Files

### Cart State

| File | Purpose |
|---|---|
| `src/models/Cart.ts` | `ICartItem` and `ICartState` interfaces |
| `src/reducers/cartReducer.ts` | Reducer handling `ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART` |
| `src/context/CartContext.tsx` | React context wrapping the reducer; persists cart to `localStorage` |

### Components

| File | Purpose |
|---|---|
| `src/components/CartIcon.tsx` | Header badge showing item count; navigates to `/cart` |

### Pages

| File | Purpose |
|---|---|
| `src/app/cart/page.tsx` | Cart page — item list with quantity controls, order summary, subtotal |

### API Routes

| File | Purpose |
|---|---|
| `src/app/api/products/route.ts` | `GET /api/products` — returns all products or a single product by `shoe_id` (used for real-time stock checks) |
| `src/app/api/payment-intent/route.ts` | `POST /api/payment-intent` — creates a PayMongo payment intent; accepts `{ amount }` in centavos |
| `src/app/api/payment-method/route.ts` | `POST /api/payment-method` — creates a PayMongo payment method from card details |
| `src/app/api/attach-payment-intent/route.ts` | `POST /api/attach-payment-intent` — attaches a payment method to an intent; handles 3DS redirect |

---

## Modified Files

| File | Change |
|---|---|
| `src/app/layout.tsx` | Wraps the app in `<CartProvider>` |
| `src/components/Header.tsx` | Adds `<CartIcon />` next to the search bar |
| `src/components/ProductCard.tsx` | Adds real-time stock check on add, `inCart` guard (one item per product), and sold-out state |
| `src/models/Product.ts` | Added optional `image_url` field to `IShoe` |
| `tsconfig.json` | Added `@public/*` path alias for `./public/*` |

---

## Cart Behaviour

- Cart state lives in React context, backed by `localStorage` for persistence across page refreshes.
- **Add to cart** fetches the product live from `/api/products` before dispatching to verify stock. If the item is unavailable the card shows "Sold out". If the item is already in the cart the button shows "In cart" and is disabled.
- Quantity can be adjusted (+/-) from the cart page; setting quantity to 0 removes the item.

## PayMongo Flow

All payment logic runs server-side; `PAYMONGO_SECRET` is never exposed to the client.

1. `POST /api/payment-intent` — creates an intent for the cart subtotal (in centavos).
2. `POST /api/payment-method` — creates a payment method from card details.
3. `POST /api/attach-payment-intent` — attaches the method to the intent. If PayMongo returns a 3DS `next_action.redirect.url`, the client is redirected there.

### Required Environment Variables

```
PAYMONGO_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

---

## Remaining Work

- [ ] Collect real card details from the user (current form is a placeholder)
- [ ] Handle post-3DS redirect and confirm payment status
- [ ] Reserve / mark stock as sold on successful payment
- [ ] Order persistence (database or sheet update)
