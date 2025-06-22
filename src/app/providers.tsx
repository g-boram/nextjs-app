"use client";

import React from "react";
import Footer from "@/components/(Layout)/(Footer)/Footer";

import { RecoilRoot } from "recoil";
import Header from "@/components/(Header)/Header";

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
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer />
    </NextProvider>
  );
};
