"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IShoe } from "@/models/Product";
import { IG_URL } from "@/models/resource";
import GenericShoeImg from "../../public/generic_shoe.png";

const CLOUDINARY_CLOUD_NAME = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

interface ProductDetailProps {
  product: IShoe;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const link = product.shoe_id
    ? CLOUDINARY_CLOUD_NAME + product.shoe_id
    : GenericShoeImg;

  
    const [imgSrc, setImgSrc] = useState(link);

  const isSold = product.status?.toUpperCase() === "SOLD";

  const conditionLabel =
    product.condition === "NEW" ? "Brand New" : product.condition === "USED" ? product.description : "N/A";

  const conditionColor =
    product.condition === "NEW" ? "text-green-600" : "text-yellow-600";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link href="/" className="text-sm text-gray-500 hover:text-black mb-6 inline-block">
        ← Back to listings
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src={imgSrc}
            width={480}
            height={560}
            alt={product.model}
            className="rounded-xl object-cover w-full md:w-[480px] h-[560px]"
            onError={() => {
              setImgSrc(GenericShoeImg.src);
            }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-start gap-4 flex-1">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            {product.brand}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {product.model}
          </h1>

          <p className="text-2xl font-semibold text-black">
            ₱{Number(product.price).toLocaleString()}
          </p>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Size</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full font-medium text-gray-800">
              {product.size}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Condition</span>
            <span className={`font-medium ${conditionColor}`}>
              {conditionLabel}
            </span>
          </div>

          {/* CTA */}
          {isSold ? (
            <div className="mt-4 px-6 py-3 bg-gray-200 text-gray-500 text-center rounded-lg font-semibold cursor-not-allowed">
              Sold
            </div>
          ) : (
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-center rounded-lg font-semibold hover:brightness-110 transition"
            >
              Inquire on Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
