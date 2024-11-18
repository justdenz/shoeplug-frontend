import Product from "@/components/Product";
import ProductFilter from "@/components/ProductFilter";

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="p-10 justify-items-end">
        <ProductFilter />
      </div>
      <div className="flex-1">
        <Product />
      </div>
    </div>
  );
}
