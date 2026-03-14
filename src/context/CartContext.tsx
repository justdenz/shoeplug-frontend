import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ICartState } from "@/models/Cart";
import {
  CartAction,
  cartReducer,
  initialCartState,
} from "@/reducers/cartReducer";

const CART_STORAGE_KEY = "shoeplug_cart";

interface CartContextValue {
  state: ICartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load from localStorage after mount to avoid SSR/hydration mismatch
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as ICartState;
        dispatch({ type: "CLEAR_CART" });
        saved.items.forEach((item) =>
          dispatch({ type: "ADD_TO_CART", payload: item.product }),
        );
        // Restore exact quantities
        saved.items.forEach((item) =>
          dispatch({
            type: "UPDATE_QUANTITY",
            payload: { shoe_id: item.product.shoe_id, quantity: item.quantity },
          }),
        );
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

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
