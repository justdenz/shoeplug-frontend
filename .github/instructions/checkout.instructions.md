---
applyTo: "src/**"
---

# Checkout Feature Implementation Guide

## Codebase Context

This is a **Next.js 14** (Pages Router) shoe catalogue app called **ShoePlug**. The stack is:

- **Framework**: Next.js 14 with TypeScript (Pages Router — `src/pages/`)
- **Styling**: Tailwind CSS + React Bootstrap + MUI icons
- **Data**: Products fetched server-side via Google Sheets API (`src/lib/googleapi.ts`)
- **Icons**: `lucide-react` and `@mui/icons-material`

### Key Existing Files

| File                                  | Purpose                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/models/Product.ts`               | `IShoe` interface: `shoe_id`, `model`, `brand`, `size`, `price`, `condition`, `status`, `image_url` |
| `src/models/resource.ts`              | Shared constants: `PAGE_SIZE`, `conditions`, social URLs                                            |
| `src/components/ProductCard.tsx`      | Renders a single shoe card — **needs an "Add to Cart" button**                                      |
| `src/components/Header.tsx`           | Top navigation bar — **needs a cart icon with item count badge**                                    |
| `src/components/ProductContainer.tsx` | Grid of `ProductCard` components                                                                    |
| `src/pages/_app.tsx`                  | App wrapper with `Header` + `Footer` — **needs CartProvider wrapping**                              |
| `src/pages/index.tsx`                 | Home page that renders `ProductContainer`                                                           |

---

## Feature Goal

Implement a **cart + checkout flow** using `useReducer` + React Context so any component in the tree can read/dispatch cart state without prop drilling.

---

## Files to Create

### 1. `src/models/Cart.ts` — Cart types

```ts
import { IShoe } from "./Product";

export interface ICartItem {
  product: IShoe;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}
```

### 2. `src/reducers/cartReducer.ts` — Reducer + action types

Define the following action types:

| Action             | Payload                                 | Behaviour                                                                                                                                       |
| ------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADD_TO_CART`      | `IShoe`                                 | If the shoe (matched by `shoe_id`) is already in the cart, increment its quantity by 1. Otherwise, append a new `ICartItem` with `quantity: 1`. |
| `REMOVE_FROM_CART` | `shoe_id: string`                       | Remove the item whose `shoe_id` matches.                                                                                                        |
| `UPDATE_QUANTITY`  | `{ shoe_id: string; quantity: number }` | Set the quantity of the matching item. If `quantity <= 0`, remove the item.                                                                     |
| `CLEAR_CART`       | —                                       | Reset `items` to `[]`.                                                                                                                          |

Initial state: `{ items: [] }`.

Export:

- `CartAction` — union of all action types
- `cartReducer(state: ICartState, action: CartAction): ICartState`
- `initialCartState: ICartState`

### 3. `src/context/CartContext.tsx` — Context + Provider

```tsx
import React, { createContext, useContext, useReducer } from "react";
import { ICartState } from "@/models/Cart";
import {
  CartAction,
  cartReducer,
  initialCartState,
} from "@/reducers/cartReducer";

interface CartContextValue {
  state: ICartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
```

### 4. `src/pages/cart.tsx` — Cart / Checkout Page

This is a standard Next.js page (no `getServerSideProps` needed).

**Layout requirements:**

- Page title: "Your Cart"
- If cart is empty: show a friendly empty-state message with a "Back to Shop" link to `/`.
- If cart has items: render a list of cart rows + an order summary panel.

**Cart row** (per item):

- Shoe image (via Cloudinary, same logic as `ProductCard`)
- Model name, brand, size, condition badge
- Quantity control: decrement button, quantity display, increment button — dispatch `UPDATE_QUANTITY`
- Remove button — dispatch `REMOVE_FROM_CART`

**Order summary panel:**

- Subtotal: sum of `price * quantity` for all items
- Item count
- "Clear Cart" button — dispatch `CLEAR_CART`
- "Proceed to Checkout" button (for now this can show a toast/alert saying "Feature coming soon")

### 5. `src/components/CartIcon.tsx` — Header cart icon with badge

- Import `useCart` and read `state.items`
- Compute total item count: `items.reduce((acc, i) => acc + i.quantity, 0)`
- Render a shopping cart icon (use `ShoppingCart` from `lucide-react`)
- Overlay a small circular badge with the count (hide if count is `0`)
- When clicked, navigate to `/cart` using Next.js `useRouter`

---

## Files to Modify

### `src/pages/_app.tsx`

Wrap the entire app in `CartProvider`:

```tsx
import { CartProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
```

### `src/components/Header.tsx`

Add `CartIcon` next to `SearchAppBar` in the header toolbar:

```tsx
import CartIcon from "./CartIcon";
// ...
<div className="w-32 md:w-auto mr-5 flex items-center gap-3">
  <SearchAppBar />
  <CartIcon />
</div>;
```

### `src/components/ProductCard.tsx`

Add an **"Add to Cart"** button at the bottom of the card:

- Import `useCart` and dispatch `{ type: "ADD_TO_CART", payload: props.product }`
- If `props.product.status` (check whether the field indicates sold/unavailable — treat any value other than `"available"` / `""` as sold), show a disabled "Sold" button instead
- Style: full-width, dark background, white text — consistent with the card's existing Tailwind styling

---

## Implementation Constraints

1. **Do not install new dependencies** — use only what is already in `package.json` (Tailwind, lucide-react, MUI icons, React Bootstrap).
2. **Reducer must be pure** — no side effects inside `cartReducer`. All state transitions must be handled via the action types listed above.
3. **TypeScript strict** — all new files must be fully typed; avoid `any`.
4. **No CSS files** — use Tailwind utility classes only.
5. **Pages Router only** — do not use Next.js App Router patterns (`use client`, `layout.tsx`, etc.). This project uses `src/pages/`.
6. **`shoe_id` is the canonical identifier** — use it for all cart item lookups and deduplication.

---

## Suggested Implementation Order

1. Create `src/models/Cart.ts`
2. Create `src/reducers/cartReducer.ts`
3. Create `src/context/CartContext.tsx`
4. Modify `src/pages/_app.tsx` to add `CartProvider`
5. Create `src/components/CartIcon.tsx`
6. Modify `src/components/Header.tsx` to include `CartIcon`
7. Modify `src/components/ProductCard.tsx` to add "Add to Cart"
8. Create `src/pages/cart.tsx`

---

## Acceptance Criteria

- [ ] Clicking "Add to Cart" on a product card adds it to cart state (or increments if already present)
- [ ] The cart icon in the header shows the correct total item count
- [ ] Navigating to `/cart` shows all cart items with quantities and prices
- [ ] Quantity controls update the item quantity; setting to 0 removes the item
- [ ] "Remove" button removes a single item
- [ ] "Clear Cart" empties the entire cart
- [ ] Cart state is shared across all pages via context (not prop drilling)
- [ ] Sold-out products show a disabled "Sold" button instead of "Add to Cart"
- [ ] All TypeScript types compile without errors (`npm run build`)
