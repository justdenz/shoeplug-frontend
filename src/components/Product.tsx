import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationBasic from "@/components/Paginator";
import NoSsr from "./NoSsr";
import { IShoe } from "@/models/Product";

interface ProductProps {
  allProducts: IShoe[];
  allBrands: string[];
  page: number;
  searchItem: string;
}

const ProductContainer = (products: IShoe[]) => {
  return (
    <div className="flex">
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {products &&
          products.map((product: IShoe) => {
            return <ProductCard key={product.shoe_id} product={product} />;
          })}
      </div>
    </div>
  );
};

const Product: React.FC<ProductProps> = (props: ProductProps) => {
  const startIndex = props.page !== 1 ? props.page + 11 * (props.page - 1) : 1;
  let shoes;
  let totalPages;

  if (props.searchItem === "") {
    totalPages = props.allProducts.length / 11;
    shoes = props.allProducts.slice(startIndex, startIndex + 11);
  } else {
    shoes = props.allProducts.filter((product) =>
      product.model.includes(props.searchItem)
    );
  }

  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  const [filteredOthers, setFilteredOthers] = useState<boolean[]>([]);

  return (
    <NoSsr>
      <div className="flex flex-col items-center">
        <div className="w-3/4 mt-10 -z-50">
          <div className="w-1/4">
            <ProductFilter
              setFilteredBrands={setFilteredBrands}
              setFilteredOthers={setFilteredOthers}
              filteredOthers={filteredOthers}
              filteredBrands={filteredBrands}
              allBrands={props.allBrands}
            />
          </div>
        </div>
        <div className="w-3/4">
          <div className="min-h-[calc(100vh-5.75rem)]">
            {ProductContainer(shoes)}
          </div>
        </div>
        <PaginationBasic page={props.page} totalPages={totalPages} />
      </div>
    </NoSsr>
  );
};

export default Product;
