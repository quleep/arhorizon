import React from "react";
import { Hero, Navbar, Works } from "../components";
import HowItWorks from "../components/HowItWorks";
import { styles } from "../styles";

function HomePage() {
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
                  src="public/images/frame.png"
                  alt="frame"
                  className="bg-transparent relative z-10 w-72 "
                />
              </div>
              <div className="absolute w-72 top-8 -left-0 rounded-3xl overflow-hidden">
                <video
                  data-autoplay
                  autoPlay
                  data-object-fit="contain"
                  playsInline
                  muted
                  loop
                  type="video/mp4"
                  src="public/videos/frame2.mp4"
                />
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
                className={`font-black text-[40px] md:text-[50px] lg:leading-[98px] mt-2 text-white`}>
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
                className={`font-black text-[40px] md:text-[50px] lg:leading-[98px] mt-2 text-white`}>
                Tap to Place: Experience{" "}
                <span className="text-[#915EFF]">Interactive 3D Models</span>
              </h1>
              <p
                className={`font-medium text-[19px] md:text-[20px] lg:leading-[40px] mt-2 text-white-100`}>
                Discover the future with Tap to Place technology, where you can
                simply tap <br className="sm:block hidden" />
                on the ground and witness mesmerizing 3D model animations unfold
                before your eyes.
              </p>
            </div>
          </div>
          <div className=" flex justify-center items-center py-3 md:w-1/2 w-full">
            <div className="relative flex-center">
              <div className="overflow-hidden">
                <img
                  src="public/images/frame.png"
                  alt="frame"
                  className="bg-transparent relative z-10 w-72 "
                />
              </div>
              <div className="absolute w-72 top-12 -left-0 rounded-sm overflow-hidden">
                {/* <video className="pointer-events-none" autoPlay>
                <source src="public/videos/frame.mp4" type="video/mp4" />
              </video> */}
                <video
                  data-autoplay
                  autoPlay
                  data-object-fit="contain"
                  playsInline
                  muted
                  loop
                  type="video/mp4"
                  src="public/videos/frame3.mp4"
                />
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
