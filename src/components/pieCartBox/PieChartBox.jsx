import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";
import { useParams } from "react-router-dom";

const PieChartBox = () => {
  const [data, setData] = useState([]);
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/handset",
          {
            productId: param.id,
          }
        );

        console.log(res.data);

        // Transform the data
        const transformedData = [
          { name: "Android", value: res.data.androidCount, color: "#0088FE" },
          { name: "iOS", value: res.data.iosCount, color: "#00C49F" },
        ];

        // Set the data in state
        setData(transformedData);
      } catch (error) {
        console.log("Error fetching registered users:", error);
        toast.error("Error fetching registered users");
      }
    };

    fetchData();
  }, [param.id]);
  return (
    <div className="pieChartBox border rounded-lg border-slate-300 outline-slate-100 px-10 w-full">
      <div className="w-full font-semibold text-xl text-gray-100 text-center py-2 mt-2">
        Type of Handset
      </div>
      <div className="chart">
        <ResponsiveContainer width="99%" height={200}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartBox;
