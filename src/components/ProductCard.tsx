import React from "react";
import { CldImage } from "next-cloudinary";
interface ProductCardProps {
  products: any;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  //   const price = props.product.Price.toString();
  //   const displayName =
  console.log(props);
  return (
    <div className="p-6">
      <div key={props.product.documentID}>
        <CldImage
          priority={true}
          width={300}
          height={360}
          crop="fill"
          sizes="100vw"
          src={props.product.image_url}
          alt="Logo"
        />
      </div>
      <div className="font-bold">{"₱" + props.product.Price}</div>
      <div>{props.product.brand.BrandName + " " + props.product.Model}</div>
      <div>{props.product.Colorway}</div>
    </div>
  );
};

export default ProductCard;
