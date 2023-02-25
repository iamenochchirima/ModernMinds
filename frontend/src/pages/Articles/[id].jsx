import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="">
        <h1>Article {id}</h1>
        <p>This is the content of article {id}.</p>
        {/* <div className=""
              dangerouslySetInnerHTML={{ __html: article.content }}
              safe="true"
            /> */}
      </div>
    </Layout>
  );
};

export default Article;