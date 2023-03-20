import {
  useGetArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Image from "next/image";
import Link from "next/link";

const LatestArticles = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetArticlesQuery();
  const { data: categories } = useGetCategoriesQuery();

  console.log(data)

  return (
    <>
      <h1 className="text-center p-10 text-3xl font-bold">LATEST STORIES</h1>
      <div className="px-3 ss:px-10 grid grid-cols-4 gap-5">
        {data?.results.map((article) => (
          <div
            key={article.id}
            className="col-span-4 ss:col-span-2 md:col-span-1 hover:scale-105 duration-300"
          >
            <div className="">
              <Link
                className="relative"
                href={`/Articles/${encodeURIComponent(article.slug)}/`}
              >
                {article?.cover_image && (
                  <img
                    src={article?.cover_image}
                    className="w-full h-[250px] object-cover rounded-t-md"
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
    </>
  );
};

export default LatestArticles;
