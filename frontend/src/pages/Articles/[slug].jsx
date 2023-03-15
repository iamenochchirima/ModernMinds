import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useLazyGetFullArticleQuery } from "@/redux/api/generalApi";

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getArticle, { data: article, isSuccess }] = useLazyGetFullArticleQuery();

  useEffect(() => {
    if (slug) {
        getArticle(slug)
    }
  }, [slug, getArticle])

  return (
    <Layout>
      <div className="font-cormorant">
        <h1>Article {slug}</h1>
        <p>This is the content of article {slug}.</p>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: article?.content }}
          safe="true"
        />
      </div>
    </Layout>
  );
};

export default Article;
