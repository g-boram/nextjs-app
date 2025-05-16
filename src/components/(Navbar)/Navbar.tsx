"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { RxDividerVertical } from "react-icons/rx";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";

const userMenus = [
  { id: 1, title: "로그인", url: "/users/login" },
  { id: 2, title: "회원가입", url: "/users/signup" },
  { id: 3, title: "FAQ", url: "/users/faqs" },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const router = useRouter();

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className={"relative z-10 w-full shadow-sm text-white bg-black ${menu && pb-5}"}>
      <div className="{flex items-center justify-between mx-5 sm:mx-10 lg:mx-20 sm:gap-4 pt-1}">
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
          <NavItem />
        </div>
      </div>

      {/* nav-item mobile */}
      <div
        className={`block sm:hidden transition-all duration-300 ease-in-out ${
          menu ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {menu === false ? null : <NavItem mobile />}
      </div>

      {/* search Box Row */}
      <div className="flex justify-center items-center w-full mh-20 p-5 flex-wrap gap-3">
        {/* Search */}
        <div className="flex justify-between w-full sm:w-[300px] border border-gray-200 rounded-full py-2 px-4">
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
        {/* user Btn */}
        <div className="flex gap-4 my-auto relative">
          <button type="button" className="font-semibold text-sm my-auto px-4 py-3 rounded-full ">
            당신의 공간을 등록해주세요
          </button>
          <button
            type="button"
            onClick={() => setShowUserMenu((val) => !val)}
            className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto cursor-pointer"
          >
            <AiOutlineMenu />
            <AiOutlineUser />
          </button>
          {showUserMenu && (
            <div
              className={`absolute top-13 bg-white w-70 rounded-lg border border-gray-200 shadow-lg py-2 flex flex-col transition-all duration-300 ease-in-out ${
                showUserMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {userMenus?.map((menu) => (
                <button
                  type="button"
                  key={menu.id}
                  className="h-10 hover:bg-gray-50 text-sm text-gray-700 pl-3 text-center cursor-pointer"
                  onClick={() => router.push(menu.url)}
                >
                  {menu.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
