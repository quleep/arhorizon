import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const bigChartBoxTime = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage?id=${param.id}`
        );
        const fetchedData = response.data.timespentByWeek;

        const transformedData = Object.entries(fetchedData).map(
          ([day, { time }]) => ({
            name: day,
            time,
          })
        );

        console.log("fetch", transformedData);

        setData(transformedData);
      } catch (error) {
        console.log("Error fetching view count data:", error);
        toast.error("Error fetching view count data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param.id]);

  return (
    <div className="bigChartBox">
      <div className="chart">
        {loading ? ( // Show spinner while loading
          <div className="flex justify-center items-center h-full">
            <Spinner color="blue" size="xl" />
          </div>
        ) : (
          <ResponsiveContainer width="99%" height="90%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="time"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default bigChartBoxTime;
