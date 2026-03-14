import React from "react";
import Button from "react-bootstrap/Button";

const EmptySerach = () => {
  return (
    <div className="min-h-[calc(100vh-5.75rem)] flex flex-col items-center justify-center">
      <h1>No results found</h1>
      <Button variant="dark" size="lg" href="/">
        Go Back
      </Button>
    </div>
  );
};

export default EmptySerach;
