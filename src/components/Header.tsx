// src/components/Header.tsx

import React from "react";
import SearchAppBar from "./TestSearch";
import Image from "next/image";
import ShoePlugLogo from "../../public/logo.jpg";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row h-20 justify-between items-center bg-black text-white sticky top-0 z-10">
      <div className="logo ml-5">
        <a href={"/"}>
          <Image
            src={ShoePlugLogo}
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
    </header>
  );
};

export default Header;
