import React from 'react';

import { ToastContainer } from 'react-toastify';

import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { useJsApiLoader } from '@react-google-maps/api';

import { Auth } from './pages/Auth/Auth';
import { LoginPage } from './pages/Login/LoginPage';
import { Home } from './pages/Home/Home';
import { TypesOfWaste } from './pages/TypesOfWaste/TypesOfWaste';
import { TrashInfo } from './pages/TrashInfo/TrashInfo';
import { Error } from './pages/Error/Error';
import { ServicesPage } from './pages/ServicesPage/ServicesPage';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

import { useCredentials } from './hooks/credentials';

import './App.scss';

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ['places'],
  });

  useCredentials();

  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/detailed" element={<TypesOfWaste />} />
        <Route path="/detailed/:id" element={<TrashInfo />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/services"
          element={
            <ProtectedRoute userRole="Service" element={<ServicesPage isLoaded={isLoaded} />} />
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
