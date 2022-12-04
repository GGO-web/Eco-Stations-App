import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { IAuth } from '../../models/auth.model';
import { ILoginState } from '../../models/login.model';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_AUTH_URL,
    mode: 'cors',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    userRegister: builder.mutation<string, IAuth>({
      query: (newUser: IAuth) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Auth'],
    }),
    userLogin: builder.mutation<string, ILoginState>({
      query: (loginUser: ILoginState) => ({
        url: '/authenticate',
        method: 'POST',
        body: loginUser,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
} = authApi;
