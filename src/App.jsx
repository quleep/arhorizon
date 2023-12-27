import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import ProductId from "./pages/ProductId";
import Editor from "./pages/Editor";

import "./App.css";
import Analytics from "./pages/Analytics";
import Stats from "./pages/Stats";
import Upload from "./pages/Upload";
import CouponCode from "./pages/CouponCode";
import OTPScreen from "./pages/OTPScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Register />} />
        <Route path="/productid/:id" element={<ProductId />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/analytics/:id" element={<Stats />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/couponCode" element={<CouponCode />} />
        <Route path="/couponCodeOTP/:id" element={<OTPScreen />} />

        {/* dc */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
