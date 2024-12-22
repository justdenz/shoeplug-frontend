import React from "react";
import { CldImage } from "next-cloudinary";
import { IShoe } from "@/models/Product";
interface ProductCardProps {
  product: IShoe;
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const conditionElement = () => {
    if (props.product.condition === "BRAND_NEW") {
      return <div className="text-green-500">Brand New</div>;
    }

    if (props.product.condition === "GOOD_AS_NEW") {
      return <div className="text-sky-400">Good as new</div>;
    }

    if (props.product.condition === "USED") {
      return <div className="text-yellow-500">Used</div>;
    }

    return <div className="text-green-500">BRAND NEW</div>;
  };
  return (
    <div className="w-[300px]">
      <div className="rounded overflow-hidden" key={props.product.shoe_id}>
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
      <div className="flex flex-row justify-between font-bold">
        <div className="text-ellipsis overflow-hidden text-base">
          {props.product.model}
        </div>
      </div>
      <div className="font-medium">{"Size: " + props.product.size}</div>
      <div className="flex flex-row justify-between">
        <div className="font-bold">{"₱" + props.product.price}</div>
        {conditionElement()}
      </div>
    </div>
  );
};

export default ProductCard;
