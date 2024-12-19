import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import Paginator from "@/components/Paginator";
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

  if (props.searchItem === "") {
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
      <div className="flex flex-row w-full">
        <div className="w-1/5 mr-5 mt-5">
          <div className="sticky top-32">
            <ProductFilter
              setFilteredBrands={setFilteredBrands}
              setFilteredOthers={setFilteredOthers}
              filteredOthers={filteredOthers}
              filteredBrands={filteredBrands}
              allBrands={props.allBrands}
            />
          </div>
        </div>
        <div className="mt-32 min-h-[calc(100vh-5.75rem)] w-4/5 justify-items-center">
          {ProductContainer(shoes)}
          <Paginator page={props.page} />
        </div>
      </div>
    </NoSsr>
  );
};

export default Product;
