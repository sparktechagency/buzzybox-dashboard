import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: `/analysis/stats`,
          method: "GET",
        };
      },
    }),
    getMonthlyEarnings: builder.query({
      query: ({ year }) => {
        return {
          url: `/analysis/monthly-earnings?year=${year}`,
          method: "GET",
        };
      },
    }),
    getMonthlyUsers: builder.query({
      query: ({ year }) => {
        return {
          url: `/analysis/monthly-users?year=${year}`,
          method: "GET",
        };
      },
    }),
    getMonthlyGifts: builder.query({
      query: ({ year }) => {
        return {
          url: `/analysis/monthly-total-gift-send?year=${year}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetMonthlyEarningsQuery,
  useGetMonthlyUsersQuery,
  useGetMonthlyGiftsQuery,
} = homeSlice;