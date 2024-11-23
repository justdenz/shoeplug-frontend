// src/components/Header.tsx

import React from "react";
import { CldImage } from "next-cloudinary";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-3 bg-black text-white">
      <nav>
        <ul className="mt-2 flex space-x-10 text-xl">
          <li key={"home"}>
            <a href={"/"} className="text-white no-underline hover:underline">
              Home
            </a>
          </li>
          <li key={"product"}>
            <a
              href={"/product"}
              className="text-white no-underline hover:underline"
            >
              Products
            </a>
          </li>
          <li key={"about"}>
            <a href={"/"} className="text-white no-underline hover:underline">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <CldImage
          src={"logo_ldetnd"}
          alt="Logo"
          width={70}
          height={60}
          className="rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
