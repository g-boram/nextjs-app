"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { RxDividerVertical } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className={`relative z-10 w-full shadow-sm text-white bg-black ${menu && "pb-5"} `}>
      <div className={`flex items-center justify-between mx-5 sm:mx-10 lg:mx-20 sm:gap-4`}>
        {/* logo */}
        <div className={`hidden sm:flex items-center text-2xl h-15`}>
          <Link href={"/"}>Logo</Link>
        </div>

        <div className="flex justify-between w-full sm:w-[300px] border border-gray-200 rounded-full sm:mx-4 md:mx-auto py-2 px-4">
          <div className="flex justify-center gap-1">
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">언제든</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">게스트</div>
          </div>
          <button type="button" className="bg-rose-500 text-white rounded-full w-6 h-6 my-auto">
            <AiOutlineSearch className="text-sm m-auto font-semibold" />
          </button>
        </div>

        {/* menu Button */}
        <div className="text-2xl sm:hidden">
          {menu === false ? <button onClick={handleMenu}>+</button> : <button onClick={handleMenu}>-</button>}
        </div>

        {/* nav-items large screen */}
        <div className="hidden sm:block">
          <NavItem />
        </div>
      </div>

      {/* nav-item mobile */}
      <div className="block sm:hidden">{menu === false ? null : <NavItem mobile />}</div>
    </nav>
  );
};

export default Navbar;
