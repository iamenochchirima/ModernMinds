import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/articleApi";

const Articles = () => {
  const { data: articles } = useGetArticlesQuery();
  return (
    <div className="font-poppins">
        <h1>HI</h1>
      {articles?.map((article) => {
        return (
          <div key={article.id} className="">
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.content }} safe="true" />
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
