import React from 'react';

import { ToastContainer } from 'react-toastify';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { TypesOfWaste } from './pages/TypesOfWaste/TypesOfWaste';
import { TrashInfo } from './pages/TrashInfo/TrashInfo';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer limit={1} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed" element={<TypesOfWaste />} />
        <Route path="/detailed/:id" element={<TrashInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
