import { IShoe } from "./Product";

export interface ICartItem {
  product: IShoe;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}
