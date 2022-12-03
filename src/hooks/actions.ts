import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
} from '../redux/features/serviceSlice';

const actions = {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
