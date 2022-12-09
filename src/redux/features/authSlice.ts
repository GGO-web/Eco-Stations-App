import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTH_CREDENTIALS } from '../../constants';

import { ICredentials } from '../../models/credentials.model';
import { IService } from '../../models/service.model';

const initialState: ICredentials & { services: IService[] } = {
  username: null,
  role: 'Anonymous',
  token: null,
  isAuth: false,
  services: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ICredentials>) => {
      const {
        username, role, token,
      } = action.payload;
      state.username = username;
      state.role = role;
      state.token = token;
      state.isAuth = true;
    },
    logOut: () => {
      localStorage.removeItem(AUTH_CREDENTIALS);

      return initialState;
    },
    setServicesOfProvider: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setCredentials, logOut, setServicesOfProvider } = authSlice.actions;

export const authReducer = authSlice.reducer;
