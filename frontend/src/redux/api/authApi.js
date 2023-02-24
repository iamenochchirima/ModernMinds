import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ({
        url: "/api/token/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTokenQuery } = authApi;
