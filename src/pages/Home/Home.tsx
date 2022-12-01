import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import { ICoordinate } from '../../models/coordinates.model';

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

  return isLoaded
    ? <Map center={center} />
    : <Loader />;
}
