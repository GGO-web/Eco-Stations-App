import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { ICoordinate } from '../../models/coordinates.model';

export const mapsApi = createApi({
  reducerPath: 'mapsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    mode: 'cors',
  }),
  tagTypes: ['Map'],
  endpoints: (builder) => ({
    getAddressFromCoordinates: builder.query<string, ICoordinate>({
      query: (coord: ICoordinate) => ({
        url: `${import.meta.env.VITE_GEOCODING_URL}?latlng=${coord.lat},${coord.lng}&key=${import.meta.env.VITE_API_KEY}`,
      }),
      providesTags: ['Map'],
    }),
  }),
});

export const {
  useLazyGetAddressFromCoordinatesQuery,
} = mapsApi;
