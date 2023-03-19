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
    verifyNewsletterEmail: builder.mutation({
      query: ({ token }) => ({
        url: `/newsletter/verify-nl-email/${token}/`,
        method: "GET",
      }),
    }),
    getSpecialArticles: builder.query({
      query: () => ({
        url: "/api/special-articles/",
        method: "GET",
      }),
    }),
    getFullSpecialArticle: builder.query({
      query: (special_slug) => (
        {
        url: `/api/special-articles/${special_slug}/`,
        method: "GET",
      }),
    }),
    getArticles: builder.query({
      query: () => ({
        url: "/api/articles/",
        method: "GET",
      }),
    }),
    getFullArticle: builder.query({
      query: (slug) => (
        {
        url: `/api/articles/${slug}/`,
        method: "GET",
      }),
    }),
    getCategoryArticles: builder.query({
      query: (slug) => (
        {
        url: `/api/category/${slug}/`,
        method: "GET",
      }),
    }),
    getCountries: builder.query({
      query: () => ({
        url: "/users/countries/",
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/api/categories/",
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
    newsletterUnsubscribe: builder.mutation({
      query: (token) => ({
        url: `/newsletter/unsubscribe/${token}/`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetArticlesQuery,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useConfirmResetMutation,
  useGetCountriesQuery,
  useSignUpNewsletterMutation,
  useVerifyNewsletterEmailMutation,
  useNewsletterUnsubscribeMutation,
  useLazyGetFullArticleQuery,
  useGetSpecialArticlesQuery,
  useLazyGetFullSpecialArticleQuery,
  useGetCategoriesQuery,
  useLazyGetCategoryArticlesQuery
} = generalApi;
