export interface IShoe {
  shoe_id: string;
  date_bought: string;
  model: string;
  condition: string;
  size: number;
  price: number;
  status: string;
  image_url: string;
  brand: string;
}

export type ProductFilterObj = {
  brand: string;
  condition: string;
};
