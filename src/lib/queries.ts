import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  query Shoes($pagination: PaginationArg) {
    shoes(pagination: $pagination) {
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

const GetFilteredVariables = (
  filteredBrands: string[],
  filteredOthers: boolean[]
) => {
  if (filteredBrands.length > 0 && filteredOthers.length === 0) {
    return {
      pagination: {
        limit: 20,
      },
      filters: {
        brand: {
          brand_name: {
            in: filteredBrands,
          },
        },
      },
    };
  }

  if (filteredBrands.length === 0 && filteredOthers.length > 0) {
    return {
      pagination: {
        limit: 20,
      },
      filters: {
        is_used: {
          in: filteredOthers,
        },
      },
    };
  }

  const variables = {
    pagination: {
      limit: 20,
    },
    filters: {
      brand: {
        brand_name: {
          in: filteredBrands,
        },
      },
      is_used: {
        in: filteredOthers,
      },
    },
  };

  return variables;
};

export {
  GET_ALL_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GET_BRANDS,
  GetFilteredVariables,
};
