import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
} from '../redux/features/serviceSlice';

import { setAllTrashBins, setTrashBinsFilter } from '../redux/features/trashBinsSlice';

const actions = {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
  setAllTrashBins,
  setTrashBinsFilter,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
