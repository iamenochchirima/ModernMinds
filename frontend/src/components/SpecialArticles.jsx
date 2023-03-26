import {
  useGetSpecialArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Link from "next/link";
import TodaysPick from "./TodaysPick";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

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
                  className="col-span-4 sm:col-span-2 md:col-span-3 relative text-white "
                >
                  <div className="relative w-full h-[600px]">
                    <div className="absolute w-full h-full flex flex-col px-5 justify-end max-h-[600px] bg-black bg-opacity-30 z-10">
                      <Link
                        className=""
                        href={`/Articles/${encodeURIComponent(article.slug)}/`}
                      >
                        <span className=" font-bold bg-yellow-700 text-white px-2 py-1">
                          TOP STORY
                        </span>
                        <h1 className="md:text-5xl text-3xl font-bold pt-5">
                          {article.title}
                        </h1>
                      </Link>
                      {categories?.map((category) => {
                        if (category.id === article.category) {
                          return (
                            <Link
                              className="mb-10"
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
                    <div className="relative w-full h-[600px]">
                      <Image
                        className="absolute"
                        src={article?.cover_image}
                        style={{
                          objectFit: "cover",
                        }}
                        fill
                        sizes="100vw"
                        alt="Article cover image"
                      />
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
        <div className="">
          {specialData?.map((article) => {
            if (article?.editor_note) {
              return (
                <div
                  key={article.id}
                  className="relative text-white hover:scale-105 duration-300 h-[250px]"
                >
                  <div className="">
                    <Link
                      href={`/Articles/${encodeURIComponent(article.slug)}/`}
                    >
                      <div className=" relative w-full h-[250px] z-10 px-3 bg-black bg-opacity-30 flex flex-col justify-end">
                        <div className="pt-5">
                          <h1 className="font-extrabold text-lg">
                            EDITOR&apos;S NOTE
                          </h1>
                        </div>
                        <h1 className="py-2 font-medium">{article.title}</h1>
                      </div>
                    </Link>
                    <div className=" w-full h-full">
                      <Image
                        src={article?.cover_image}
                        style={{
                          objectFit: "cover",
                        }}
                        fill
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                        alt="Article cover image"
                      />
                    </div>
                  </div>
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
