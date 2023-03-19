import React from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  useGetSpecialArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Image from "next/image";
import Link from "next/link";

const TodaysPick = () => {
  const { data: categories } = useGetCategoriesQuery();

  const {
    data: specialData,
    isLoading: specialLoading,
    isSuccess: specialSuccess,
    isError: specialError,
  } = useGetSpecialArticlesQuery();

  return (
    <div className="">
      <div className="pt-5">
        <span className="font- font-bold text-2xl">TODAY'S PICK</span>
      </div>
      {specialSuccess && (
        <div className="py-1">
          {specialData?.map((article) => {
            return (
              <>
                {article?.todays_pick && !article.archive && (
                  <div key={article.id} className="">
                    <div className="flex items-center space-y-3">
                      <div className="w-2/3">
                        {categories?.map((category) => (
                          <>
                            {category.id === article.category && (
                              <Link
                                href={`/category/${encodeURIComponent(
                                  category.slug
                                )}/`}
                              >
                                <span
                                  key={category.id}
                                  className="  text-xs border-b border-yellow-400 hover:border-black tracking-widest"
                                >
                                  {category.name}
                                </span>
                              </Link>
                            )}
                          </>
                        ))}
                        <Link
                          href={`/specialArticles/${encodeURIComponent(
                            article.slug
                          )}/`}
                        >
                          <h1 className="hover:underline font-bold">
                            {article.title}
                          </h1>
                        </Link>
                      </div>
                        <div className="w-1/3 relative">
                          {article?.cover_image && (
                            <img
                              src={article?.cover_image}
                              className="w-full h-[100px] object-cover"
                              alt="Article cover image"
                            />
                          )}
                        </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      )}
      {specialError && (
        <div className="font-graphik flex justify-center items-center h-screen">
          <h1 className="text-center">Something went wrong</h1>
        </div>
      )}
      {specialLoading && (
        <div className=" flex justify-center items-center h-screen">
          <div className="text-center">
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
  );
};

export default TodaysPick;
