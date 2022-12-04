import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ICoordinate } from '../../models/coordinates.model';
import { IService } from '../../models/service.model';
import { IServiceFilter } from '../../models/serviceFilter.model';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    mode: 'cors',
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
  useLazyGetAddressFromCoordinatesQuery,
  useLazyGetServiceByIdQuery,
  useCreateNewServiceMutation,
  useUpdateExistingServiceMutation,
  useDeleteExistingServiceMutation,
  useFilterServiceInAreaMutation,
} = serviceApi;
