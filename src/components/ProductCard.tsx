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

    return <div className="text-green-500">Brand New</div>;
  };
  return (
    <div className="w-[350px] h-full bg-white rounded-lg shadow p-2 grid grid-rows-[1/5_auto_auto_auto] gap-1">
      {/* Image */}
      <div className="justify-items-center">
        <CldImage
          src={props.product.image_url}
          width={300}
          height={350}
          alt="KT 2 SPLASH"
          crop="fill"
          className="w-auto h-auto object-cover rounded-md"
        />
      </div>

      {/* Product Name */}
      <div className="text-md font-semibold mt-1">{props.product.model}</div>

      {/* Size */}
      <div className="text-md text-gray-600">
        {"Size: " + props.product.size}
      </div>

      {/* Price and Condition */}
      <div className="flex justify-between items-center text-lg font-bold">
        <div className="text-black">{"₱" + props.product.price}</div>
        {conditionElement()}
      </div>
    </div>
  );
};

export default ProductCard;
