"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import GenericShoeImg from "@public/generic_shoe.png";

const CLOUDINARY_IMAGE_URL = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

export default function CartPage() {
    const { state, dispatch } = useCart();
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
    );

    if (state.items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-600">Your cart is empty</h1>
                <Link
                    href="/"
                    className="rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
                >
                    Back to shop
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your cart</h1>
                <Link href="/" className="font-semibold hover:underline">
                    Back to shop
                </Link>
            </div>

            <div className="flex flex-col gap-6 rounded-lg bg-white p-6 shadow">
                <div className="flex flex-col gap-4">
                    {state.items.map(({ product, quantity }) => (
                        <div
                            key={product.shoe_id}
                            className="flex items-center justify-between gap-4 border-b border-gray-200 py-4 last:border-b-0"
                        >
                            <div className="flex gap-4">
                                <Image
                                    src={product.shoe_id ? CLOUDINARY_IMAGE_URL + product.shoe_id : GenericShoeImg}
                                    width={96}
                                    height={96}
                                    alt={product.model}
                                    className="h-24 w-24 shrink-0 rounded-md object-cover"
                                />
                                <div className="flex flex-col gap-2 min-w-0">
                                    <div className="truncate font-semibold">{product.model}</div>
                                    <div className="text-sm text-gray-500">
                                        {product.brand} · Size {product.size}
                                    </div>
                                    <div className="font-semibold">₱{product.price * quantity}</div>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                {/* <button
                                    type="button"
                                    aria-label={`Decrease quantity of ${product.model}`}
                                    onClick={() =>
                                        dispatch({
                                            type: "UPDATE_QUANTITY",
                                            payload: { shoe_id: product.shoe_id, quantity: quantity - 1 },
                                        })
                                    }
                                    className="h-8 w-8 rounded-full border border-gray-300 text-lg hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="w-6 text-center font-semibold">{quantity}</span>
                                <button
                                    type="button"
                                    aria-label={`Increase quantity of ${product.model}`}
                                    onClick={() =>
                                        dispatch({
                                            type: "UPDATE_QUANTITY",
                                            payload: { shoe_id: product.shoe_id, quantity: quantity + 1 },
                                        })
                                    }
                                    className="h-8 w-8 rounded-full border border-gray-300 text-lg hover:bg-gray-100"
                                >
                                    +
                                </button> */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: { shoe_id: product.shoe_id },
                                        })
                                    }
                                    className="ml-2 text-sm font-medium text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="h-fit border-t border-gray-200 pt-6">
                    <div className="flex justify-between font-bold">
                        <span>Subtotal</span>
                        <span>₱{subtotal}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => dispatch({ type: "CLEAR_CART" })}
                        className="mt-4 w-full rounded-md border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                        Clear cart
                    </button>
                </aside>
            </div>
        </div>
    );
}
