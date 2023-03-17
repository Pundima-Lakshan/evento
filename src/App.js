import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import Participations from "./components/participations";
import QrScanner from "./components/qrScanner";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<QrScanner />} />
          <Route path="/qr-scanner" element={<QrScanner />} />
          <Route path="/participations" element={<Participations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
