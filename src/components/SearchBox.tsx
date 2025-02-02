import React, { useState, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { Search } from "react-bootstrap-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchBox = () => {
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
      params.delete("brand");
      params.delete("condition");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchText("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Form.Group controlId="searchFilterForm">
          <InputGroup>
            <Form.Control
              className="h-10"
              type="text"
              placeholder="Search a shoe item..."
              aria-describedby="input item to search here"
              onChange={handleChange}
              value={searchText}
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
      </Form>
    </div>
  );
};

export default SearchBox;
