"use client";
import "tailwindcss";
import "../../globals.css";
import { SessionProvider } from "next-auth/react";
import { NextLayout } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NextLayout>{children}</NextLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
