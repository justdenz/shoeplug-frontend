import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
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

const GET_FILTERED_PRODUCTS = gql`
  query Shoes($filters: ShoeFiltersInput) {
    shoes(filters: $filters) {
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

const GET_BRANDS = gql`
  query Shoes {
    brands {
      brand_name
      documentId
    }
  }
`;

export { GET_ALL_PRODUCTS, GET_FILTERED_PRODUCTS, GET_BRANDS };
