import React from "react";
import { Select, Space, ConfigProvider, DatePicker } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Filter({ picker, placeholder }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            hoverBorderColor: "#ffeaa9",
          },
        },
      }}
    >
      <div className="shadow-md w-28 rounded mr-10 absolute top-0 right-0 mt-4">
        <DatePicker
          className="absolute"
          picker={picker}
          placeholder={placeholder}
        />
      </div>
    </ConfigProvider>
  );
}

export const WeeklyReport = () => {
  return (
    <div className="shadow-md w-28 rounded mr-10 absolute top-0 right-0 mt-4 bg-black">
      <Select
        className="absolute"
        defaultValue="thisweek"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: "thisweek",
            label: "This Week",
          },
          {
            value: "pastweek",
            label: "Past Week",
          },
        ]}
      />
    </div>
  );
};
