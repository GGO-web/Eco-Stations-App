import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import { useAppSelector } from '../../hooks/redux';

import { ICoordinate } from '../../models/coordinates.model';

import { Popup } from '../../components/Popup/Popup';
import { Map } from '../../components/Map/Map';
import { Loader } from '../../components/Loader/Loader';

export function Home() {
  const center: ICoordinate = {
    lat: 50.450001,
    lng: 30.523333,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const popUp = useAppSelector((store) => store.service.isPopupOpen);

  return (
    <>
      {popUp && <Popup />}
      {isLoaded
        ? <Map center={center} />
        : <Loader />}
    </>
  );
}
