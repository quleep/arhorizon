import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { user, setUser } = useStateContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextPage = (service) => {
    navigate(`/analytics/${service}`);
    console.log(service);
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
        console.log("data", response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
  return (
    <div className="w-full">
      <div>
        <p className="sm:text-[18px] text-[14px] text-secondary tracking-wider text-center">
          Campaign
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-10">
        {data &&
          data.map((service, index) => (
            <div className="xs:w-[250px] w-full cursor-pointer transition hover:scale-105 ease-in-out duration-300">
              <div
                className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer"
                onClick={() => nextPage(service.Id)}>
                <div
                  options={{
                    max: 45,
                    scale: 1,
                    speed: 850,
                  }}
                  className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[200px] flex justify-evenly items-center flex-col">
                  <h3 className="text-white text-[20px] font-bold text-center">
                    {service.campaignName}
                  </h3>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
