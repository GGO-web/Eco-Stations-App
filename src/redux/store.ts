import {
  configureStore,
} from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { serviceApi } from './services/services';

import { serviceReducer } from './features/serviceSlice';
import { trashBinsReducer } from './features/trashBinsSlice';

export const store = configureStore({
  reducer: {
    service: serviceReducer,
    trashBins: trashBinsReducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(serviceApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
