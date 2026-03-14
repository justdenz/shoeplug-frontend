import { IShoe } from "@/models/Product";

const filterByBrand = (products: IShoe[], brand: string) => {
  return products.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase(),
  );
};
const filterByCondition = (products: IShoe[], condition: string) => {
  return products.filter(
    (product) => product.condition.toLowerCase() === condition.toLowerCase(),
  );
};

export const filterProductsBySearch = (
  products: IShoe[],
  searchItem: string,
) => {
  return products.filter((product) =>
    product.model.toLowerCase().includes(searchItem.toLowerCase()),
  );
};

export const filterProducts = (
  products: IShoe[],
  filter: { brand: string; condition: string },
) => {
  let filteredProducts = products;

  if (filter.brand) {
    filteredProducts = filterByBrand(filteredProducts, filter.brand);
  }

  if (filter.condition) {
    filteredProducts = filterByCondition(filteredProducts, filter.condition);
  }

  return filteredProducts;
};

export const isInConditions = (
  conditions: string[],
  activeCondition: string,
) => {
  return conditions.some(
    (condition) => condition.toLowerCase() === activeCondition.toLowerCase(),
  );
};

export const isBrandFilterActive = (brand: string, activeBrand: string) => {
  return brand.toLowerCase() === activeBrand.toLowerCase();
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

export const getShoesByIndex = (
  shoes: IShoe[],
  page: number,
  pageSize: number,
) => {
  const startIndex = page !== 1 ? (page - 1) * pageSize : 0;
  const endIndex = page * pageSize;
  return shoes.slice(startIndex, endIndex);
};
