import React from "react";
import { useQuery, gql } from "@apollo/client";
import { IBrand } from "@/models/Brand";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GET_BRANDS } from "@/lib/queries";
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const filteredBrandArray: string[] = [];
    const filteredOthersArray: boolean[] = [];
    const brandCheckedValues = Array.from(e.target.brand_group).map(
      (brand) => ({
        brandId: brand.id,
        isChecked: brand.checked,
      })
    );

    const othersCheckedValues = Array.from(e.target.is_used_group).map(
      (item) => ({
        itemId: item.id,
        isChecked: item.checked,
      })
    );

    const selectedBrandFilter = brandCheckedValues
      .filter((brand) => brand.isChecked === true)
      .map((brand) => ({ brandName: brand.brandId }));

    const selectedOthersFilter = othersCheckedValues
      .filter((item) => item.isChecked === true)
      .map((item) => ({ itemName: item.itemId }));

    if (selectedBrandFilter.length > 0) {
      selectedBrandFilter.forEach((element) => {
        filteredBrandArray.push(element.brandName);
      });

      props.setFilteredBrands(filteredBrandArray);
    } else {
      props.setFilteredBrands([]);
    }

    if (selectedOthersFilter.length > 0) {
      selectedOthersFilter.forEach((element) => {
        if (element.itemName === "brand_new") {
          filteredOthersArray.push(false);
        } else if (element.itemName === "used") {
          filteredOthersArray.push(true);
        }
      });
      props.setFilteredOthers(filteredOthersArray);
    } else {
      props.setFilteredOthers([]);
    }
  };

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
    <div className="w-full h-full pl-16 border-r-2">
      <div className="text-xl mb-3 font-semibold">Brand</div>
      <Form onSubmit={onFormSubmit} onChange={handleCheckedFilter}>
        <Form.Group className="mb-5" controlId="brandFilterForm">
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
        <div className="h-px w-full bg-gray-300 mb-5"></div>
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
        {/* <Button variant="warning" type="submit" className="mt-2 btn-primary">
          Apply Filter
        </Button> */}
      </Form>
    </div>
  );
};

export default ProductFilter;
