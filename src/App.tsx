import React from 'react';

import { ToastContainer } from 'react-toastify';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { useJsApiLoader } from '@react-google-maps/api';

import { Auth } from './pages/Auth/Auth';
import { LoginPage } from './pages/Login/LoginPage';
import { Home } from './pages/Home/Home';
import { TypesOfWaste } from './pages/TypesOfWaste/TypesOfWaste';
import { TrashInfo } from './pages/TrashInfo/TrashInfo';
import { Error } from './pages/Error/Error';
import { Header } from './components/Header/Header';
import { ServicesPage } from './pages/ServicesPage/ServicesPage';

import './App.scss';
import { useCredentials } from './hooks/credentials';

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ['places'],
  });

  const [credentials] = useCredentials();

  return (
    <HashRouter>
      <Header />
      <ToastContainer limit={1} />

      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/detailed" element={<TypesOfWaste />} />
        <Route path="/detailed/:id" element={<TrashInfo />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/services" element={<ServicesPage isLoaded={isLoaded} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
