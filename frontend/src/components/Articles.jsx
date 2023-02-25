import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/articleApi";
import Link from "next/link";

const Articles = () => {
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery();

  let content;

  if (isLoading) {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (articles?.length === 0) {
    content = (
      <div>
        <center>
          <p>Can not find any articles, sorry</p>
        </center>
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <p>Something went wrong</p>
      </div>
    );
    console.log(error);
  } else if (isSuccess) {
    content = (
      <div className="font-poppins">
        {articles?.map((article) => {
          return (
            <div key={article.id} className="">
              <Link href={`/Articles/${encodeURIComponent(article.id)}/`}>
                <h1>{article.title}</h1>
                <p>{article.author}</p>
                <br />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return content;
};

export default Articles;