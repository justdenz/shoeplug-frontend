import ProductCard from "@/components/ProductCard";
import { useQuery, gql } from "@apollo/client";
import { IProduct } from "@/models/Product";

const GET_PRODUCTS = gql`
  query Shoes {
    shoes {
      model
      brand {
        brand_name
      }
      stock
      colorway
      image_url
      documentId
      price
      is_used
    }
  }
`;

const Product = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      pagination: {
        limit: 10,
      },
      filters: {
        colorway: {
          eq: "White",
        },
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="flex flex-row flex-wrap justify-center px-80">
      {data.shoes &&
        data.shoes.map((product: IProduct) => {
          return <ProductCard key={product.documentId} product={product} />;
        })}
    </div>
  );
};

export default Product;
