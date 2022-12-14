import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../models/service.model';

export interface IServiceWithPopup {
  isPopupOpen: boolean,
  isUpdatePopupOpen: boolean,
  service: IService
}

const initialState: IServiceWithPopup = {
  isPopupOpen: false,
  isUpdatePopupOpen: false,
  service: {
    id: 0,
    address: '',
    serviceName: '',
    paymentConditions: [],
    coordinate: {
      longitude: 0,
      latitude: 0,
    },
    typeOfWastes: [],
    deliveryOptions: [],
    rating: 0,
    priceOfService: 0,
    description: '',
  },
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setPopupState: (state, action: PayloadAction<boolean>) => {
      state.isPopupOpen = action.payload;
    },
    setUpdatePopupState: (state, action: PayloadAction<boolean>) => {
      state.isUpdatePopupOpen = action.payload;
    },
    setCurrentService: (state, action: PayloadAction<IService>) => {
      state.service = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPopupState, setCurrentService, setUpdatePopupState } = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
