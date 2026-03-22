"use client";

import React, { Suspense } from "react";
import SearchAppBar from "./Search";
import Image from "next/image";
import Link from "next/link";
import ShoePlugLogo from "../../public/logo.jpg";
import CartIcon from "./CartIcon";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row h-20 justify-between items-center bg-black text-white sticky top-0 z-10">
      <div className="logo ml-5">
        <Link href="/">
          <Image
            src={ShoePlugLogo}
            alt="Logo"
            width={70}
            height={60}
            className="absolute top-2 m-auto rounded-full"
          />
        </Link>
      </div>
      <div className="w-32 md:w-auto mr-5 flex items-center gap-3">
        <Suspense fallback={null}>
          <SearchAppBar />
        </Suspense>
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;
