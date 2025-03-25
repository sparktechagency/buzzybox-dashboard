import { api } from "../../api/baseApi";

const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);

        return {
          url: `/payments/all-transactions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Transaction"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
