import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';
import { IServiceFilter } from '../../models/serviceFilter.model';

import type { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    mode: 'cors',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Service'],
  endpoints: (builder) => ({
    getAllServices: builder.query<IService[], void>({
      query: () => ({
        url: import.meta.env.VITE_BACKEND_URL,
        responseHandler: (response) => response.json(),
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
    filterServiceInArea: builder.mutation<IService[], {
      blCoordinate: ICoordinate,
      trCoordinate:ICoordinate,
      serviceFilter: IServiceFilter
    }>({
      query: ({ blCoordinate, trCoordinate, serviceFilter }) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/?bl_latitude=${
          blCoordinate.lat
        }&bl_longitude=${
          blCoordinate.lng
        }&tr_latitude=${
          trCoordinate.lat
        }&tr_longitude=${
          trCoordinate.lng
        }`,
        method: 'POST',
        body: serviceFilter,
      }),
      invalidatesTags: ['Service'],
    }),
    getServiceById: builder.query<IService, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/${id}`,
        headers: {
          Auhorization: 'text/plain',
        },
      }),
      providesTags: ['Service'],
    }),
    createNewService: builder.mutation<IService, IService>({
      query: (newService: IService) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/manage`,
        method: 'POST',
        body: newService,
      }),
      invalidatesTags: ['Service'],
    }),
    updateExistingService: builder.mutation<IService, IService>({
      query: (updateService: IService) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/manage/${updateService.id}`,
        method: 'PUT',
        body: updateService,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteExistingService: builder.mutation<void, number>({
      query: (id) => ({
        url: `${import.meta.env.VITE_BACKEND_URL}/manage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useLazyGetServicesFromAnAreaQuery,
  useLazyGetServiceByIdQuery,
  useCreateNewServiceMutation,
  useUpdateExistingServiceMutation,
  useDeleteExistingServiceMutation,
  useFilterServiceInAreaMutation,
} = serviceApi;
