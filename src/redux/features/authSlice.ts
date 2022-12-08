import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTH_CREDENTIALS } from '../../constants';

import { ICredentials } from '../../models/credentials.model';

const initialState: ICredentials = {
  username: null,
  role: 'Anonymous',
  token: null,
  isAuth: false,
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
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
