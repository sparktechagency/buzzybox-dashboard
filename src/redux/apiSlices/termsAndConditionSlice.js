import { api } from "../api/baseApi";


const termsAndConditionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createTermsAndConditions: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/terms-and-conditions/create-terms-and-conditions`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getTermsAndCondition: builder.query({
      query: () => {
        return {
          url: "/terms-and-conditions",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useCreateTermsAndConditionsMutation,
  useGetTermsAndConditionQuery,
} = termsAndConditionSlice;