import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import { ICoordinate } from '../../models/coordinates.model';

import { Map } from '../../components/Map/Map';
import { Loader } from '../../components/Loader/Loader';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export function Home() {
  const center: ICoordinate = {
    lat: 50.450001,
    lng: 30.523333,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  if (!isLoaded) return <Loader />;

  return (
    <div className="flex-1 grid grid-cols-[2fr_minmax(200px,300px)]">
      <Map center={center} />
      <Sidebar />
    </div>
  );
}
