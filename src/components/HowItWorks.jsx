import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section>
      <div className="screen-max-width">
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src="public/images/frame.png"
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="absolute w-[95%] h-[90%] top-6 left-7 rounded-[56px] overflow-hidden">
              {/* <video className="pointer-events-none" autoPlay>
                <source src="public/videos/frame.mp4" type="video/mp4" />
              </video> */}
              <video
                data-autoplay
                autoPlay
                data-object-fit="cover"
                playsInline
                muted
                loop
                type="video/mp4"
                src="public/videos/frame.mp4"
              />
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-start gap-24">
          <div className="flex flex-1 justify-center flex-col">
            <p className="text-gray text-xl font-normal md:font-semibold opacity-0 translate-y-[100px]">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
              .
            </p>

            <p className=" text-gray text-xl font-normal md:font-semibold opacity-0 translate-y-[100px]">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
