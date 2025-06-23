"use client";

import React from "react";
import Header from "@/components/(Header)/Header";
import { RecoilRoot } from "recoil";

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const NextLayout = ({ children }: Props) => {
  return (
    <NextProvider>
      <Header />
      <div className="mt-10 p-10 min-h-[100vh]">{children}</div>
    </NextProvider>
  );
};
