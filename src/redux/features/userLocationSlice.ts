import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICoordinate } from '../../models/coordinates.model';
import { USER_LOCATION } from '../../constants';

export interface IRecommendState {
  farDistance: boolean,
  midDistance: boolean,
  smallDistance: boolean,
}

export interface IUserLocationState {
  userLocation: ICoordinate | null,
  recommend: IRecommendState
}

const initialState: IUserLocationState = {
  userLocation: JSON.parse(localStorage.getItem(USER_LOCATION) as string) || null,
  recommend: {
    farDistance: false,
    midDistance: false,
    smallDistance: false,
  },
};

export const userLocationSlice = createSlice({
  name: 'userLocations',
  initialState,
  reducers: {
    setFarCircles: (state, action: PayloadAction<boolean>) => {
      state.recommend.farDistance = action.payload;
    },
    setMidCircles: (state, action: PayloadAction<boolean>) => {
      state.recommend.midDistance = action.payload;
    },
    setSmallCircles: (state, action: PayloadAction<boolean>) => {
      state.recommend.smallDistance = action.payload;
    },
    setUserLocation: (state, action: PayloadAction<ICoordinate>) => {
      state.userLocation = action.payload;
    },
  },
});

export const {
  setFarCircles, setMidCircles, setSmallCircles, setUserLocation,
} = userLocationSlice.actions;

export const userLocationsReducer = userLocationSlice.reducer;
