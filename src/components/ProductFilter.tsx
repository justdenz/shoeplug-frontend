import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
interface ProductFilterProps {
  allBrands: string[];
  activeFilter: string;
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  return (
    <div className="capitalize">
      <Dropdown>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Select Brand
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.allBrands &&
            props.allBrands.map((brand: string) => {
              const brand_href = "?filter=" + brand.toLowerCase();
              const isActive =
                brand.toLowerCase() === props.activeFilter.toLowerCase()
                  ? true
                  : false;
              return (
                <Dropdown.Item key={brand} href={brand_href} active={isActive}>
                  {brand}
                </Dropdown.Item>
              );
            })}

          <Dropdown.Item key={"all_products"} href={"/"}>
            all products
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProductFilter;
