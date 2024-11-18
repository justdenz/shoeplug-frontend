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
