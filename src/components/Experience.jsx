import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useParams } from "react-router-dom";
import axios from "axios";

const Experience = () => {
  const [data, setData] = useState(null);
  const [isTapToPlacePresent, setIsTapToPlacePresent] = useState(false);

  const param = useParams();

  const handleClick = (link) => {
    window.open(link, "_blank");
  };
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage?id=${param.id}`
        );
        setData(response.data);
        // Check if the tapToPlace key is present
        setIsTapToPlacePresent("tapToPlace" in response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [param]);
  return (
    <div className="mt-10 ">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>Steps</h2>
      </motion.div>

      {isTapToPlacePresent ? (
        <div>
          {data !== null && (
            <div className="mt-20 flex flex-col">
              <VerticalTimeline>
                {/* First Vertical Timeline Element */}
                <VerticalTimelineElement
                  contentStyle={{
                    background: "#1d1836",
                    color: "#fff",
                  }}
                  date={"Scan the QR code using your mobile camera."}
                  contentArrowStyle={{ borderRight: "7px solid #232631" }}
                  iconStyle={{ background: "#383E56" }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src="https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt={data.TargetImageFile}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }>
                  <div>
                    <div
                      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                      onClick={() => handleClick(data.AR_Link)}>
                      <QRCode
                        size={256}
                        style={{
                          height: "100%",
                          maxWidth: "100%",
                          width: "100%",
                          padding: "1rem",
                        }}
                        value={data.AR_Link}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <p
                      className="text-secondary text-[16px] font-semibold p-6"
                      style={{ margin: 0 }}>
                      Tap the screen to place the content in AR{" "}
                      <a
                        href={data.AR_Link}
                        target="_blank"
                        className="text-yellow-600"
                        rel="noopener noreferrer">
                        Click here to open the link
                      </a>
                      .
                    </p>
                  </div>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
          )}
        </div>
      ) : (
        <div>
          {data !== null && (
            <div className="mt-20 flex flex-col">
              <VerticalTimeline>
                {/* First Vertical Timeline Element */}
                <VerticalTimelineElement
                  contentStyle={{
                    background: "#1d1836",
                    color: "#fff",
                  }}
                  date={"Scan the QR code using your mobile camera."}
                  contentArrowStyle={{ borderRight: "7px solid #232631" }}
                  iconStyle={{ background: "#383E56" }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src="https://images.pexels.com/photos/278430/pexels-photo-278430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt={data.TargetImageFile}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }>
                  <div>
                    <div
                      class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                      onClick={() => handleClick(data.AR_Link)}>
                      <QRCode
                        size={256}
                        style={{
                          height: "100%",
                          maxWidth: "100%",
                          width: "100%",
                          padding: "1rem",
                        }}
                        value={data.AR_Link}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <p
                      className="text-secondary text-[16px] font-semibold p-6"
                      style={{ margin: 0 }}>
                      Unlock your mobile phone's camera, scan the QR code, and
                      effortlessly open the link in your browser for quick
                      access.{" "}
                      <a
                        href={data.AR_Link}
                        target="_blank"
                        className="text-yellow-600"
                        rel="noopener noreferrer">
                        Click here to open the link
                      </a>
                      .
                    </p>
                  </div>
                </VerticalTimelineElement>

                {/* Second Vertical Timeline Element */}
                <VerticalTimelineElement
                  contentStyle={{
                    background: "#1d1836",
                    color: "#fff",
                  }}
                  date={
                    "Scan the image marker once the camera is on in the browser"
                  }
                  contentArrowStyle={{ borderRight: "7px solid #232631" }}
                  iconStyle={{ background: "#383E56" }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={data.TargetImageFile}
                        alt={data.TargetImageFile}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }>
                  <div>
                    <div class="aspect-h-1 aspect-w-1 w-full h-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={data.TargetImageFile}
                        alt={data.TargetImageFile}
                        class="h-full w-full object-contain object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <p
                      className="text-secondary text-[16px] font-semibold p-6"
                      style={{ margin: 0 }}>
                      Upon opening the linked content through your camera,
                      proceed to scan the designated marker located above. As
                      your camera accurately identifies the marker, a
                      captivating 3D model, complemented by an immersive story,
                      will seamlessly unfold before you
                    </p>
                  </div>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Experience, "work");
