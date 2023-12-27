import React from "react";
import { Hero, Navbar, Works } from "../components";

function HomePage() {
  return (
    <div className="relative z-0 bg-lightdark">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <Works />
      </div>
      {/* <About /> */}
      {/* <Experience /> */}
    </div>
  );
}

export default HomePage;
