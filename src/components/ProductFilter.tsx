import React, { useState, ChangeEvent } from "react";
import { useQuery } from "@apollo/client";
import { IBrand } from "@/models/Brand";
import Form from "react-bootstrap/Form";
import { GET_BRANDS } from "@/lib/queries";
import { Search } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
interface ProductFilterProps {
  setFilteredBrands: (Array: string[]) => void;
  setFilteredOthers: (Array: boolean[]) => void;
  filteredOthers: boolean[];
  filteredBrands: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("query", searchText);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const handleCheckedFilter = (e) => {
    if (e.target.name === "is_used_group") {
      const prevFilter = [...props.filteredOthers];
      const isUsedObject = {
        objectID: e.target.id,
        isChecked: e.target.checked,
      };
      const filterItem = isUsedObject.objectID === "brand_new" ? false : true;
      if (isUsedObject.isChecked) {
        prevFilter.push(filterItem);
        props.setFilteredOthers(prevFilter);
      } else if (!isUsedObject.isChecked) {
        const index = prevFilter.indexOf(filterItem, 0);
        if (index > -1) {
          prevFilter.splice(index, 1);
        }
        props.setFilteredOthers(prevFilter);
      }
    }

    if (e.target.name === "brand_group") {
      const prevFilter = [...props.filteredBrands];
      const isUsedObject = {
        objectID: e.target.id,
        isChecked: e.target.checked,
      };

      if (isUsedObject.isChecked) {
        prevFilter.push(isUsedObject.objectID);
        props.setFilteredBrands(prevFilter);
      } else if (!isUsedObject.isChecked) {
        const index = prevFilter.indexOf(isUsedObject.objectID, 0);
        if (index > -1) {
          prevFilter.splice(index, 1);
        }
        props.setFilteredBrands(prevFilter);
      }
    }
  };

  return (
    <div className="w-full h-full pl-24">
      <Form
        onSubmit={(e) => {
          e.target.reset();
          e.preventDefault();
        }}
        onChange={handleCheckedFilter}
      >
        <Form.Group className="mb-4" controlId="searchFilterForm">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search a shoe item..."
              aria-describedby="input item to search here"
              onChange={handleChange}
            />
            <Button
              variant="outline-secondary"
              onClick={handleSearch}
              id="button-addon1"
              type="submit"
              onKeyDown={handleKeyPress}
            >
              <Search />
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-4" controlId="brandFilterForm">
          <div className="text-xl my-3 font-semibold">Brand</div>
          {data.brands &&
            data.brands.map((brand: IBrand) => {
              return (
                <Form.Check
                  className="text-lg"
                  key={brand.documentId}
                  label={brand.brand_name}
                  name="brand_group"
                  type="checkbox"
                  id={brand.brand_name}
                />
              );
            })}
        </Form.Group>
        <div className="h-px w-full bg-gray-300 mb-3"></div>
        <Form.Group controlId="isUsedFilterForm">
          <div className="text-xl mb-3 font-semibold">Used</div>
          <Form.Check
            className="text-lg"
            label={"Brand New"}
            name="is_used_group"
            type="checkbox"
            id={"brand_new"}
          />
          <Form.Check
            className="text-lg"
            label={"Used"}
            name="is_used_group"
            type="checkbox"
            id={"used"}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProductFilter;
