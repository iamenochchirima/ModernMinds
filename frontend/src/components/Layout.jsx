import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ title, content, children }) => {
  return (
    <div className="flex justify-center items-start">
    <div className=" xl:max-w-[1500px] w-full ">
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Modern Minds Magazine",
  content: "the modern minds",
};

export default Layout;
