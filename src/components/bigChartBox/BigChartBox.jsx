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

const BigChartBox = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/view_count_week",
          {
            productId: param.id,
          }
        );
        const fetchedData = res.data.data;

        const rearrangedData = [...fetchedData];
        const currentDayIndex = new Date().getDay();

        const reorderData = (rearrangedData, currentDayIndex) => {
          const orderedData = [
            ...rearrangedData.slice(currentDayIndex + 1),
            ...rearrangedData.slice(0, currentDayIndex + 1),
          ];
          return orderedData;
        };

        const reorderedData = reorderData(rearrangedData, currentDayIndex);

        console.log(reorderedData);
        setData(reorderedData);
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
    <div className="bigChartBox border rounded-lg border-slate-300 outline-slate-100 mt-9">
      <div className="w-full font-semibold text-xl text-gray-100 text-center py-5">
        View Count per Week
      </div>
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
                dataKey="Views"
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

export default BigChartBox;
