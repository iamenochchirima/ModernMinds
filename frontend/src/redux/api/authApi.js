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
    deleteAccount: builder.mutation({
      query: () => ({
        url: "/auth/delete_account",
        method: "POST",
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
    mainNewsletter: builder.mutation({
      query: () => ({
        url: "/auth/sendmainmails/",
        method: "POST",
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
  useMainNewsletterMutation,
  useDeleteAccountMutation
} = authApi;
