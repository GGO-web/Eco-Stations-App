import React, { useState } from 'react';

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

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  if (!isLoaded) return <Loader />;

  return (
    <div className="home flex flex-1 overflow-hidden">
      <Map {...{ mapRef, setMapRef }} center={center} />
      <Sidebar />
    </div>
  );
}
