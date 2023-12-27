import React from "react";
import { Experience, Navbar } from "../components";
function ProductId() {
  return (
    <div className="relative z-0 bg-lightdark">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <Experience />
    </div>
  );
}

export default ProductId;
