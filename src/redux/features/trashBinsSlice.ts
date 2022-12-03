import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IService } from '../../models/service.model';
import { IServiceFilter } from '../../models/serviceFilter.mode';

export interface ITrashBins {
  trashBins: IService[],
  filter: IServiceFilter
}

const initialState: ITrashBins = {
  trashBins: [],
  filter: {
    typeOfWastes: [],
    paymentConditions: [],
    deliveryOptions: [],
  },
};

export const trashBinsSlice = createSlice({
  name: 'trashBins',
  initialState,
  reducers: {
    setAllTrashBins: (state, action: PayloadAction<IService[]>) => {
      state.trashBins = action.payload;
    },
    setTrashBinsFilter: (state, action: PayloadAction<IServiceFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { setAllTrashBins, setTrashBinsFilter } = trashBinsSlice.actions;

export const trashBinsReducer = trashBinsSlice.reducer;
