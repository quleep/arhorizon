import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";
const Hero = () => {
  return (
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
            Marker-Based AR: Explore{" "}
            <span className="text-[#915EFF]">3D Models</span>
          </h1>
          <p
            className={`font-medium text-[19px] md:text-[20px] lg:leading-[40px] mt-2 text-white-100`}>
            Immerse yourself in the world of augmented reality with marker-based
            AR.
            <br className="block" />
            Experience enchanting 3D models come to life when the marker is
            detected.
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
              src="public/videos/frame1.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
