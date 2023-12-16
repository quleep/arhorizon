import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Campaign from "./pages/Campaign";
import Register from "./pages/Register";
import ProductId from "./pages/ProductId";
import Editor from "./pages/Editor";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Stats from "./pages/Stats";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/login" element={<Register />} />
        <Route path="/productid/:id" element={<ProductId />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/:id" element={<Stats />} />

        {/* dc */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
