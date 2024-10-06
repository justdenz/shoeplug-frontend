import React from "react";
import { CldImage } from "next-cloudinary";
interface ProductCardProps {
  products: any;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const displayName = props.product.brand.BrandName + " " + props.product.Model;

  return (
    <div className="p-6">
      <div key={props.product.documentID}>
        <CldImage
          priority={true}
          width="340"
          height="130"
          src={props.product.image_url}
          alt="Logo"
        />
      </div>
      <div>{displayName}</div>
    </div>
  );
};

export default ProductCard;
