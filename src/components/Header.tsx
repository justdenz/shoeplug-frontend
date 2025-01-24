// src/components/Header.tsx

import React from "react";
import { CldImage } from "next-cloudinary";
import SearchAppBar from "./TestSearch";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row h-20 justify-between items-center bg-black text-white sticky top-0 z-10">
      <div className="logo ml-5">
        <a href={"/"}>
          <CldImage
            src={"logo_imt5hn"}
            alt="Logo"
            width={70}
            height={60}
            className="absolute top-2 m-auto rounded-full"
          />
        </a>
      </div>
      <div className="w-32 md:w-auto mr-5">
        <SearchAppBar />
      </div>

      {/* <nav>
        <ul className="mt-2 flex space-x-5 text-xl">
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
      </nav> */}
    </header>
  );
};

export default Header;
