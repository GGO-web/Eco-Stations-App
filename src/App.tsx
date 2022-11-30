import React from 'react';

import { ToastContainer } from 'react-toastify';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { TypesOfWaste } from './pages/TypesOfWaste/TypesOfWaste';
import { TrashInfo } from './pages/TrashInfo/TrashInfo';
import { Error } from './pages/Error/Error';

function App() {
  return (
    <HashRouter>
      <div className="bg-light">
        <ToastContainer limit={1} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailed" element={<TypesOfWaste />} />
          <Route path="/detailed/:id" element={<TrashInfo />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
