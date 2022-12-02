import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IService } from '../../models/service.model';

export interface ITrashBins {
  trashBins: IService[]
}

const initialState: ITrashBins = {
  trashBins: [],
};

export const trashBinsSlice = createSlice({
  name: 'trashBins',
  initialState,
  reducers: {
    setAllTrashBins: (state, action: PayloadAction<IService[]>) => {
      state.trashBins = action.payload;
    },
  },
});

export const { setAllTrashBins } = trashBinsSlice.actions;

export const trashBinsReducer = trashBinsSlice.reducer;
