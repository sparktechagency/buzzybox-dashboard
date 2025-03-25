import { api } from "../../api/baseApi";

const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContactInfo: builder.query({
      query: () => {
        return {
          url: `/contact-info`,
          method: "GET",
        };
      },
      providesTags: ["Contact"],
    }),
    updateContactInfo: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/contact-info/create-contact-info`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactInfoQuery, useUpdateContactInfoMutation } =
  contactApi;
