import { generalApiSlice } from "./generalApiSlice";

export const generalApi = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/create/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/users/password-reset/",
        method: "POST",
        body,
      }),
    }),
    ConfirmReset: builder.mutation({
      query: (body) => ({
        url: `users/password-reset/confirm/`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ uid, token }) => ({
        url: `/users/verify-email/${uid}/${token}/`,
        method: "GET",
      }),
    }),
    getArticles: builder.query({
      query: () => ({
        url: "/api/articles/",
        method: "GET",
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: "/users/countries/",
        method: "GET",
      }),
    }),
    signUpNewsletter: builder.mutation({
      query: (body) => ({
        url: "/newsletter/signup/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useConfirmResetMutation,
  useGetCountriesQuery,
  useSignUpNewsletterMutation,
} = generalApi;
