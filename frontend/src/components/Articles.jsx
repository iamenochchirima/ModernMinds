import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/generalApi";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

const Articles = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetArticlesQuery();

  const articles = data;

  let content;

  if (isLoading) {
    content = (
      <div className="font-kinfolk flex justify-center items-center h-screen">
        <div class="text-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#333333"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    );
  } else if (articles?.length === 0) {
    content = (
      <div className="font-kinfolk flex justify-center items-center h-screen">
        <h1 class="text-center">Can not find any articles, sorry</h1>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="font-graphik flex justify-center items-center h-screen">
        <h1 class="text-center">Something went wrong</h1>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="font-graphik">
        {articles?.map((article) => {
          console.log(article)
          return (
            <div key={article.id} className="">
              <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
                <Image src={article?.cover_image} height={'500'} width={'500'}/>
                <p>{article.author}</p>
                <h1>{article.title}</h1>
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
