import React, { useState } from "react";
// import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { IShoe } from "@/models/Product";
import ProductCardLink from "@/components/ProductCardLink";
import GenericShoeImg from "../../public/generic_shoe.png";
interface ProductCardProps {
  product: IShoe;
}
const CLOUDINARY_CLOUD_NAME = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const link = CLOUDINARY_CLOUD_NAME + props.product?.shoe_id;
  const [imgSrc, setImgSrc] = useState(link);
  const conditionElement = () => {
    switch (props.product.condition) {
      case "NEW":
        return <div className="text-green-500">New</div>;
      case "USED":
        return (
          <div className="text-yellow-500">{props.product.description}</div>
        );
      default:
        return <div className="text-gray-500">New</div>;
    }
  };
  return (
    <ProductCardLink href={`/products/${props.product.slug}`}>
      <div className="bg-white rounded-lg shadow p-2 grid grid-rows-[1/5_auto_auto_auto] gap-1">
        {/* Image */}
        <div className="justify-items-center">
          <Image
            // src={props.product.image_url}
            src={imgSrc}
            width="0"
            height="0"
            sizes="100vw"
            alt={props.product.model}
            loading="lazy"
            className="w-[300px] h-[350px] rounded-md object-cover"
            onError={() => {
              setImgSrc(GenericShoeImg.src);
            }}
          />
        </div>

        {/* Product Name */}
        <div className="text-md text-black font-semibold mt-1 w-[300px] whitespace-nowrap overflow-hidden text-ellipsis hover:underline">
          {props.product.model}
        </div>

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
    </ProductCardLink>
  );
};

export default ProductCard;
