import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    login: builder.query({
      onQueryStarted: () => {
        console.log("\n\nCalling...\n\n");
      },
      query: (userEmail: string) => `/users?email=${userEmail}`,
    }),
  }),
});

export const { useLoginQuery } = apiSlice;
