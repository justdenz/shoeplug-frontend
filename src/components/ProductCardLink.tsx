"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

interface ProductCardLinkProps {
  href: string;
  children: ReactNode;
}

export default function ProductCardLink({ href, children }: ProductCardLinkProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <Link
      href={href}
      onNavigate={() => setIsNavigating(true)}
      aria-busy={isNavigating}
      className="relative block no-underline"
    >
      {children}
      {isNavigating && (
        <span
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70"
        >
          <span
            aria-hidden="true"
            className="h-7 w-7 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"
          />
          <span className="sr-only">Loading product details</span>
        </span>
      )}
    </Link>
  );
}