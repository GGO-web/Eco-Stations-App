import React from 'react';

import { ToastContainer } from 'react-toastify';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { Auth } from './pages/Auth/Auth';
import { LoginPage } from './pages/Login/LoginPage';
import { Home } from './pages/Home/Home';
import { TypesOfWaste } from './pages/TypesOfWaste/TypesOfWaste';
import { TrashInfo } from './pages/TrashInfo/TrashInfo';
import { Error } from './pages/Error/Error';

import './App.scss';
import { Header } from './components/Header/Header';

function App() {
  return (
    <HashRouter>
      <Header />
      <ToastContainer limit={1} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailed" element={<TypesOfWaste />} />
          <Route path="/detailed/:id" element={<TrashInfo />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
