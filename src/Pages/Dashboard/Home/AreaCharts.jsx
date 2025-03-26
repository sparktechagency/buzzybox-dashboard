import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetMonthlyEarningsQuery } from "../../../redux/apiSlices/homeSlice";

const datas = [
  { name: "Jan", pv: 2400 },
  { name: "Feb", pv: 1398 },
  { name: "Mar", pv: 9800 },
  { name: "Apr", pv: 3908 },
  { name: "May", pv: 4800 },
  { name: "Jun", pv: 3800 },
  { name: "Jul", pv: 4300 },
  { name: "Aug", pv: 3200 },
  { name: "Sep", pv: 4500 },
  { name: "Oct", pv: 5000 },
  { name: "Nov", pv: 5200 },
  { name: "Dec", pv: 6000 },
];

function AreaCharts({ year }) {
  const { data, isLoading } = useGetMonthlyEarningsQuery({ year });
  const [earningData, setEarningData] = useState([]);

  useEffect(() => {
    if (data) {
      const formatedData = Object.entries(data?.data).map(([name, pv]) => ({
        name,
        pv,
      }));
      setEarningData(formatedData);
    }
  }, [isLoading, year]);

  return (
    <ResponsiveContainer width="100%" height={265}>
      <AreaChart
        width={1400}
        height={200}
        data={earningData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffbf00" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ffc301" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid
          strokeDasharray="10 10"
          strokeWidth={0.5}
          vertical={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          // cursor={{ fill: "transparent" }}
          cursor={false}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#ffc301"
          fillOpacity={1}
          fill="url(#colorPv)"
          strokeWidth={5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaCharts;

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
