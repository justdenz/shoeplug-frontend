import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationBasic from "@/components/Paginator";
import NoSsr from "./NoSsr";
import { IShoe } from "@/models/Product";
import { PAGE_SIZE } from "@/models/resource";
import EmptySerach from "./EmptySearch";
import Spinner from "./Spinner";

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

const Product: React.FC<ProductProps> = (props: ProductProps) => {
  const startIndex = props.page !== 1 ? (props.page - 1) * PAGE_SIZE : 0;
  const endIndex = props.page * PAGE_SIZE;
  let shoes = props.allProducts;
  let totalPages = 0;

  if (props.filter.brand !== "" || props.filter.condition !== "") {
    if (props.filter.brand !== "") {
      shoes = shoes.filter(
        (product) =>
          product.brand.toLowerCase() === props.filter.brand.toLowerCase()
      );
    }

    if (props.filter.condition !== "") {
      shoes = shoes.filter(
        (product) =>
          product.condition.toLowerCase() ===
          props.filter.condition.toLowerCase()
      );
    }
  } else if (props.searchItem !== "") {
    shoes = props.allProducts.filter((product) =>
      product.model.toLowerCase().includes(props.searchItem.toLocaleLowerCase())
    );
  }
  totalPages = Math.ceil(shoes.length / PAGE_SIZE);
  shoes = shoes.slice(startIndex, endIndex);

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
                  activeFilter={props.filter.brand}
                />
              </div>
              <div className="min-h-[calc(100vh-5.75rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center gap-5 pb-20">
                  {shoes &&
                    shoes.map((product: IShoe) => {
                      return (
                        <ProductCard key={product.shoe_id} product={product} />
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

export default Product;
