import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[200px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer"
      onClick={() => console.log("fdfc")}>
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 850,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { user, setUser } = useStateContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextPage = (campaign) => {
    navigate(`/analytics/${campaign}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getcampaigndata",
          {
            email: user,
          }
        );
        setData(response.data);

        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Campaign Name</p>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-10">
        {data &&
          data.map((service, index) => (
            <Tilt className="xs:w-[200px] w-full">
              <div
                className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer"
                onClick={() => nextPage(service)}>
                <div
                  options={{
                    max: 45,
                    scale: 1,
                    speed: 850,
                  }}
                  className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
                  <h3 className="text-white text-[20px] font-bold text-center">
                    {service}
                  </h3>
                </div>
              </div>
            </Tilt>
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
