// src/components/Header.tsx

import React from "react";
import { CldImage } from "next-cloudinary";

interface HeaderProps {
  links: Array<{ name: string; url: string }>;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-blue text-white">
      <div className="logo">
        <CldImage
          src={"logo_ldetnd"}
          alt="Logo"
          width={40}
          height={40}
          className="h-10 rounded-full"
        />
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li key={"home"}>
            <a href={"/"} className="hover:underline">
              Home
            </a>
          </li>
          <li key={"product"}>
            <a href={"/product"} className="hover:underline">
              Products
            </a>
          </li>
          <li key={"about"}>
            <a href={"/"} className="hover:underline">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
