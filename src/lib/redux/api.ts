import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// You can add more endpoints here as needed
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Change baseUrl according to your backend
    prepareHeaders: (headers, { getState }) => {
      // Optionally add auth tokens here
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExample: builder.query<any, void>({
      query: () => "/example",
    }),
    // Example POST endpoint
    createPost: builder.mutation<any, { title: string; content: string }>({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in function components
export const { useGetExampleQuery, useCreatePostMutation } = api;