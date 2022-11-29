// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';

// Define a service using a base URL and expected endpoints
export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  tagTypes: ['Service'],
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    mode: 'cors',

  }),
  endpoints: (builder) => ({
    getAllServices: builder.query<IService[], void>({
      query: () => ({
        url: import.meta.env.VITE_BACKEND_URL,
        responseHandler: (response) => response.json(),
      }),
      providesTags: ['Service'],
    }),
    getAddressFromCoordinates: builder.query<string, ICoordinate>({
      query: (coord: ICoordinate) => ({
        url: `${import.meta.env.VITE_GEOCODING_URL}?latlng=${coord.lat},${coord.lng}&key=${import.meta.env.VITE_API_KEY}`,
      }),
      providesTags: ['Service'],
    }),
    getServicesFromAnArea: builder.query<IService[], {
      latitude: number, longitude: number, distance: number
    }>({
      query: ({ latitude, longitude, distance }) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/${latitude}/${longitude}/${distance}`,
      }),
      providesTags: ['Service'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllServicesQuery,
  useLazyGetServicesFromAnAreaQuery,
  useLazyGetAddressFromCoordinatesQuery,
} = serviceApi;
