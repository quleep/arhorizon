import { Hero, Navbar, Works } from "../components";
import HowItWorks from "../../public/assets/videos/frame1.gif";
import { styles } from "../styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
function HomePage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://geolocation.microlink.io/");
        setLocation(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="relative z-0 bg-lightdark">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
        <section
          className={` w-full px-4 h-auto mx-auto flex flex-col md:flex-row mt-24 justify-between md:px-24 gap-6`}>
          <div className=" flex justify-center items-center py-3 md:w-1/2 w-full">
            <div className="relative flex-center">
              <div className="overflow-hidden">
                <img
                  src="/assets/images/frame.png"
                  alt="frame"
                  className="bg-transparent relative z-10 w-72 "
                />
              </div>
              <div className="absolute w-72 top-3 -left-0 rounded-3xl overflow-hidden">
                <img src="/assets/videos/frame2.gif" alt="frame" />
              </div>
            </div>
          </div>
          <div className="flex flex-row px-1 md:px-6 gap-5 justify-center items-start w-fit pt-11">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-64 h-40 violet-gradient" />
            </div>
            <div>
              <h1
                className={`font-black text-[40px] md:text-[45px] lg:leading-[98px] mt-2 text-white`}>
                AR Image Tracking with{" "}
                <span className="text-[#915EFF]">Video Playback</span>
              </h1>
              <p
                className={`font-medium text-[19px] md:text-[20px] lg:leading-[40px] mt-2 text-white-100`}>
                Elevate your brand with AR image tracking that seamlessly
                integrates <br className="sm:block hidden" />
                video playback when the marker is tracked. Engage your audience
                with immersive experiences.
              </p>
            </div>
          </div>
        </section>
        <section
          className={` w-full px-4 h-auto mx-auto flex flex-col md:flex-row mt-24 justify-between md:px-24 gap-6`}>
          <div className="flex flex-row px-1 md:px-6 gap-5 justify-center items-start w-fit pt-11">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-64 h-40 violet-gradient" />
            </div>
            <div>
              <h1
                className={`font-black text-[40px] md:text-[45px] lg:leading-[98px] mt-2 text-white`}>
                Tap to Place: Experience{" "}
                <span className="text-[#915EFF]">Interactive 3D Models</span>
              </h1>
              <p
                className={`font-medium text-[19px] md:text-[20px] lg:leading-[40px] mt-2 text-white-100`}>
                Discover the future with Tap to Place technology, where you can
                simply tap on the ground and witness mesmerizing 3D model
                animations unfold before your eyes.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center py-3 md:w-1/2 w-full">
            <div className="relative flex-center">
              <div className="overflow-hidden">
                <img
                  src="/assets/images/frame.png"
                  alt="frame"
                  className="bg-transparent relative z-10 w-72 "
                />
              </div>
              <div className="absolute w-72 top-3 -left-0 rounded-sm overflow-hidden">
                <img src="/assets/videos/frame3.gif" alt="frame" />
              </div>
            </div>
          </div>
        </section>
        <Works />
      </div>
      {/* <About /> */}
      {/* <Experience /> */}
    </div>
  );
}

export default HomePage;
