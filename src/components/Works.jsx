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
  uniqueText,
  uniquecolor,
}) => {
  const navigate = useNavigate();

  const nextPage = (product_Id) => {
    navigate(`/productid/${product_Id}`);
  };
  return (
    <div className="md:w-fit w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer transition hover:scale-95 ease-in-out duration-200">
      <div
        options={{
          max: 45,
          scale: 0.1,
          speed: 850,
        }}
        className="bg-tertiary rounded-[20px] min-h-fit flex justify-evenly items-center flex-col">
        {" "}
        <div
          className=" rounded-2xl sm:w-[360px] w-full"
          onClick={() => nextPage(Id)}>
          <div className="relative w-full h-[230px]">
            <img
              src={TargetImageFile}
              alt="project_image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="py-3">
          <h3 className="text-white font-bold text-[24px]">{campaignName}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <p className={`text-[14px] text-green-200  py-2 w-fit`}>
            #{uniqueText}
          </p>

          <p className={`text-[14px] text-red-200  py-2 w-fit`}>#arhorizon</p>
        </div>
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
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div
        className={
          "text-gray-50 text-[40px] md:text-[50px] font-extrabold px-4"
        }>
        Products
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center px-7 md:px-0">
        {data?.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            uniqueText={project?.tapToPlace ? "taptoplace" : "imagetracking"}
            uniquecolor={project?.tapToPlace ? "green" : "yellow"}
          />
        ))}
      </div>
      <div
        className={
          "text-gray-50 text-[40px] md:text-[50px] font-extrabold px-4 pt-20 pb-1 "
        }>
        Beta stage{" "}
      </div>

      <div className="py-5 px-4">
        <a
          className="text-white underline"
          href="https://arhorizon.in/grid_AR/index.html"
          target="_blank">
          Interactive AR Images
        </a>
      </div>
      <div className=" px-4">
        <a
          className="text-white underline"
          href="https://arhorizon.in/grid_AR/2.html"
          target="_blank">
          Multi AR Videos
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
