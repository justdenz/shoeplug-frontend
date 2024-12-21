import "bootstrap/dist/css/bootstrap.min.css";
import Product from "@/components/Product";
import { getGoogleSheetsData } from "@/lib/googleapi";
import { useSearchParams } from "next/navigation";

export async function getServerSideProps() {
  const response = await getGoogleSheetsData();
  return {
    props: {
      response,
    },
  };
}

export default function Page(props) {
  const search = useSearchParams();
  const page = (search && search.get("page")) || 1;
  const searchItem = (search && search.get("query")) || "";
  const filter = (search && search.get("filter")) || "";

  const rows = props.response.shoes;
  const brands = props.response.brands;
  return (
    <div>
      <Product
        allProducts={rows}
        allBrands={brands}
        page={+page}
        searchItem={searchItem}
        filter={filter}
      />
    </div>
  );
}
