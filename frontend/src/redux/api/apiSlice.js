import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  // credentials: "include",
  // prepareHeaders: (headers, { getState }) => {
  //   const accessToken = Cookies.get('access');
  //   console.log(accessToken, "Here")

  //   if (accessToken) {
  //     headers.set("Authorization", `Bearer ${accessToken}`);
  //   }

  //   return headers;
  // },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQuery,
  extractRehydrationInfo: function (action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
