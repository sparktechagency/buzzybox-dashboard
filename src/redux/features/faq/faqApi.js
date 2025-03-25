import { api } from "../../api/baseApi";

const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: () => {
        return {
          url: `/faqs`,
          method: "GET",
        };
      },
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/faqs/create-faq`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/faqs/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/faqs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
