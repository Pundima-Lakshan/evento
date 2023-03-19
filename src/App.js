import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Participations from "./components/participations";
import QrScanner from "./components/qrScanner";
import Participants from "./components/participants";
import QrGenerator from "./components/qrGenerator";

import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<QrScanner />} />
          <Route path="/qr-scanner" element={<QrScanner />} />
          <Route path="/participations" element={<Participations />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
