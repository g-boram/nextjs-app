import React from "react";
import HotelNavbar from "./components/navbar/HotelNavbar";
import Footer from "./components/Footer";

const HotelPage = () => {
  return (
    <div>
      <HotelNavbar />
      <Layout>Content</Layout>
      <Footer />
    </div>
  );
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-10 p-20 min-h-[60vh]">{children}</div>;
};

export default HotelPage;
