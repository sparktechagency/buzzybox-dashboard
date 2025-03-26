import React from "react";
import { Select, ConfigProvider, DatePicker } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function Filter({ picker, placeholder, setValue }) {
  const handleYearChange = (value) => {
    setValue(value?.$y);
  };

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
          onChange={handleYearChange}
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
