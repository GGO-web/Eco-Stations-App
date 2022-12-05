import {
  configureStore,
} from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { serviceApi } from './services/services';
import { authApi } from './services/auth';
import { mapsApi } from './services/maps';

import { serviceReducer } from './features/serviceSlice';
import { trashBinsReducer } from './features/trashBinsSlice';
import { authReducer } from './features/authSlice';

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    trashBins: trashBinsReducer,
    auth: authReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [mapsApi.reducerPath]: mapsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(serviceApi.middleware, authApi.middleware, mapsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
