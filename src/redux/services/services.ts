import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
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
      blCoordinate: ICoordinate, trCoordinate:ICoordinate
    }>({
      query: ({ blCoordinate, trCoordinate }) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/?bl_latitude=${
          blCoordinate.lat
        }&bl_longitude=${
          blCoordinate.lng
        }&tr_latitude=${
          trCoordinate.lat
        }&tr_longitude=${
          trCoordinate.lng
        }`,
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
