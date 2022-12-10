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
import { serviceApi } from '../redux/services/services';
import { setComment, setComments } from '../redux/features/commentsSlice';

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
  setComments,
  setComment,
  changePersistentOfComment: serviceApi.endpoints.changeCommentPersistent.initiate,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
