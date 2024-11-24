import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";

interface FormTextProps {
  setSearchItem: (searchItem: string) => void;
}

const FormText: React.FC<FormTextProps> = (props: FormTextProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const submitSearchFilter = () => {
    props.setSearchItem(searchText);
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          type="text"
          id="search_item"
          placeholder="Search a shoe item..."
          aria-describedby="input item to search here"
          onChange={handleChange}
        />
        <Button
          variant="outline-secondary"
          onClick={submitSearchFilter}
          id="button-addon1"
        >
          <Search />
        </Button>
      </InputGroup>
    </>
  );
};

export default FormText;
