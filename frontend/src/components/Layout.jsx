import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const Layout = ({ title, content, children }) => {
  return (
    <div className="flex justify-center items-start">
      <div className=" xl:max-w-[1500px] w-full ">
        <Head>
          <title>{title}</title>
        </Head>
        <Navbar />
        <CookieConsent
          style={{
            textAlign: "start",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
          }}
          buttonStyle={{ background: "#3B82F6", color: "white" }}
          buttonText="Okay"
          expires={150}
        >
          Welcome to Moder Minds Magazine website! We use third-party analytics
          technologies and cookies to to help enhance the user experience. By
          continuing to use our website, you consent to the use of these
          technologies. To learn more please read our{" "}
          <Link className="underline" href="/policy">
          privacy policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline">
            terms of use
          </Link>
        </CookieConsent>
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
