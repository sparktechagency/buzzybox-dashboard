import { api } from "../api/baseApi";

const aboutUsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAboutUs: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/about/create-about`,
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["About"],
    }),
    updateAboutUs: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/about/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["About"],
    }),
    deleteAboutUs: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/about/${id}`,
          method: "DELETE",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["About"],
    }),
    getAboutUs: builder.query({
      query: () => {
        return {
          url: "/about",
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
      providesTags: ["About"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
} = aboutUsSlice;