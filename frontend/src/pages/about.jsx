import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <Layout>
      <div className="relative h-[450px]  mx-10">
        <div className="absolute w-full h-[450px] flex flex-col bg-black bg-opacity-40 z-10 justify-center">
          <h1 className="text-center text-white font-graphikSemiBold  text-5xl xs:text-6xl">
            About Us
          </h1>
        </div>
        <div className=" h-[450px] w-full">
          <Image
            src="/about.png"
            style={{
              objectFit: "cover",
            }}
            sizes="100vw"
            fill
            alt="About page image"
          />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center">
        <div className="md:w-3/4 mx-5">
          <div className="text-gray-800 text-lg">
            <span className="font-graphikSemiBold text-xl">
              {" "}
              ModernMinds Magazine{" "}
            </span>{" "}
            is a digital Zimbabwean pan-African knowledge transfer platform,
            forum of authentic thought provoking up to date relevant information
            and a movement of mission critical youths and professionals. We are
            a global destination filled with inspiring stories and practical
            ideas of impeccable positive modernity that also helps tide over
            society&apos;s under-privileged groups. The team leverage on technology
            to use storytelling as a tool, methodology and technique for global
            transformation and change. Our thrust is mainly on relevance,
            disruptive critical thinking and creativity in different spaces:
            Business Innovations, Motivation and Leadership, Beauty, Health and
            Fashion, Arts and Lifestyle, Science and Tech; unraveling limitless
            possibilities.
            <h1 className="font-graphikSemiBold py-5 text-2xl">Vision:</h1>
            <p>
              To be a leading multi-disciplinary magazine in Africa and the
              global economy.
            </p>
            <h1 className="font-graphikSemiBold py-5 text-2xl">Mission:</h1>
            <p>
              We exist to be an authentic source of relevant African and
              international stories, insights and models that are practically
              applicable in all modern communities.
            </p>
            <h1 className="font-graphikSemiBold py-5 text-2xl ">
              Core Values:
            </h1>
            <ul className="list-disc px-10">
              <li> Professionalism</li>
              <li> Integrity</li>
              <li> Evenhandedness</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
