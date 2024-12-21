import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
interface ProductFilterProps {
  allBrands: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  return (
    <div className="">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Brand
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.allBrands &&
            props.allBrands.map((brand: string) => {
              const brand_href = "?filter=" + brand.toLowerCase();
              return (
                <Dropdown.Item key={brand} href={brand_href}>
                  {brand.toUpperCase()}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProductFilter;
