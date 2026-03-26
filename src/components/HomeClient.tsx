"use client";

import { useSearchParams } from "next/navigation";
import { IShoe } from "@/models/Product";
import ProductContainer from "@/components/ProductContainer";

interface HomeClientProps {
  allProducts: IShoe[];
  allBrands: string[];
}

export default function HomeClient({ allProducts, allBrands }: HomeClientProps) {
  const search = useSearchParams();
  const page = (search && search.get("page")) || 1;
  const searchItem = (search && search.get("query")) || "";
  const filter = {
    brand: (search && search.get("brand")) || "",
    condition: (search && search.get("condition")) || "",
  };

  return (
    <ProductContainer
      allProducts={allProducts}
      allBrands={allBrands}
      page={+page}
      searchItem={searchItem}
      filter={filter}
    />
  );
}
