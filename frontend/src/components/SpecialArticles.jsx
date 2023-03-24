import {
  useGetSpecialArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Link from "next/link";
import TodaysPick from "./TodaysPick";
import { ThreeDots } from "react-loader-spinner";

const SpecialArticles = () => {
  const { data: categories } = useGetCategoriesQuery();
  const {
    data: specialData,
    isLoading: specialLoading,
    isSuccess: specialSuccess,
    isError: specialError,
  } = useGetSpecialArticlesQuery();

  return (
    <div className="px-3 ss:px-10  mt-24 grid grid-cols-4 gap-5">
      {specialSuccess && (
        <>
          {specialData.map((article) => {
            if (article?.top_story) {
              return (
                <div
                  key={article.id}
                  style={{
                    backgroundImage: `url(${article?.cover_image})`,
                  }}
                  className="col-span-4 sm:col-span-2 md:col-span-3 relative bg-cover bg-center text-white "
                >
                  <div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-80 "></div>
                    <div className="relative w-full h-[600px] z-5">
                      <div className="absolute bottom-0 pb-10 px-5">
                        <Link
                          className=""
                          href={`/Articles/${encodeURIComponent(
                            article.slug
                          )}/`}
                        >
                          <span className=" font-bold bg-yellow-700 text-white px-2 py-1">
                            TOP STORY
                          </span>
                          <h1 className="md:text-4xl text-3xl font-bold pt-5">
                            {article.title}
                          </h1>
                        </Link>
                        {categories?.map((category) => {
                          if (category.id === article.category) {
                            return (
                              <Link
                                key={category.id}
                                href={`/category/${encodeURIComponent(
                                  category.slug
                                )}/`}
                              >
                                <span className="text-xs border-b border-yellow-400 hover:border-black tracking-widest">
                                  {category.name}
                                </span>
                              </Link>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </>
      )}
      {specialError && (
        <div className="font-graphik flex justify-center col-span-4 sm:col-span-2 md:col-span-3 items-center h-screen">
          <h1 className="text-center">Something went wrong</h1>
        </div>
      )}
      {specialLoading && (
        <div className="font-graphik flex justify-center col-span-4 sm:col-span-2 md:col-span-3 items-center h-screen">
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

      <div className="col-span-4 sm:col-span-2 md:col-span-1 ">
        <div className="py-1">
          {specialData?.map((article) => {
            if (article?.editor_note) {
              return (
                <div
                  key={article.id}
                  style={{ backgroundImage: `url(${article.cover_image})` }}
                  className="relative bg-cover bg-center text-white hover:scale-105 duration-300"
                >
                  <Link
                    href={`/specialArticles/${encodeURIComponent(
                      article.slug
                    )}/`}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-70 "></div>
                    <div className="md:pt-20 pt-52 relative z-5 px-5">
                      <div className="pt-5">
                        <h1 className=" text-center font-extrabold text-lg">
                          EDITOR&apos;S NOTE
                        </h1>
                      </div>
                      <h1 className="py-2 ">{article.title}</h1>
                    </div>
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
        <TodaysPick />
      </div>
    </div>
  );
};

export default SpecialArticles;
