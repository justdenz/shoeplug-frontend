export interface IProduct {
  model: string;
  brand: {
    brand_name: string;
  };
  stock: number;
  colorway: string;
  image_url: string;
  documentId: string;
  price: number;
  is_used: boolean;
}

export interface IShoe {
  shoe_id: string;
  date_bought: string;
  model: string;
  condition: string;
  size: number;
  price: number;
  status: string;
  image_url: string;
}

export interface IShoes {
  shoes: Array<IProduct>;
}
