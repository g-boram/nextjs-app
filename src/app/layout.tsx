"use client";

import "./globals.css";
import Navbar from "@/components/(Navbar)/Navbar";
import { SessionProvider } from "next-auth/react";
import { NextLayout } from "./nextLayout";
import Footer from "@/components/(Layout)/(Footer)/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <NextLayout>{children}</NextLayout>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
