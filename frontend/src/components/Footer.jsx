import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black mt-10 text-white">
      <div className="px-3 ss:px-10">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3 md:col-span-1 mt-10">
            <Link href="/">
              <div className="flex items-center  gap-2 font-product">
                <img
                  className={`w-[40px] h-[40px] duration-500`}
                  src={"/logo.png"}
                  alt="Mordern minds logo"
                />
                <div className=" flex-col hidden xs:flex">
                  <h1 className={`font-extrabold text-lg `}>MODERNMINDS</h1>
                  <h1 className={` text-base tracking-widest`}>MAGAZINE</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-span-3 md:col-span-2 mt-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 md:col-span-1 flex md:justify-center">
                <ul>
                  <li>About Us</li>
                  <li>Subscribe</li>
                  <li>Register</li>
                </ul>
              </div>
              {/* <div className="col-span-3 md:col-span-1 h-[100px] bg-yellow-400"></div> */}
              <div className="col-span-2 md:col-span-1 md:text-center mt-10 md:mt-0">
                <h1 className="font-bold">FOLLOW US</h1>
                <ul className="flex md:justify-center gap-2 text-2xl pt-5">
                  <li>
                    <BsTwitter />
                  </li>
                  <li>
                    <BsInstagram />
                  </li>
                  <li>
                    <BsFacebook />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-5 text-center pb-5">
              <span className="text-sm text-dimWhite">
                Copyright © 2023 ®MMM Publishers All Rights Reserved
              </span>
            </p>
      </div>
    </div>
  );
};

export default Footer;
