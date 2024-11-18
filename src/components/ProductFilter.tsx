import React from "react";
import { useQuery, gql } from "@apollo/client";
import { IBrand } from "@/models/Brand";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const GET_BRANDS = gql`
  query Shoes {
    brands {
      brand_name
      documentId
    }
  }
`;

const ProductFilter = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  console.log(data);
  return (
    <div>
      <div className="text-lg font-bold">Brand</div>
      {data.brands &&
        data.brands.map((brand: IBrand) => {
          return (
            <div key={brand.documentId}>
              <InputGroup className="flex flex-column">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <div className="ml-1">{brand.brand_name}</div>
              </InputGroup>
            </div>
          );
        })}
    </div>
  );
};

export default ProductFilter;
