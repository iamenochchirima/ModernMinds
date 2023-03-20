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
  const [name, setName] = useState("");

  useEffect(() => {
    const matchingCategory = categories?.find(
      (category) => category.slug === slug
    );

    if (matchingCategory) {
      setBackground(matchingCategory.cover_image);
      setName(matchingCategory.name)
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
          <div className="absolute  w-full  h-[550px] bg-black bg-opacity-30 "></div>
          <div className="relative w-full h-[550px] flex flex-col justify-center z-5">
            <h1 className="text-center text-white font-bold  text-7xl">{name}</h1>
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
