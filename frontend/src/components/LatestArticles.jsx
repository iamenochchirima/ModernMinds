import { useState } from "react";
import {
  useGetArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Link from "next/link";

const LatestArticles = () => {
  const [page, setPage] = useState(1);
  const { data, isSuccess, isFetching, hasNextPage } =
    useGetArticlesQuery(page);
  const { data: categories } = useGetCategoriesQuery();

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <h1 className="text-center p-10 text-3xl font-bold">LATEST STORIES</h1>
      <div className="px-3 ss:px-10 grid grid-cols-6 gap-5">
        {data?.results.map((article) => (
          <div
            key={article.id}
            className="col-span-6 ss:col-span-2 md:col-span-2 hover:scale-105 duration-300 fade-in-fwd"
          >
            <div className="">
              <Link
                className="relative"
                href={`/Articles/${encodeURIComponent(article.slug)}/`}
              >
                {article?.cover_image && (
                  <img
                    src={article?.cover_image}
                    className="w-full h-[250px] object-cover  hover:scale-105 duration-300"
                    alt="Article cover image"
                  />
                )}
              </Link>
              <div className="">
                <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
                  <h3>
                    <span className="text-gray-500 text-xs tracking-widest">
                      {article.issue}
                    </span>
                  </h3>
                  <h1 className="hover:underline font-bold">{article.title}</h1>
                </Link>
                {categories?.map((category) => (
                  <>
                    {category.id === article.category && (
                      <Link
                        href={`/category/${encodeURIComponent(category.slug)}/`}
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
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5 flex gap-4 justify-center">
      {data?.previous ? (
        <button className=" border-b-2 border-black" onClick={handlePrevious}>Previous</button>
      ) : null}
      {data?.next ? <button className="border-b-2 border-black" onClick={handleLoadMore}>Load More</button> : null}  
      </div>
    </>
  );
};

export default LatestArticles;
