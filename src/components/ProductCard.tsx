"use client";

import React, { useState } from "react";
// import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { IShoe } from "@/models/Product";
import GenericShoeImg from "../../public/generic_shoe.png";
import { useCart } from "@/context/CartContext";
interface ProductCardProps {
  product: IShoe;
}
const CLOUDINARY_CLOUD_NAME = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
  const { dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  const isSold =
    soldOut ||
    (props.product.status !== "" &&
      props.product.status.toLowerCase() !== "available");

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?shoe_id=${encodeURIComponent(props.product.shoe_id)}`,
      );
      if (!res.ok) {
        alert("Could not verify stock. Please try again.");
        return;
      }
      const fresh: IShoe = await res.json();
      const isNowSold =
        fresh.status !== "" && fresh.status.toLowerCase() !== "available";
      if (isNowSold) {
        setSoldOut(true);
        alert("Sorry, this item just sold out.");
        return;
      }
      dispatch({ type: "ADD_TO_CART", payload: fresh });
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const link = props.product.image_url
    ? CLOUDINARY_CLOUD_NAME + props.product.image_url
    : GenericShoeImg;
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
    <div className="bg-white rounded-lg shadow p-2 grid grid-rows-[1/5_auto_auto_auto] gap-1">
      {/* Image */}
      <div className="justify-items-center">
        <Image
          src={link}
          width="0"
          height="0"
          sizes="100vw"
          alt="shoe_image"
          className="w-[300px] h-[350px] rounded-md object-cover"
        />
      </div>

      {/* Product Name */}
      <div className="text-md font-semibold mt-1 w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
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

      {/* Add to Cart / Sold */}
      {isSold ? (
        <button
          disabled
          className="mt-2 w-full py-2 rounded-md bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
        >
          Sold
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="mt-2 w-full py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Checking..." : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
