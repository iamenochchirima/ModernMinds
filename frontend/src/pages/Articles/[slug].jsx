import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import {
  useLazyGetFullArticleQuery,
  useGetCategoriesQuery,
} from "@/redux/api/generalApi";
import Link from "next/link";
import Image from "next/image";

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: categories } = useGetCategoriesQuery();

  const [getArticle, { data: article, isSuccess }] =
    useLazyGetFullArticleQuery();

  useEffect(() => {
    if (slug) {
      getArticle(slug);
    }
  }, [slug, getArticle]);

  return (
    <Layout>
      <div className="font-graphik min-h-screen px-3 ss:px-10 flex justify-center ">
        <div className="">
          <div className="flex justify-center">
            <div className="w-full h-[500px] sm:h-[600px] md:h-[724px] relative">
              {article?.cover_image ? (
                <Image
                  src={article?.cover_image}
                  style={{
                    objectFit: "cover",
                  }}
                  fill
                  sizes="100vw"
                  alt="Article cover image"
                />
              ) : null}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="py-10 sm:w-3/4 grid grid-cols-5">
              <div className="col-span-5 sm:col-span-3 sm:border-r-2 ">
                <h1 className="text-4xl md:text-5xl text-teal-900 font-kinfolk font-medium pr-3">
                  {article?.title.toUpperCase()}
                </h1>
              </div>

              <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-4 mt-10 sm:pt-0">
                <h1 className="sm:pl-10 text-lg">
                  BY{" "}
                  <span className="font-bold">
                    {article?.author.toUpperCase()}
                  </span>
                </h1>
                <div className="sm:pl-10">
                  <h1 className="text-teal-600">{article?.issue}</h1>
                  <h1 className="mt-5">
                    {categories?.map((category) => (
                      <>
                        {category.id === article?.category && (
                          <Link
                            href={`/category/${encodeURIComponent(
                              category.slug
                            )}/`}
                          >
                            <span
                              key={category.id}
                              className="  text-sm border-b border-yellow-400 hover:border-black tracking-widest"
                            >
                              {category.name}
                            </span>
                          </Link>
                        )}
                      </>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="sm:w-3/4"
              dangerouslySetInnerHTML={{ __html: article?.content }}
              safe="true"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
