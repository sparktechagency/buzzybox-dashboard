import React, { useEffect, useState } from "react";
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

import Filter from "./Filter";
import { useGetMonthlyGiftsQuery } from "../../../redux/apiSlices/homeSlice";

export default function TotalGifts() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [giftsData, setGiftsData] = useState([]);
  const { data, isLoading } = useGetMonthlyGiftsQuery({ year });

  useEffect(() => {
    if (data) {
      const formatedData = Object.entries(data?.data).map(([name, pv]) => ({
        name,
        pv,
      }));
      setGiftsData(formatedData);
    }
  }, [isLoading, year]);

  return (
    <div className="w-1/2 h-[300px] bg-white p-4 rounded-md mt-4 relative shadow-md">
      <h2 className="text-lg font-medium mb-4 ml-4">Total Gift Sent</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={giftsData}
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
      <Filter
        className="absolute"
        picker="year"
        placeholder={new Date().getFullYear()}
        setValue={setYear}
      />
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
