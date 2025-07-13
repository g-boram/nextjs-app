"use client";

import Link from "next/link";
import React, { useState } from "react";
import HeaderItem from "./HeaderItem";

const Header = () => {
  const [menu, setMenu] = useState(false); // admin, user 영역 화면 사이즈에 따른 활성화 여부
  const handleMenu = () => {
    setMenu(!menu);
  };
  return (
    <div>
      <nav className={"relative z-10 w-full shadow-sm text-white bg-black ${menu && pb-5}"}>
        {/* **** Logo & 관리자페이지 행 ***** */}
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20 sm:gap-4 pt-3 pb-5">
          {/* logo */}
          <div className={"sm:flex items-center text-2xl h-10"}>
            <Link href={"/"}>Logo</Link>
          </div>
          {/* small screen menu Button */}
          <div className="text-2xl sm:hidden sm:mx-3 p-1 w-full ">
            {menu === false ? (
              <button className="float-end" onClick={handleMenu}>
                +
              </button>
            ) : (
              <button className="float-end" onClick={handleMenu}>
                -
              </button>
            )}
          </div>
          {/* nav-items large screen */}
          <div className="hidden sm:block">
            <HeaderItem />
          </div>
        </div>
        {/* 작은 사이즈 일때 +/- 로 활성화되는 영역 */}
        <div
          className={`block sm:hidden transition-all duration-300 ease-in-out ${
            menu ? "max-h-100 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {menu === false ? null : <HeaderItem mobile />}
        </div>
      </nav>
    </div>
  );
};

export default Header;
