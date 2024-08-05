import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { SectionWrapper } from "../hoc";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react"; // Import the Spinner component

const About = () => {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nextPage = (serviceId) => {
    navigate(`/analytics/${serviceId}`);
    console.log(serviceId);
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

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner color="blue" /> {/* Spinner for loading state */}
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-10">
          {data &&
            data.map((service, index) => (
              <div
                key={index}
                className="xs:w-[250px] w-full cursor-pointer transition hover:scale-105 ease-in-out duration-300">
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
      )}
    </div>
  );
};

export default SectionWrapper(About, "about");
