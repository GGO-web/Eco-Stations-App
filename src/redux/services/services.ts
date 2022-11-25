// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['Service'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.REACT_APP_BACKEND_URI}:8080/api/services`,
  }),
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => '/',
      providesTags: ['Service'],
    }),
    getServicesFromAnArea: builder.query({
      query: ({ latitude, longitude, distance }) => `/${latitude}/${longitude}/${distance}`,
      providesTags: ['Service'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllServicesQuery, useLazyGetServicesFromAnAreaQuery } = serviceApi;
