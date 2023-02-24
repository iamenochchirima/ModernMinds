import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Modern Minds",
  content: "the modern minds",
};

export default Layout;
