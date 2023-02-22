import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/articleApi";

const Articles = () => {
  const { data: articles } = useGetArticlesQuery();
  console.log(articles)
  return (
    <div className="font-poppins">
        <h1>HI</h1>
      {/* {articles?.map((article) => {
        return (
          <div className="">
            <h1></h1>
          </div>
        );
      })} */}
    </div>
  );
};

export default Articles;
