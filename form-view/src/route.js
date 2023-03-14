import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StepOne from './workflows/home';
import StepTwo from './workflows/step-two';

function AppRoute() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<StepOne />} />
          <Route path="/step-2/:userId" element={<StepTwo />} />
          <Route path="/thank-you" element={<>welcome</>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoute;
