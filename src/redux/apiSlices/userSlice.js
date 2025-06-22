import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ page, searchTerm }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (searchTerm) params.append("searchTerm", searchTerm);
        
        return {
          url: `/users/all-user?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userSlice;