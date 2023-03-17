import React from "react";
import { useSelector } from "react-redux";
import {
  useGetArticlesQuery,
  useGetSpecialArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

const Articles = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetArticlesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const {
    data: specialData,
    isLoading: specialLoading,
    isSuccess: specialSuccess,
    isError: specialError,
  } = useGetSpecialArticlesQuery();

  const articles = data;
  return (
    <div className="mx-10 grid grid-cols-4 gap-5">
      {specialData?.map((special_atricle) => {
        console.log(special_atricle);
        return (
          <>
            {special_atricle?.top_story && (
              <div
                key={special_atricle.id}
                style={{
                  backgroundImage: `url(${special_atricle?.cover_image})`,
                }}
                className="col-span-4 sm:col-span-3 relative bg-cover bg-center text-white"
              >
                <div>
                  <Link
                    href={`/specialArticles/${encodeURIComponent(
                      special_atricle.slug
                    )}/`}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-80 "></div>
                    <div className="relative z-10">
                      <div className="mt-72 px-5 pb-20">
                        <span className=" font-bold bg-yellow-700 text-white px-2 py-1">
                          TOP STORY
                        </span>
                        <h1 className="text-5xl font-medium font-tiempos pt-5">
                          {special_atricle.title}
                        </h1>
                        {categories?.map((category) => (
                          <>
                            {category.id === special_atricle.id && (
                              <span className="pt-3 text-dimWhite text-xs hover:underline tracking-widest">
                                {category.name}
                              </span>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </>
        );
      })}
      <div className="col-span-4 sm:col-span-1 ">
        <div className="pt-5 pb-2">
          <span className="font-bold">EDITOR'S NOTE</span>
        </div>
        {isSuccess && (
          <div className="py-1">
            {specialData?.map((article) => {
              console.log(article);
              return (
                <div key={article.id} className="">
                  <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
                    <div className="flex items-center space-y-3">
                      <div className="w-2/3">
                        <h1>{article.title}</h1>
                      </div>
                      <div className="w-1/3 bg-yellow-400 relative" style={{ height: "100px", width: "100px" }}>
                        {article?.cover_image && (
                          <Image
                          
                            src={article?.cover_image}
                            // height={"500"}
                            // width={"500"}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            fill
              
                            alt="Article cover image"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {isError && (
          <div className="font-graphik flex justify-center items-center h-screen">
            <h1 class="text-center">Something went wrong</h1>
          </div>
        )}
        {isLoading && (
          <div className=" flex justify-center items-center h-screen">
            <div class="text-center">
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="#333333"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
