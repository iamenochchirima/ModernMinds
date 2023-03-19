import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetCategoryArticlesQuery } from "@/redux/api/generalApi";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useGetCategoriesQuery } from "@/redux/api/generalApi";

const url = process.env.NEXT_PUBLIC_API_URL;

const Category = () => {
  const router = useRouter();
  const { slug } = router.query || {};

  const { data: categories } = useGetCategoriesQuery();

  const [background, setBackground] = useState(null);

  useEffect(() => {
    const matchingCategory = categories?.find(
      (category) => category.slug === slug
    );

    if (matchingCategory) {
      setBackground(matchingCategory.cover_image);
    }
  }, [categories, slug]);

  const [getArticles, { data, isSuccess, isFetching, isError }] =
    useLazyGetCategoryArticlesQuery();

  useEffect(() => {
    if (slug) {
      getArticles(slug);
    }
  }, [slug, getArticles]);

  return (
    <Layout>
      <div className="">
        <div
          className="h-[550px] w-full"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute  w-full  h-[550px] bg-black bg-opacity-20 "></div>
          <div className="relative flex flex-col w-full z-5">
              <span className=" font-bold  text-white px-2 py-1">
                TOP STORY
              </span>
          </div>
        </div>
        {data?.map((article) => (
          <div key={article.id} className="">
            <Link href={`/Articles/${encodeURIComponent(article.slug)}/`}>
              <div className="relative">
                {article?.cover_image && (
                  <img
                    src={url + article?.cover_image}
                    className="w-[300] h-[250px] object-cover"
                    alt="Article cover image"
                  />
                )}
              </div>
              <span>{article.issue}</span>
              <p>{article.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Category;
