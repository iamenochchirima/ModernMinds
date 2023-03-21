import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useLazyGetFullSpecialArticleQuery } from "@/redux/api/generalApi";

const SpecialArticle = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getArticle, { data: article, isSuccess }] = useLazyGetFullSpecialArticleQuery();

  useEffect(() => {
    if (slug) {
        getArticle(slug)
    }
  }, [slug, getArticle])

  return (
    <Layout>
      <div className="font-graphik mt-24 min-h-screen">
        <h1>SpecialArticle {slug}</h1>
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

export default SpecialArticle;
