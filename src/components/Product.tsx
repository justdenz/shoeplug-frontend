import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { IProduct, IFilteredProducts } from "@/models/Product";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { GET_ALL_PRODUCTS, GET_FILTERED_PRODUCTS } from "@/lib/queries";

const Product = () => {
  const [displayedProducts, setDisplayedProducts] =
    useState<IFilteredProducts>();
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

  const { loading, data, error } = useQuery(GET_ALL_PRODUCTS);

  const [getFilteredProducts, {}] = useLazyQuery(GET_FILTERED_PRODUCTS, {
    variables: {
      pagination: {
        limit: 10,
      },
      filters: {
        brand: {
          brand_name: {
            in: filteredBrands,
          },
        },
        or: {
          is_used: {
            in: [true, false],
          },
        },
      },
    },
    onCompleted: (data) => {
      if (data) {
        setDisplayedProducts(data);
      }
    },
  });

  useEffect(() => {
    getFilteredProducts();
  }, [filteredBrands, getFilteredProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  if (filteredBrands.length === 0) {
    return (
      <div className="flex flex-row">
        <div className="p-10 justify-items-end">
          <ProductFilter setFilteredBrands={setFilteredBrands} />
        </div>
        <div className="flex-1">
          <div className="flex flex-row flex-wrap justify-center px-80">
            {data.shoes &&
              data.shoes.map((product: IProduct) => {
                return (
                  <ProductCard key={product.documentId} product={product} />
                );
              })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <div className="p-10 justify-items-end">
          <ProductFilter setFilteredBrands={setFilteredBrands} />
        </div>
        <div className="flex-1">
          <div className="flex flex-row flex-wrap justify-center px-80">
            {displayedProducts &&
              displayedProducts.shoes.map((product: IProduct) => {
                return (
                  <ProductCard key={product.documentId} product={product} />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
