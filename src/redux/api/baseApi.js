import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.70.123:5001/api/v1",
  }),
  endpoints: () => ({}),
});

export const imageUrl = "http://10.0.70.123:5001";