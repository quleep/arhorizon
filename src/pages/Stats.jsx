import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import Tilt from "react-tilt";
import { Navbar } from "../components";

const Stats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();
  const navigate = useNavigate();

  console.log(param.id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproductbycampaignname",
          {
            campaign: param.id,
          }
        );
        setData(response.data[0]);

        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param.id]);
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex mt-20">
        <SidebarDash />
        <div className="flex justify-center items-center w-full flex-1">
          <div class="relative w-full h-full">
            <div class="absolute hidden w-full bg-gray-50 lg:block h-96" />
            <div class="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  <span class="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                      <defs>
                        <pattern
                          id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30">
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                        width="52"
                        height="24"
                      />
                    </svg>
                  </span>{" "}
                </h2>
              </div>
              <div class="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
                <div>
                  <div class="p-8 bg-gray-900 rounded">
                    <div class="mb-4 text-center">
                      <p class="text-xl font-medium tracking-wide text-white">
                        View Count:
                      </p>
                      <div class="flex items-center justify-center">
                        <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                          {data?.viewscount}
                        </p>
                        <p class="text-base text-gray-500">views</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
                  <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
                  <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
                </div>
                <div>
                  <div class="p-8 bg-gray-900 rounded">
                    <div class="mb-4 text-center">
                      <p class="text-xl font-medium tracking-wide text-white">
                        Time Spend:
                      </p>
                      <div class="flex items-center justify-center">
                        <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                          {data?.timespend}
                        </p>
                        <p class="text-base text-gray-500">seconds</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
                  <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
                  <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
