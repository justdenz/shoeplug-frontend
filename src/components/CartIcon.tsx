"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { state } = useCart();
  const router = useRouter();
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={() => router.push("/cart")}
      className="relative flex items-center justify-center p-1 text-white"
      aria-label="View cart"
    >
      <ShoppingCart size={26} />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
