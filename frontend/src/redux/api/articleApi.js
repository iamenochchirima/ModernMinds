import { apiSlice } from "./apiSlice";

export const articlesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/api/articles/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
