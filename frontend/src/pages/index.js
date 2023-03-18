import LatestArticles from "@/components/LatestArticles";
import Layout from "@/components/Layout";
import SpecialArticles from "../components/SpecialArticles";

export default function Home() {
  return (
   <Layout >
    <SpecialArticles/>
    <LatestArticles/>
   </Layout>
  );
}
