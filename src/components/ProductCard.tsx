import React from "react";
import { CldImage } from "next-cloudinary";
import { IShoe } from "@/models/Product";
interface ProductCardProps {
  product: IShoe;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  return (
    <div>
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
      <div className="flex flex-row justify-between text-lg font-bold">
        <div className="">{props.product.model}</div>
        <div className="font-bold">{"₱" + props.product.price}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-gray-400">PLACEHOLDER</div>
        <div className="text-orange-500">{props.product.condition}</div>
      </div>
    </div>
  );
};

export default ProductCard;
