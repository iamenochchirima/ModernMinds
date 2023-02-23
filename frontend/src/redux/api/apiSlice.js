import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            headers.set("authorization", `JWT ${token}`)
        }
        return headers
    }
  })
  

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQuery,
    extractRehydrationInfo: function (action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath];
        }
      },
    endpoints: builder => ({})
})
