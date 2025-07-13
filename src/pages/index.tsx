import "bootstrap/dist/css/bootstrap.min.css";
import Product from "@/components/Product";
import { getGoogleSheetsData } from "@/lib/googleapi";
import { useSearchParams } from "next/navigation";
import { IShoe } from "@/models/Product";
import Router from "next/router";
import React from "react";

export async function getServerSideProps() {
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
      <Product
        allProducts={rows}
        allBrands={brands}
        page={+page}
        searchItem={searchItem}
        filter={filter}
        loading={loading}
      />
    </div>
  );
}
