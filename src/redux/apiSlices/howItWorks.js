import { api } from "../api/baseApi";

const howItWorksSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createHowItWorks: builder.mutation({
      query: ({ payload }) => {
        return {
          url: `/how-it-works/create-how-it-works`,
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["HowItWorks"],
    }),
    updateHowItWorks: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/how-it-works/${id}`,
          method: "PATCH",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["HowItWorks"],
    }),
    deleteHowItWorks: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/how-it-works/${id}`,
          method: "DELETE",
          body: payload,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["HowItWorks"],
    }),
    getHowItWorks: builder.query({
      query: () => {
        return {
          url: "/how-it-works",
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
      providesTags: ["HowItWorks"],
    }),
  }),
});

export const {
  useGetHowItWorksQuery,
  useCreateHowItWorksMutation,
  useUpdateHowItWorksMutation,
  useDeleteHowItWorksMutation,
} = howItWorksSlice;
