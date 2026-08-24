"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
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

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ICartState;
        parsed.items.forEach((item) => {
          dispatch({ type: "ADD_TO_CART", payload: item.product });
          for (let index = 1; index < item.quantity; index += 1) {
            dispatch({ type: "ADD_TO_CART", payload: item.product });
          }
        });
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

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
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
