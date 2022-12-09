import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
} from '../redux/features/serviceSlice';

import { setAllTrashBins, setTrashBinsFilter } from '../redux/features/trashBinsSlice';

import { setCredentials, logOut, setServicesOfProvider } from '../redux/features/authSlice';

import {
  setMidCircles, setSmallCircles, setFarCircles, setUserLocation,
} from '../redux/features/userLocationSlice';

const actions = {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
  setAllTrashBins,
  setTrashBinsFilter,
  setCredentials,
  logOut,
  setMidCircles,
  setSmallCircles,
  setFarCircles,
  setUserLocation,
  setServicesOfProvider,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
