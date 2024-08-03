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

const BigChartBox = () => {
  const [data, setData] = useState([]);
  const param = useParams();
  const data1 = [
    {
      name: "Sun",
      Views: 4000,
    },
    {
      name: "Mon",
      Views: 3000,
    },
    {
      name: "Tue",
      Views: 2000,
    },
    {
      name: "Wed",
      Views: 2780,
    },
    {
      name: "Thu",
      Views: 1890,
    },
    {
      name: "Fri",
      Views: 2390,
    },
    {
      name: "Sat",
      Views: 3490,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/view_count_week",
          {
            productId: param.id,
          }
        );
        const data = res.data;
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log("Error fetching registered users:", error);
        toast.error("Error fetching registered users");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bigChartBox border rounded-lg border-slate-300 outline-slate-100 mt-9">
      <div className="w-full font-semibold text-xl text-gray-100 text-center py-5">
        View Count per Week
      </div>
      <div className="chart">
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
      </div>
    </div>
  );
};

export default BigChartBox;
