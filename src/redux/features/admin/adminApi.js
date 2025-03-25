import { api } from "../../api/baseApi";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => {
        return {
          url: `/users/all-admin`,
          method: "GET",
        };
      },
      providesTags: ["Admin"],
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
    createAdmin: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/users/create-admin`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Admin"],
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
    updateAdmin: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/users/update-admin/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Admin"],
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/users/delete-admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Admin"],
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
