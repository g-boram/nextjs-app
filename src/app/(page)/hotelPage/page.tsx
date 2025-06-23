import React from "react";
import Footer from "./components/footer/Footer";
import HotelNavbar from "./components/navbar/HotelNavbar";

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
