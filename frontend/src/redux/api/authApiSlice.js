import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
});

export const authApiSlice = createApi({
  reducerPath: "authApiSlice",
  baseQuery: baseQuery,
  extractRehydrationInfo: function (action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
