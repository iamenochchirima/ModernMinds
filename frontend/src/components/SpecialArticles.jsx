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
          {specialData.map((special_atricle) => {
            return (
              <>
                {special_atricle?.top_story && (
                  <div
                    key={special_atricle.id}
                    style={{
                      backgroundImage: `url(${special_atricle?.cover_image})`,
                    }}
                    className="col-span-4 sm:col-span-2 md:col-span-3 relative bg-cover bg-center text-white "
                  >
                    <div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-80 "></div>
                      <div className="relative w-full h-[500px] z-5">
                        <div className="absolute bottom-0 pb-10 px-5">
                          <Link
                            className=""
                            href={`/specialArticles/${encodeURIComponent(
                              special_atricle.slug
                            )}/`}
                          >
                            <span className=" font-bold bg-yellow-700 text-white px-2 py-1">
                              TOP STORY
                            </span>
                            <h1 className="text-5xl font-bold pt-5">
                              {special_atricle.title}
                            </h1>
                          </Link>
                          {categories?.map((category) => (
                            <>
                              {category.id === special_atricle.category && (
                                <Link
                                  href={`/category/${encodeURIComponent(
                                    category.slug
                                  )}/`}
                                >
                                  <h1
                                    key={category.id}
                                    className="pt-3 text-dimWhite text-xs mt-5 hover:underline tracking-widest"
                                  >
                                    {category.name}
                                  </h1>
                                </Link>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
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
            return (
              <>
                {article?.editor_note && !article.archive && (
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
                          <span className="border-b  font-bold text-xl">
                            EDITOR'S NOTE
                          </span>
                        </div>
                        <h1 className="py-2 ">{article.title}</h1>
                      </div>
                    </Link>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <TodaysPick />
      </div>
    </div>
  );
};

export default SpecialArticles;
