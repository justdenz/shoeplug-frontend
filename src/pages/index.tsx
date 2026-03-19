import "bootstrap/dist/css/bootstrap.min.css";
import ProductContainer from "@/components/ProductContainer";
import { useSearchParams } from "next/navigation";
import { IShoe } from "@/models/Product";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { ProductsApiResponse } from "./api/products";

export default function Page() {
  const [shoes, setShoes] = React.useState<IShoe[]>([]);
  const [brands, setBrands] = React.useState<string[]>([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const search = useSearchParams();
  const page = parseInt((search && search.get("page")) || "1", 10);
  const searchItem = (search && search.get("query")) || "";
  const brand = (search && search.get("brand")) || "";
  const condition = (search && search.get("condition")) || "";

  React.useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (searchItem) params.set("query", searchItem);
    if (brand) params.set("brand", brand);
    if (condition) params.set("condition", condition);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data: ProductsApiResponse) => {
        setShoes(data.shoes);
        setBrands(data.brands);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page, searchItem, brand, condition]);

  const filter = { brand, condition };

  return (
    <div className="min-w-xl justify-self-center">
      <ProductContainer
        shoes={shoes}
        allBrands={brands}
        page={page}
        totalPages={totalPages}
        filter={filter}
        loading={loading}
      />
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
