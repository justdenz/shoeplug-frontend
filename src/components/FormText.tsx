import Form from "react-bootstrap/Form";

function FormText() {
  return (
    <>
      <Form.Control
        type="text"
        id="search_item"
        aria-describedby="input item to search here"
      />
    </>
  );
}

export default FormText;
