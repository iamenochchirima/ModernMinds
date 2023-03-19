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
                    <Link
                      href={`/specialArticles/${encodeURIComponent(
                        article.slug
                      )}/`}
                    >
                      <div className="flex items-center space-y-3">
                        <div className="w-2/3">
                          {categories?.map((category) => (
                            <>
                              {category.id === article.category && (
                                <span key={category.id} className="  text-xs border-b border-yellow-400 hover:border-black tracking-widest">
                                  {category.name}
                                </span>
                              )}
                            </>
                          ))}
                          <h1 className="hover:underline font-bold">{article.title}</h1>
                        </div>
                        <div
                          className="w-1/3 pick-div bg-yellow-400 relative"
                        >
                          {article?.cover_image && (
                            <Image
                              src={article?.cover_image}
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
