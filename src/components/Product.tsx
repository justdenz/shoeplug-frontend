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

const Product = () => {
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

  useEffect(() => {
    console.log("CHANGE");
    getFilteredProducts();
  }, [filteredBrands, filteredOthers, getFilteredProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="flex flex-row">
      <div className="mt-5 mr-5 basis-1/5 grow-0 shrink-0 justify-items-center">
        <ProductFilter
          setFilteredBrands={setFilteredBrands}
          setFilteredOthers={setFilteredOthers}
          filteredOthers={filteredOthers}
          filteredBrands={filteredBrands}
        />
      </div>
      <div className="mt-5 basis-4/5 grow-0 shrink-0 justify-items-center">
        {filteredBrands.length === 0 && filteredOthers.length === 0
          ? ProductContainer(data)
          : ProductContainer(displayedProducts)}
      </div>
    </div>
  );
};

export default Product;
