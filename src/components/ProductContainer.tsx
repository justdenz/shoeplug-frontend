import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationBasic from "@/components/Paginator";
import NoSsr from "./NoSsr";
import { IShoe } from "@/models/Product";
import { PAGE_SIZE } from "@/models/resource";
import EmptySerach from "./EmptySearch";
import Spinner from "./Spinner";
import {
  filterProducts,
  filterProductsBySearch,
  getShoesByIndex,
} from "@/utils/ProductUtils";

interface ProductProps {
  allProducts: IShoe[];
  allBrands: string[];
  page: number;
  searchItem: string;
  filter: {
    brand: string;
    condition: string;
  };
  loading: boolean;
}

const ProductContainer: React.FC<ProductProps> = (props: ProductProps) => {
  let shoes = props.allProducts;
  let totalPages = 0;

  if (props.filter.brand !== "" || props.filter.condition !== "") {
    shoes = filterProducts(props.allProducts, props.filter);
  } else if (props.searchItem !== "") {
    shoes = filterProductsBySearch(props.allProducts, props.searchItem);
  }
  totalPages = Math.ceil(shoes.length / PAGE_SIZE);
  shoes = getShoesByIndex(shoes, props.page, PAGE_SIZE);

  return (
    <NoSsr>
      {shoes.length === 0 ? (
        <EmptySerach />
      ) : (
        <div className="flex flex-col items-center">
          {props.loading ? (
            <Spinner />
          ) : (
            <div className="mb-5">
              <div className="my-4">
                <ProductFilter
                  allBrands={props.allBrands}
                  activeFilter={props.filter}
                />
              </div>
              <div className="min-h-[calc(100vh-5.75rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-5 pb-20">
                  {shoes &&
                    shoes.map((product: IShoe) => {
                      return (
                        <ProductCard key={Math.random()} product={product} />
                      );
                    })}
                </div>
                <PaginationBasic page={props.page} totalPages={totalPages} />
              </div>
            </div>
          )}
        </div>
      )}
    </NoSsr>
  );
};

export default ProductContainer;
