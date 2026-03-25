import "bootstrap/dist/css/bootstrap.min.css";
import ProductContainer from "@/components/ProductContainer";
import { getGoogleSheetsData } from "@/lib/googleapi";
import { useSearchParams } from "next/navigation";
import { IShoe } from "@/models/Product";
import Router from "next/router";
import React from "react";
import { Analytics } from "@vercel/analytics/next";

export async function getServerSideProps() {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return { props: { response: { shoes: [], brands: [] } } };
  }
  const response = await getGoogleSheetsData();
  return {
    props: {
      response,
    },
  };
}

export default function Page(props: {
  response: { shoes: IShoe[]; brands: string[] };
}) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  const search = useSearchParams();
  const page = (search && search.get("page")) || 1;
  const searchItem = (search && search.get("query")) || "";
  const filter = {
    brand: (search && search.get("brand")) || "",
    condition: (search && search.get("condition")) || "",
  };

  const rows = props.response.shoes;
  const brands = props.response.brands;
  return (
    <div className="min-w-xl justify-self-center">
      <ProductContainer
        allProducts={rows}
        allBrands={brands}
        page={+page}
        searchItem={searchItem}
        filter={filter}
        loading={loading}
      />
      {process.env.NODE_ENV === "production" && <Analytics />}
    </div>
  );
}
