import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Filter from "./Filter";
import { useGetMonthlyUsersQuery } from "../../../redux/apiSlices/homeSlice";

export default function UserStatistics() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [userData, setUserData] = useState([]);
  const { data, isLoading } = useGetMonthlyUsersQuery({ year });

  useEffect(() => {
    if (data) {
      const formatedData = Object.entries(data?.data).map(([name, pv]) => ({
        name,
        pv,
      }));
      setUserData(formatedData);
    }
  }, [isLoading, year]);

  return (
    <div className="w-1/2 h-[300px] bg-white p-4 rounded-md mt-4 relative shadow-md ">
      <h2 className="text-lg font-medium mb-4 ml-4">Total users statistics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={userData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          width={10}
          height={80}
        >
          <CartesianGrid
            strokeDasharray="none"
            strokeWidth={0.2}
            vertical={false}
          />
          <XAxis dataKey="name" />
          <YAxis hide={false} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          {/* <Legend /> */}
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          <Bar dataKey="pv" fill="#ffc301" barSize={25} />
        </BarChart>
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
            <div key={index}>{pld.value}</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
