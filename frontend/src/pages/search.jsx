import { useState, useEffect } from "react";
import { useLazySearchQuery } from "@/redux/api/generalApi";
import Link from "next/link";
import Layout from "@/components/Layout";
import { useGetCategoriesQuery } from "@/redux/api/generalApi";
import { AiOutlineSearch } from "react-icons/ai";

const url = process.env.NEXT_PUBLIC_API_URL;

const Search = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [getArticles, { data, isLoading, error }] = useLazySearchQuery();

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (data) {
      setArticles((prevArticles) => [...prevArticles, ...data.results]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // useEffect(() => {
  //   setArticles([]);
  //   setPage(1)
  // }, [searchQuery]);

  // useEffect(() => {
  //   setArticles([]);
  //   setPage(1)
  //   if (searchQuery) {
  //     getArticles({ searchQuery, page: 1 });
  //   }
  // }, [searchQuery, getArticles]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        getArticles({ searchQuery, page: 1 });
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, getArticles]);

  useEffect(() => {
    if (searchQuery) {
      getArticles({ searchQuery, page });
    }
  }, [ page, getArticles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getArticles({searchQuery, page});
  };

  return (
    <Layout>
      <div className="min-h-screen mt-24 px-3 ss:px-10">
        <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex pt-20 border-b-2 w-3/4 items-center text-xl gap-10 "
        >
          <AiOutlineSearch className="text-gray-500 text-3xl"/>
          <input
            type="text"
            className="w-3/4  outline-none"
            placeholder="Search for articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* <button
            className="bg-yellow-800 text-white px-2 py-1  rounded-md"
            type="submit"
          >
            Search
          </button> */}
        </form>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 w-3/4 gap-10 mt-10">
            {articles?.map((article) => (
              <div key={article.id} className="col-span-1 border p-4 rounded-md">
                <div className="flex items-center space-y-3">
                  <div className="w-2/3">
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
                    <Link
                      href={`/Articles/${encodeURIComponent(article.slug)}/`}
                    >
                      <h1 className="hover:underline font-bold">
                        {article.title}
                      </h1>
                    </Link>
                  </div>
                  <div className="w-1/3 relative">
                    {article?.cover_image && (
                      <img
                        src={url + article?.cover_image}
                        className="w-full h-[100px] object-cover"
                        alt="Article cover image"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-5 flex gap-4 justify-center">
        {articles && data?.next ? (
          <button className="border-b-2 border-black" onClick={handleLoadMore}>
            Load More
          </button>
        ) : null}
      </div>
      </div>
    </Layout>
  );
};

export default Search;
