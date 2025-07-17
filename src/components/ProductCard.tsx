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
    // <div className="w-2xs">
    //   <div
    //     className="rounded relative w-60 h-80 overflow-hidden"
    //     key={props.product.shoe_id}
    //   >
    //     <CldImage
    //       priority={true}
    //       fill={true}
    //       sizes="25vw"
    //       src={props.product.image_url}
    //       alt="Logo"
    //       className="object-cover rounded-md"
    //     />
    //   </div>
    //   <div className="w-5/6">
    //     <div className="flex flex-row justify-between font-bold">
    //       <div className="text-ellipsis overflow-hidden text-base">
    //         {props.product.model}
    //       </div>
    //     </div>
    //     <div className="font-medium">{"Size: " + props.product.size}</div>
    //     <div className="flex flex-row justify-between">
    //       <div className="font-bold">{"₱" + props.product.price}</div>
    //       {conditionElement()}
    //     </div>
    //   </div>
    // </div>

    <div className="w-[250px] h-full bg-white rounded-lg shadow p-2 grid grid-rows-[1/5_auto_auto_auto] gap-1">
      {/* Image */}
      <div className="justify-items-center">
        <CldImage
          src={props.product.image_url}
          width={250}
          height={300}
          alt="KT 2 SPLASH"
          crop="fill"
          className="w-auto h-auto object-cover rounded-md"
        />
      </div>

      {/* Product Name */}
      <div className="text-lg font-semibold mt-1">{props.product.model}</div>

      {/* Size */}
      <div className="text-lg text-gray-600">
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
