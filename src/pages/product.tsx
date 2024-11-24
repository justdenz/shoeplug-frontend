import "bootstrap/dist/css/bootstrap.min.css";
import Product from "@/components/Product";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const search = useSearchParams();
  const query = (search && search.get("query")) || "";
  return (
    <div>
      <Product query={query} />
    </div>
  );
}
