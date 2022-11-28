import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import { ToastContainer } from 'react-toastify';

import { Map } from './components/Map/Map';
import { Popup } from './components/Popup/Popup';

import { useAppSelector } from './hooks/redux';
import { ICoordinate } from './models/coordinates.model';

import './App.scss';

function App() {
  const center: ICoordinate = {
    lat: 50.450001,
    lng: 30.523333,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  const popUp = useAppSelector((store) => store.service.isPopupOpen);

  return (
    <div className="App">
      <ToastContainer limit={1} />
      {popUp && <Popup />}
      {isLoaded
        ? <Map center={center} />
        : <h2>Loading</h2>}
    </div>
  );
}

export default App;
