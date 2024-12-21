import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import PaginationBasic from "@/components/Paginator";
import NoSsr from "./NoSsr";
import { IShoe } from "@/models/Product";
import { PAGE_SIZE } from "@/models/resource";

interface ProductProps {
  allProducts: IShoe[];
  allBrands: string[];
  page: number;
  searchItem: string;
  filter: string;
}

const Product: React.FC<ProductProps> = (props: ProductProps) => {
  const startIndex =
    props.page !== 1 ? props.page + PAGE_SIZE + 1 * (props.page - 1) : 1;
  let shoes;
  let totalPages = 0;

  if (props.filter !== "") {
    shoes = props.allProducts.filter((product) =>
      product.brand.toLowerCase().includes(props.filter.toLocaleLowerCase())
    );
  } else if (props.searchItem === "") {
    totalPages = props.allProducts.length / PAGE_SIZE;
    shoes = props.allProducts.slice(startIndex, startIndex + PAGE_SIZE);
  } else {
    shoes = props.allProducts.filter((product) =>
      product.model.toLowerCase().includes(props.searchItem.toLocaleLowerCase())
    );
  }

  return (
    <NoSsr>
      <div className="flex flex-col items-center">
        <div className="mt-10 h-14 w-3/4 ml-48 relative">
          <ProductFilter
            allBrands={props.allBrands}
            activeFilter={props.filter}
          />
        </div>
        <div className="w-3/4 mb-5">
          <div className="min-h-[calc(100vh-5.75rem)]">
            <div className="flex flex-row flex-wrap justify-center gap-5">
              {shoes &&
                shoes.map((product: IShoe) => {
                  return (
                    <ProductCard key={product.shoe_id} product={product} />
                  );
                })}
            </div>
          </div>
        </div>
        <PaginationBasic page={props.page} totalPages={totalPages} />
      </div>
    </NoSsr>
  );
};

export default Product;
