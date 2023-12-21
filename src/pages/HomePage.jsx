import React from "react";
import { Hero, Navbar, Works } from "../components";

function HomePage() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      {/* <About /> */}
      {/* <Experience /> */}
      <Works />
    </div>
  );
}

export default HomePage;
