import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useLazyGetFullArticleQuery } from "@/redux/api/generalApi";

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getArticle, { data: article, isSuccess }] =
    useLazyGetFullArticleQuery();

  useEffect(() => {
    if (slug) {
      getArticle(slug);
    }
  }, [slug, getArticle]);

  return (
    <Layout>
      <div className="font-graphik min-h-screen px-3 ss:px-10">
        <div className="flex justify-center">
          <div className="">
            <img
              src={article?.cover_image}
              className="w-full h-[700px] object-cover"
              alt="Article cover image"
            />
            <div
              className=""
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
