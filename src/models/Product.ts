export interface IShoe {
  shoe_id: string;
  date_bought: string;
  model: string;
  condition: string;
  size: number;
  price: number;
  status: string;
  brand: string;
  description: string;
}

export type ProductFilterObj = {
  brand: string;
  condition: string;
};
