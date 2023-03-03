import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { API_URL } from "@/config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const generalApiSlice = createApi({
  reducerPath: "generalApiSlice",
  baseQuery: baseQuery,
  extractRehydrationInfo: function (action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
