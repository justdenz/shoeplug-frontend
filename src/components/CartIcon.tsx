import React from "react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";

const CartIcon: React.FC = () => {
  const { state } = useCart();
  const router = useRouter();

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative flex items-center justify-center text-white p-1"
      aria-label="View cart"
    >
      <ShoppingCart size={26} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
