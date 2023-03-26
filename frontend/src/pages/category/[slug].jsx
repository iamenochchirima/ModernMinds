import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetCategoryArticlesQuery } from "@/redux/api/generalApi";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useGetCategoriesQuery } from "@/redux/api/generalApi";
import Image from "next/image";

const Category = () => {
  const router = useRouter();
  const { slug } = router.query || {};

  const [page, setPage] = useState(1);

  const [articles, setArticles] = useState([]);

  const { data: categories } = useGetCategoriesQuery();

  const [background, setBackground] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setArticles([]);
  }, [slug]);

  useEffect(() => {
    const matchingCategory = categories?.find(
      (category) => category.slug === slug
    );

    if (matchingCategory) {
      setBackground(matchingCategory.cover_image);
      setName(matchingCategory.name);
    }
  }, [categories, slug]);

  const [getArticles, { data, isSuccess, isFetching, isError }] =
    useLazyGetCategoryArticlesQuery();

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (data) {
      setArticles((prevArticles) => [...prevArticles, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (slug) {
      getArticles({ slug, page });
    }
  }, [slug, page, getArticles]);

  return (
    <Layout>
      <div className="">
        <div className="relative h-[550px] w-full">
          <div className="absolute w-full h-[550px] flex flex-col bg-black bg-opacity-20 z-10 justify-center">
            <h1 className="text-center text-white font-medium  text-7xl">
              {name}
            </h1>
          </div>
          <div className=" h-[550px] w-full">
            {background ? (
              <Image
                src={background}
                style={{
                  objectFit: "cover",
                }}
                fill
              />
            ) : null}
          </div>
        </div>
        <div className="px-3 ss:px-10 grid grid-cols-6 gap-10 mt-20">
          {articles?.map((article) => (
            <div
              key={article.id}
              className="col-span-6 ss:col-span-2 md:col-span-2  fade-in-fwd"
            >
              <div className="">
                <Link
                  className="relative"
                  href={`/Articles/${encodeURIComponent(article.slug)}/`}
                >
                  <div className="w-full h-[250px] hover:scale-105 duration-300">
                    <Image
                      src={article?.cover_image}
                      style={{
                        objectFit: "cover",
                      }}
                      fill
                      alt="Article cover image"
                    />
                  </div>
                </Link>
                <div className="">
                  <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
                    <h3>
                      <span className="text-gray-500 text-xs tracking-widest">
                        {article.issue}
                      </span>
                    </h3>
                    <h1 className="hover:underline font-bold">
                      {article.title}
                    </h1>
                  </Link>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-5 flex gap-4 justify-center">
        {data?.next ? (
          <button className="border-b-2 border-black" onClick={handleLoadMore}>
            Load More
          </button>
        ) : null}
      </div>
    </Layout>
  );
};

export default Category;
