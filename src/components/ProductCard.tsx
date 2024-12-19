import React from "react";
import { CldImage } from "next-cloudinary";
import { IShoe } from "@/models/Product";
interface ProductCardProps {
  product: IShoe;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  return (
    <div className="w-[300px]">
      <div key={props.product.shoe_id}>
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
      <div className="flex flex-col justify-between font-bold">
        <div className="text-ellipsis overflow-hidden text-base">
          {props.product.model}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="font-bold">{"₱" + props.product.price}</div>
        <div className="text-orange-500">{props.product.condition}</div>
      </div>
    </div>
  );
};

export default ProductCard;
