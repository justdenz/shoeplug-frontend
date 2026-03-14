import { IShoe } from "@/models/Product";
import { ICartState } from "@/models/Cart";

export type CartAction =
  | { type: "ADD_TO_CART"; payload: IShoe }
  | { type: "REMOVE_FROM_CART"; payload: { shoe_id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { shoe_id: string; quantity: number } }
  | { type: "CLEAR_CART" };

export const initialCartState: ICartState = {
  items: [],
};

export function cartReducer(state: ICartState, action: CartAction): ICartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (item) => item.product.shoe_id === action.payload.shoe_id,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.shoe_id === action.payload.shoe_id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.shoe_id !== action.payload.shoe_id,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.shoe_id !== action.payload.shoe_id,
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.shoe_id === action.payload.shoe_id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }

    case "CLEAR_CART": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}
