import React from "react";
import { useQuery, gql } from "@apollo/client";
import { IBrand } from "@/models/Brand";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GET_BRANDS } from "@/lib/queries";
interface ProductFilterProps {
  setFilteredBrands: (Array: string[]) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = (
  props: ProductFilterProps
) => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const filteredBrandArray = [""];
    const brandCheckedValues = Array.from(e.target.brand_group).map(
      (brand) => ({
        brandId: brand.id,
        isChecked: brand.checked,
      })
    );

    const selectedBrandFilter = brandCheckedValues
      .filter((brand) => brand.isChecked === true)
      .map((brand) => ({ brandName: brand.brandId }));

    if (selectedBrandFilter.length > 0) {
      selectedBrandFilter.forEach((element) => {
        filteredBrandArray.push(element.brandName);
      });

      props.setFilteredBrands(filteredBrandArray);
    } else {
      props.setFilteredBrands([]);
    }
  };
  return (
    <div>
      <div className="text-lg font-bold">Brand</div>
      <Form onSubmit={onFormSubmit}>
        <Form.Group controlId="brandFilterForm">
          {data.brands &&
            data.brands.map((brand: IBrand) => {
              return (
                <Form.Check
                  className="ml-6"
                  key={brand.documentId}
                  label={brand.brand_name}
                  name="brand_group"
                  type="checkbox"
                  id={brand.brand_name}
                />
              );
            })}
        </Form.Group>
        <Form.Group controlId="isUsedFilterForm">
          <div className="text-lg font-bold">Others</div>
          <Form.Check
            className="ml-6"
            label={"Brand New"}
            name="is_used_group"
            type="checkbox"
            id={"brand_new"}
          />
          <Form.Check
            className="ml-6"
            label={"Used"}
            name="is_used_group"
            type="checkbox"
            id={"used"}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2 btn-primary">
          Apply Filter
        </Button>
      </Form>
    </div>
  );
};

export default ProductFilter;
