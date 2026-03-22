import { NextRequest, NextResponse } from "next/server";
import { getCachedSheetsData } from "@/lib/sheetsCache";
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

export async function GET(request: NextRequest) {
  try {
    const { shoes: allShoes, brands } = await getCachedSheetsData();
    const searchParams = request.nextUrl.searchParams;

    const shoe_id = searchParams.get("shoe_id") || "";
    if (shoe_id) {
      const { shoes: allShoesRT } = await getGoogleSheetsData();
      const shoe = allShoesRT.find((s) => s.shoe_id === shoe_id);
      if (!shoe)
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      return NextResponse.json(shoe);
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const brand = searchParams.get("brand") || "";
    const condition = searchParams.get("condition") || "";
    const query = searchParams.get("query") || "";

    let filtered: IShoe[] = allShoes;

    if (brand !== "" || condition !== "") {
      filtered = filterProducts(allShoes, { brand, condition });
    } else if (query !== "") {
      filtered = filterProductsBySearch(allShoes, query);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    const shoes = getShoesByIndex(filtered, page, PAGE_SIZE);

    return NextResponse.json({ shoes, brands, totalPages, totalItems, page });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
