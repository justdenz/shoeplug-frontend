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
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const inCart = state.items.some((item) => item.product.shoe_id === props.product.shoe_id);
  const link = props.product.shoe_id
    ? CLOUDINARY_CLOUD_NAME + props.product.shoe_id
    : GenericShoeImg;
  const unavailable =
    soldOut ||
    (props.product.status !== "" &&
      props.product.status.toLowerCase() !== "available");

  const handleAddToCart = async () => {
    if (inCart) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?shoe_id=${encodeURIComponent(props.product.shoe_id)}`,
      );
      if (!response.ok) throw new Error("stock-check-failed");
      const freshProduct: IShoe = await response.json();
      if (
        freshProduct.status !== "" &&
        freshProduct.status.toLowerCase() !== "available"
      ) {
        setSoldOut(true);
        return;
      }
      dispatch({ type: "ADD_TO_CART", payload: freshProduct });
    } catch {
      alert("Could not verify stock. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const conditionElement = () => {
    switch (props.product.condition) {
      case "NEW":
        return <div className="text-green-500">New</div>;
      case "USED":
        return <div className="text-yellow-500">{props.product.description}</div>;
      default:
        return <div className="text-gray-500">New</div>;
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-2 grid grid-rows-[1/5_auto_auto_auto] gap-1">
      {/* Image */}
      <div className="justify-items-center">
        <Image
          // src={props.product.image_url}
          src={link}
          width="0"
          height="0"
          sizes="100vw"
          alt={props.product.model}
          loading="lazy"
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

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={loading || unavailable || inCart}
        className={`mt-2 rounded-md px-3 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed ${inCart ? "bg-gray-400" : "bg-black hover:bg-gray-800 disabled:bg-gray-400"}`}
      >
        {loading ? "Checking stock..." : unavailable ? "Sold out" : inCart ? "In cart" : "Add to cart"}
      </button>
    </div>
  );
};

export default ProductCard;
