"use client";

import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationBasic from "@/components/Paginator";
import NoSsr from "./NoSsr";
import { IShoe } from "@/models/Product";
import EmptySerach from "./EmptySearch";
import Spinner from "./Spinner";

interface ProductProps {
  shoes: IShoe[];
  allBrands: string[];
  page: number;
  totalPages: number;
  filter: {
    brand: string;
    condition: string;
  };
  loading: boolean;
}

const ProductContainer: React.FC<ProductProps> = (props: ProductProps) => {
  const shoes = props.shoes;

  return (
    <NoSsr>
      <div className="fixed top-17 left-0 right-0 z-40 bg-white shadow-sm px-4 py-2">
        <ProductFilter
          allBrands={props.allBrands}
          activeFilter={props.filter}
        />
      </div>
      {props.loading ? (
        <div className="flex flex-col items-center">
          <Spinner />
        </div>
      ) : shoes.length === 0 ? (
        <EmptySerach />
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-5 mt-20">
            <div className="min-h-[calc(100vh-5.75rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-5 pb-20">
                {shoes.map((product: IShoe) => (
                  <ProductCard key={product.shoe_id} product={product} />
                ))}
              </div>
              <PaginationBasic
                page={props.page}
                totalPages={props.totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </NoSsr>
  );
};

export default ProductContainer;
