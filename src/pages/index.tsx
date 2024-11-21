import Product from "@/components/Product";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <Product />
      </div>
    </div>
  );
}
