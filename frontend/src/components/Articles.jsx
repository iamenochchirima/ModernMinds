import React from "react";
import { useSelector } from "react-redux";
import { useGetArticlesQuery } from "@/redux/api/articleApi";

const Articles = () => {
  const { data: articles, isLoading,
    isSuccess,
    isError,
    error, } = useGetArticlesQuery();

    let content;

  if (isLoading) {
    content = (
      <div  >
        <h1>Loading...</h1>
      </div>
    );
  } else if ( articles?.length === 0) {
    content = (
      <div  >
        <center>
          <p>Can not find any articles, sorry</p>
        </center>
      </div>
    );
  } else if (isError) {
    content = <div><p>Something went wrong</p></div>;
    console.log(error)
  } else if (isSuccess) {
    content = (
    <div className="font-poppins">
      <h1>HI</h1>
      {articles?.map((article) => {
        return (
          <div key={article.id} className="">
            <h1>{article.title}</h1>
            <p>{article.author}</p>
            {/* <div className=""
              dangerouslySetInnerHTML={{ __html: article.content }}
              safe="true"
            /> */}
            <br />
          </div>
        );
      })}
    </div>
    )
  }

  return content;
};

export default Articles;
