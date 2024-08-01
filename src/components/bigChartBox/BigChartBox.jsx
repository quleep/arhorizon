import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
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

const BigChartBox = () => {
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
