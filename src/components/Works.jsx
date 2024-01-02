import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import axios from "axios";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  index,
  name,
  TargetImageFile,
  Id,
  AR_Link,
  campaignName,
}) => {
  const navigate = useNavigate();

  const nextPage = (product_Id) => {
    navigate(`/productid/${product_Id}`);
  };
  return (
    <div
      className="bg-tertiary rounded-md sm:w-[360px] w-full cursor-pointer transition hover:scale-105 ease-in-out"
      onClick={() => nextPage(Id)}>
      <div className="relative w-full h-[230px]">
        <img
          src={TargetImageFile}
          alt="project_image"
          className="w-full h-full object-none rounded-md"
        />
      </div>

      <div className="py-4 px-1">
        <h3 className="text-white font-bold text-[20px]">{campaignName}</h3>
      </div>
    </div>
  );
};

const Works = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/fetchall"
        ); // Replace with your API endpoint
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText}`}>Products.</h2>
      </motion.div>

      <div className="mt-20 flex flex-wrap gap-7">
        {data?.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
