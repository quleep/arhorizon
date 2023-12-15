import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Campaign from "./pages/Campaign";
import Register from "./pages/Register";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/register" element={<Register />} />
        {/* dc */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
