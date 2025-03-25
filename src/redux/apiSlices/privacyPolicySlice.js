import { api } from "../api/baseApi";


const privacyPolicySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPrivacyPolicy: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `privacy-policy/create-privacy-policy`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["PrivacyPolicy"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          url: "/privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["PrivacyPolicy"],
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } =
  privacyPolicySlice;