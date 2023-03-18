import {
  useGetArticlesQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Image from "next/image";
import Link from "next/link";

const LatestArticles = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetArticlesQuery();
  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
    <h1 className="text-center p-10 text-4xl font-bold">LATEST STORIES</h1>
      <div className="mx-10 grid grid-cols-4 gap-5">
        {data?.map((article) => (
          <div key={article.id} className="col-span-4 ss:col-span-2 md:col-span-1 hover:scale-105 duration-300">
            <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
              <div className="">
                <div
                  className=" bg-yellow-400 relative"
                  // style={{ height: "300px", width: "300px" }}
                >
                  {article?.cover_image && (
                    <img
                      src={article?.cover_image}
                      className='w-full h-[250px] object-cover'
                      alt="Article cover image"
                    />
                  )}
                </div>
                <div className="">
                  <h3><span className="text-gray-500 text-xs tracking-widest">{article.issue}</span></h3>
                  <h1 className="hover:underline font-bold">{article.title}</h1>
                  {categories?.map((category) => (
                    <>
                      {category.id === article.category && (
                        <span
                          key={category.id}
                          className="  text-xs border-b border-yellow-400 hover:border-black tracking-widest"
                        >
                          {category.name}
                        </span>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestArticles;
