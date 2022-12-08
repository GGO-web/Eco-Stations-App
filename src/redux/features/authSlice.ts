import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICredentials } from '../../models/credentials.model';

const initialState: ICredentials = {
  username: null,
  role: null,
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
    logOut: (state) => {
      state.username = null;
      state.role = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
