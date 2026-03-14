import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ICartItem } from "@/models/Cart";
import GenericShoeImg from "../../public/generic_shoe.png";
import "bootstrap/dist/css/bootstrap.min.css";

const CLOUDINARY_CLOUD_NAME = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

const conditionLabel = (condition: string) => {
  if (condition === "BRAND_NEW")
    return <span className="text-green-500 font-medium">Brand New</span>;
  if (condition === "GOOD_AS_NEW")
    return <span className="text-sky-400 font-medium">Good as new</span>;
  if (condition === "USED")
    return <span className="text-yellow-500 font-medium">Used</span>;
  return <span className="text-green-500 font-medium">Brand New</span>;
};

const CartItemRow: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { dispatch } = useCart();
  const { product, quantity } = item;

  const imgSrc = product.image_url
    ? CLOUDINARY_CLOUD_NAME + product.image_url
    : GenericShoeImg;

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg shadow p-4 items-start sm:items-center">
      <Image
        src={imgSrc}
        width={100}
        height={100}
        alt={product.model}
        className="w-24 h-24 rounded-md object-cover flex-shrink-0"
      />

      <div className="flex-grow">
        <div className="text-base font-semibold">{product.model}</div>
        <div className="text-sm text-gray-500">{product.brand}</div>
        <div className="text-sm text-gray-500">Size: {product.size}</div>
        <div className="text-sm mt-1">{conditionLabel(product.condition)}</div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { shoe_id: product.shoe_id, quantity: quantity - 1 },
              })
            }
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold">{quantity}</span>
          <button
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { shoe_id: product.shoe_id, quantity: quantity + 1 },
              })
            }
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="font-bold text-base">₱{product.price * quantity}</div>

        <button
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: { shoe_id: product.shoe_id },
            })
          }
          className="text-red-500 hover:text-red-700 text-sm font-medium"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { items } = state;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-2xl font-semibold text-gray-600">
          Your cart is empty
        </div>
        <Link
          href="/"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items list */}
        <div className="flex flex-col gap-4 flex-grow">
          {items.map((item) => (
            <CartItemRow key={item.product.shoe_id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit lg:min-w-[260px]">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between font-bold text-base border-t pt-3 mt-3">
            <span>Subtotal</span>
            <span>₱{subtotal}</span>
          </div>

          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="mt-4 w-full py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Clear Cart
          </button>

          <button
            onClick={() => alert("Feature coming soon!")}
            className="mt-3 w-full py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
