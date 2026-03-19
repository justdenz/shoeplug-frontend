import type { NextApiRequest, NextApiResponse } from "next";
import { getGoogleSheetsData } from "@/lib/googleapi";
import {
  filterProducts,
  filterProductsBySearch,
  getShoesByIndex,
} from "@/utils/ProductUtils";
import { IShoe } from "@/models/Product";
import { PAGE_SIZE } from "@/models/resource";

export interface ProductsApiResponse {
  shoes: IShoe[];
  brands: string[];
  totalPages: number;
  totalItems: number;
  page: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsApiResponse | { error: string }>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { shoes: allShoes, brands } = await getGoogleSheetsData();

    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const brand = (req.query.brand as string) || "";
    const condition = (req.query.condition as string) || "";
    const query = (req.query.query as string) || "";

    let filtered: IShoe[] = allShoes;

    if (brand !== "" || condition !== "") {
      filtered = filterProducts(allShoes, { brand, condition });
    } else if (query !== "") {
      filtered = filterProductsBySearch(allShoes, query);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    const shoes = getShoesByIndex(filtered, page, PAGE_SIZE);

    return res
      .status(200)
      .json({ shoes, brands, totalPages, totalItems, page });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
