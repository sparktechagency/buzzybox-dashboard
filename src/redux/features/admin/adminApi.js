import { api } from "../../api/baseApi";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: `/users/all-admin`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: ({ payload }) => ({
        url: `/users/create-admin`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/users/update-admin/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/users/delete-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;

export default adminApi;
