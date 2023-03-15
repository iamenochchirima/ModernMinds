import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/generalApi";
import Link from "next/link";

const Articles = () => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery();
  
  const articles = data

  let content;

  if (isLoading) {
    content = (
      <div className="font-kinfolk">
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
      <div className="font-cormorant">
        <p>Something went wrong</p>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="font-cormorant">
        {articles?.map((article) => {
          return (
            <div key={article.id} className="">
              <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
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
