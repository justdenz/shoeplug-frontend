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
  filter: {
    brand: string;
    condition: string;
  };
}

const Product: React.FC<ProductProps> = (props: ProductProps) => {
  const startIndex = props.page !== 1 ? (props.page - 1) * PAGE_SIZE + 1 : 1;
  const endIndex = props.page * PAGE_SIZE;
  console.log("START INDEX: " + startIndex);
  console.log("END INDEX: " + endIndex);
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
  } else if (props.searchItem === "") {
    totalPages = Math.ceil(props.allProducts.length / PAGE_SIZE);
    shoes = props.allProducts.slice(startIndex, endIndex + 1);
  } else {
    shoes = props.allProducts.filter((product) =>
      product.model.toLowerCase().includes(props.searchItem.toLocaleLowerCase())
    );
  }

  return (
    <NoSsr>
      <div className="flex flex-col items-center">
        <div className="mb-5">
          <div className="my-4">
            <ProductFilter
              allBrands={props.allBrands}
              activeFilter={props.filter.brand}
            />
          </div>
          <div className="min-h-[calc(100vh-5.75rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  place-items-center gap-5">
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
