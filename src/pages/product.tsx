import ProductCard from "@/components/ProductCard";
import { useQuery, gql } from "@apollo/client";

const PRODUCTS = gql`
  query GetProducts {
    shoes {
      Model
      brand {
        BrandName
      }
      Stock
      Colorway
      image_url
      documentId
      Price
    }
  }
`;

const Product = () => {
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="flex flex-row flex-wrap justify-center px-80">
      {data.shoes &&
        data.shoes.map((product: any) => {
          return <ProductCard key={product.documentId} product={product} />;
        })}
    </div>
  );
};

export default Product;
