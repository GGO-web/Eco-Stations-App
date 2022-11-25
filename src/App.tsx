import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import { Map } from './components/Map/Map';
import Popup from './components/Popup/Popup';

import { useAppSelector } from './hooks/redux';

import './App.scss';
import { ICoordinate } from './models/coordinates.model';

function App() {
  const center: ICoordinate = {
    lat: 50.450001,
    lng: 30.523333,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const popUp = useAppSelector((store) => store.service.isPopupOpen);

  // const { data, error, isLoading } = useGetAllServicesQuery();
  // const [getServicesNearBy, { data, error, isLoading }] =
  // useLazyGetServicesFromAnAreaQuery();

  return (
    <div className="App">
      {popUp && <Popup />}
      {isLoaded ? <Map center={center} /> : <h2>Loading</h2>}
    </div>
  );
}

export default App;
