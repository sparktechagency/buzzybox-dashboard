import React, { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const generateRandomData = () => {
  let data = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("en", { month: "short" }),
    pv: Math.floor(Math.random() * 8000) + 1000,
  }));
  return data;
};

function TinyAreaChart() {
  const [data, setData] = useState(generateRandomData());
  const [isGrowing, setIsGrowing] = useState(true);

  useEffect(() => {
    // Determine growth by comparing first and last values
    const growing = data[data.length - 1].pv >= data[0].pv;
    setIsGrowing(growing);
  }, [data]);

  // Define colors based on growth status
  const growthColor = "#00c853";
  const declineColor = "#d50000";
  const currentColor = isGrowing ? growthColor : declineColor;

  // Create unique gradient IDs to prevent caching issues
  const gradientId = isGrowing ? "growthGradient" : "declineGradient";

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={currentColor} stopOpacity={0.8} />
            <stop offset="100%" stopColor={currentColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="pv"
          stroke={currentColor}
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TinyAreaChart;
