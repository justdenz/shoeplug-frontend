import { useQuery, useLazyQuery } from "@apollo/client";
import { IProduct, IShoes } from "@/models/Product";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import {
  GET_ALL_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GetFilteredVariables,
} from "@/lib/queries";

const ProductContainer = (products: IShoes) => {
  return (
    <div className="flex">
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {products.shoes &&
          products.shoes.map((product: IProduct) => {
            return <ProductCard key={product.documentId} product={product} />;
          })}
      </div>
    </div>
  );
};

const Product = ({ query }: { query: string }) => {
  const [displayedProducts, setDisplayedProducts] = useState<IShoes>({
    shoes: [],
  });
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  const [filteredOthers, setFilteredOthers] = useState<boolean[]>([]);

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS);

  const [getFilteredProducts, {}] = useLazyQuery(GET_FILTERED_PRODUCTS, {
    variables: GetFilteredVariables(filteredBrands, filteredOthers),
    onCompleted: (data) => {
      if (data) {
        setDisplayedProducts(data);
      }
    },
  });

  const [getSearchProducts, {}] = useLazyQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      filters: {
        search_tag: {
          contains: query,
        },
      },
    },
    onCompleted: (data) => {
      if (data) {
        console.log(data);
        setDisplayedProducts(data);
      }
    },
  });
  useEffect(() => {
    if (query !== "") {
      getSearchProducts();
    }
  }, [query, getSearchProducts]);
  useEffect(() => {
    getFilteredProducts();
  }, [filteredBrands, filteredOthers, getFilteredProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/5 mr-5 mt-5">
        <div className="fixed top-32">
          <ProductFilter
            setFilteredBrands={setFilteredBrands}
            setFilteredOthers={setFilteredOthers}
            filteredOthers={filteredOthers}
            filteredBrands={filteredBrands}
          />
        </div>
      </div>
      <div className="mt-32 min-h-[calc(100vh-5.75rem)] w-3/4 justify-items-center">
        {displayedProducts.shoes.length === 0
          ? ProductContainer(data)
          : ProductContainer(displayedProducts)}
      </div>
    </div>
  );
};

export default Product;
