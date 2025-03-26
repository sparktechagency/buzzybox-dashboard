import { api } from "../api/baseApi";

const categorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        return {
          url: "/categories",
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: ({ payload }) => {
        return {
          url: "/categories/create-category",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/categories/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;