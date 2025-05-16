"use client";

import Link from "next/link";
import React from "react";

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const navItemStyle = `py-2 text-center border-b-4 cursor-pointer`;

  return (
    <ul
      className={`
      text-md
      justify-center
      flex
      w-full
      gap-5
      ${mobile && "flex-col h-full "}
      items-center
    `}
    >
      <li className={navItemStyle}>
        <Link href={"/admin"}>Admin</Link>
      </li>
      <li className={navItemStyle}>
        <Link href={"/user"}>User</Link>
      </li>
    </ul>
  );
};

export default NavItem;
