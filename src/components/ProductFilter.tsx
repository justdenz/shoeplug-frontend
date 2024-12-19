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
  allBrands: string[];
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  const [searchText, setSearchText] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchText !== "") {
      params.set("query", searchText.trim());
      params.delete("page");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchText("");
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>error</p>;

  const handleCheckedFilter = (e) => {};

  return (
    <div className="">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
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
              defaultValue={searchParams.get("query")?.toString()}
            />
            <Button
              variant="outline-secondary"
              id="button-addon1"
              type="submit"
              onKeyDown={handleKeyPress}
            >
              <Search />
            </Button>
          </InputGroup>
        </Form.Group>
        {/* <Form.Group className="mb-4" controlId="brandFilterForm">
          <div className="text-xl my-3 font-semibold">Brand</div>
          {props.allBrands.map((brand: string) => {
            return (
              <Form.Check
                className="text-lg"
                key={brand}
                label={brand}
                name="brand_group"
                type="checkbox"
                id={brand}
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
        </Form.Group> */}
      </Form>
    </div>
  );
};

export default ProductFilter;
