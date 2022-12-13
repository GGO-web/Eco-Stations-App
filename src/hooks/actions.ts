import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setPopupState,
  setCurrentService,
  setUpdatePopupState,
} from '../redux/features/serviceSlice';

import { setAllTrashBins, setTrashBinsFilter, setLogOutFilter } from '../redux/features/trashBinsSlice';

import { setCredentials, logOut, setServicesOfProvider } from '../redux/features/authSlice';

import {
  setMidCircles, setSmallCircles, setFarCircles, setUserLocation, setLogoutRecommend,
} from '../redux/features/userLocationSlice';
import { serviceApi } from '../redux/services/services';
import { setComment, setComments, deleteComment } from '../redux/features/commentsSlice';

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
  deleteComment,
  setLogOutFilter,
  setLogoutRecommend,
  changePersistentOfComment: serviceApi.endpoints.changeCommentPersistent.initiate,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
