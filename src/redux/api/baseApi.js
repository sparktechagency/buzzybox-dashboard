import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "GiftCard",
    "Admin",
    "User",
    "Transaction",
    "PrivacyPolicy",
    "Faq",
    "Contact",
    "Category",
  ],
  endpoints: () => ({}),
});

export const imageUrl = import.meta.env.VITE_SERVER_URL;