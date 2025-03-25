import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, searchTerm }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (searchTerm) params.append("searchTerm", searchTerm);
        
        return {
          url: `/gift-cards/count-gift-cards?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userSlice;