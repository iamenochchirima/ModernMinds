import { authApiSlice } from "./authApiSlice";

export const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/auth/logout/",
        method: "POST",
        body,
      }),
    }),
    loadUser: builder.query({
      query: (body) => ({
        url: "/auth/load_user",
        method: "GET",
        body,
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/load_user",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/auth/update_user",
        method: "POST",
        body,
      }),
    }),
    changeEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/change_email",
        method: "POST",
        body,
      }),
    }),
    signUpNewsletter: builder.mutation({
      query: (body) => ({
        url: "/auth/newsletter",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoadUserQuery,
  useLazyLoadUserQuery,
  useLogoutMutation,
  useRefreshQuery,
  useUpdateUserMutation,
  useChangeEmailMutation,
  useSignUpNewsletterMutation
} = authApi;
