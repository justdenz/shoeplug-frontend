import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { Search } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Dropdown from "react-bootstrap/Dropdown";
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
      params.delete("filter");
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
        className="flex flex-row gap-5"
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
        <Form.Group className="mb-4" controlId="brandFilterForm">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="?filter=nike">Nike</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ProductFilter;
