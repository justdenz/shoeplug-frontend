import React from "react";
import { CldImage } from "next-cloudinary";
import { IProduct } from "@/models/Product";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  //   const price = props.product.Price.toString();
  //   const displayName =
  return (
    <div className="p-6">
      <div key={props.product.documentId}>
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
      <div className="flex flex-row justify-between">
        <div className="">
          {props.product.model + " " + props.product.colorway}
        </div>
        <div className="font-bold">{"₱" + props.product.price}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-gray-400">{props.product.brand.brand_name}</div>
        {props.product.is_used ? (
          <div className="text-orange-500">Used</div>
        ) : (
          <div className="text-green-500">Brand New</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
