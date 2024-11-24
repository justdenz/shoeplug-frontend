// src/components/Header.tsx

import React from "react";
import { CldImage } from "next-cloudinary";
import FormText from "./FormText";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-3 bg-black text-white fixed top-0 w-full">
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
          className="absolute left-0 right-0 top-2 m-auto rounded-full"
        />
      </div>
      <div className="w-1/5">
        <FormText />
      </div>
    </header>
  );
};

export default Header;
