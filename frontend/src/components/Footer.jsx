import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import {
  setOpenLoginViewState,
  setOpenRegisterViewState,
} from "@/redux/slices/authSlice";

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-black mt-10 text-white">
      <div className="px-3 ss:px-10 ">
        <div className="grid grid-cols-5 md:mx-20 gap-2">
          <div className="col-span-5 md:col-span-3 mt-10">
            <Link href="/">
              <div className="flex items-center  gap-2 font-product">
                <div className={`w-[40px] h-[40px] duration-500 relative`}>
                  <Image
                    src={"/logo.png"}
                    style={{
                      objectFit: "cover",
                    }}
                    fill
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    alt="Mordern minds logo"
                  />
                </div>
                <div className=" flex-col hidden xs:flex">
                  <h1 className={`font-extrabold text-lg `}>MODERNMINDS</h1>
                  <h1 className={` text-base tracking-widest`}>MAGAZINE</h1>
                </div>
              </div>
            </Link>
            <ul className="flex gap-5 text-xl pt-5">
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
            <p className="pt-5">
              <span className="text-sm text-dimWhite">
                © 2023 ®MMM Publishers. All Rights Reserved
              </span>
            </p>
            <p className="pt-2 pb-5">
              <span className="text-xs text-dimWhite">
                <Link
                  href="https://www.enochchirima.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Web design and development by{" "}
                  <span className="text-white">Enoch</span>
                </Link>
              </span>
            </p>
          </div>
          <div className="col-span-5 md:col-span-2 md:mt-10 mb-5">
            <div className="grid grid-cols-2 gap-2 ">
              <div className="col-span-2 md:col-span-2 text text-dimWhite">
                <ul className="flex flex-col gap-1">
                  <li>
                    <button onClick={() => dispatch(setOpenLoginViewState())}>
                      Signin
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(setOpenRegisterViewState())}
                    >
                      Register
                    </button>
                  </li>
                  <li><Link href="/about">About us</Link></li>
                  <li><Link href="/contact">Contact us</Link></li>
                  <li><Link href="/policy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms and Conditons</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
