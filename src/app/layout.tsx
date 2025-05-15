"use client";

import "./globals.css";
import Navbar from "@/components/(Navbar)/Navbar";
import { SessionProvider } from "next-auth/react";

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
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
