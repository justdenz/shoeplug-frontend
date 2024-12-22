import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { conditions } from "@/models/resource";
interface ProductFilterProps {
  allBrands: string[];
  activeFilter: string;
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  // const conditions = ["brand new", "good as new", "used"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelectCondition = (eventKey: string) => {
    const params = new URLSearchParams(searchParams);

    if (eventKey === "all_conditions") {
      params.delete("condition");
    } else if (eventKey !== "") {
      params.set("condition", eventKey);
      params.delete("page");
      params.delete("query");
    } else {
      params.delete("condition");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectBrand = (eventKey: string) => {
    const params = new URLSearchParams(searchParams);
    if (eventKey === "all_brands") {
      params.delete("brand");
    } else if (eventKey !== "") {
      params.set("brand", eventKey);
      params.delete("page");
      params.delete("query");
    } else {
      params.delete("brand");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="capitalize flex flex-row gap-3 place-items-center">
      <div className="text-lg">Filter: </div>
      <Dropdown onSelect={(eventKey) => handleSelectBrand(eventKey!)}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Brand
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.allBrands &&
            props.allBrands.map((brand: string) => {
              const isActive =
                brand.toLowerCase() === props.activeFilter.toLowerCase()
                  ? true
                  : false;
              return (
                <Dropdown.Item key={brand} eventKey={brand} active={isActive}>
                  <div className="font-semibold">{brand}</div>
                </Dropdown.Item>
              );
            })}
          <Dropdown.Divider />
          <Dropdown.Item key={"all_products"} eventKey={"all_brands"}>
            all products
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={(eventKey) => handleSelectCondition(eventKey!)}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Condition
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {conditions &&
            conditions.map((condition: string) => {
              const isActive =
                condition.toLowerCase() === props.activeFilter.toLowerCase()
                  ? true
                  : false;
              return (
                <Dropdown.Item
                  key={condition}
                  eventKey={condition}
                  active={isActive}
                >
                  <div className="font-semibold">
                    {condition.split("_").join(" ")}
                  </div>
                </Dropdown.Item>
              );
            })}
          <Dropdown.Divider />
          <Dropdown.Item key={"all_products"} eventKey={"all_conditions"}>
            Select All
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ProductFilter;
