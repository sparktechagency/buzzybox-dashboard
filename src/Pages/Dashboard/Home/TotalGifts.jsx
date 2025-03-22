import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { WeeklyReport } from "./Filter";

export default function TotalGifts() {
  const data = [
    { name: "Mo", pv: 2400, amt: 2400 },
    { name: "Tu", pv: 1398, amt: 2210 },
    { name: "We", pv: 9800, amt: 2290 },
    { name: "Th", pv: 3908, amt: 2000 },
    { name: "Fr", pv: 4800, amt: 2181 },
    { name: "St", pv: 3800, amt: 2500 },
    { name: "Su", pv: 4300, amt: 2100 },
  ];

  return (
    <div className="w-1/2 h-[300px] bg-white p-4 rounded-md mt-4 relative shadow-md">
      <h2 className="text-lg font-medium mb-4 ml-4">Total Gift Sent</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeWidth={0.5}
            vertical={false}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="pv"
            dot={false}
            stroke="#ffc301"
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
      <WeeklyReport />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        {/* Arrow (pointing left) */}
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gtdandy -left-2"></div>

        {/* Tooltip Content */}
        <div className="bg-gtdandy p-2 text-white rounded shadow-md ">
          {payload.map((pld, index) => (
            <div key={index}>{pld.value}K</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
