import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import AreaCharts from "./AreaCharts";
import { GoDotFill } from "react-icons/go";
import Filter from "./Filter";
import { TbUsersGroup } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { Flex, Space, Select } from "antd";
import { UserOutlined, GiftOutlined, DollarOutlined } from "@ant-design/icons";
import growth from "../../../assets/gtdandy/growth.png";
import UserStatistics from "./UserStatistics";
import TotalGifts from "./TotalGifts";
import TinyAreaChart from "./TinyAreaChart";
import { DatePicker } from "antd";
import { useGetStatsQuery } from "../../../redux/apiSlices/homeSlice";

const Card = ({ item }) => {
  return (
    <>
      <Flex
        gap={5}
        justify="space-between"
        align="center"
        className="bg-white rounded-md w-full h-36 px-8 shadow-md"
      >
        <Flex
          vertical
          align="normal"
          justify="space-between"
          className="h-32 w-1/2 py-6"
        >
          <Space size="small">
            <div className="w-5 h-5 flex items-center justify-center rounded-sm bg-[#FFC301] text-white">
              {item.icon}
            </div>
            <p className="text-[18px] text-black font-medium">{item.label}</p>
          </Space>
          <h1 className="text-4xl font-semibold text-[#FFC301]">
            {item.value}
          </h1>
        </Flex>
        <div className="w-52 h-24">
          {/* <img src={growth} alt="growth" className="w-20 h-20" /> */}

          <TinyAreaChart />
        </div>
      </Flex>
    </>
  );
};

const Home = () => {
  const [earningYear, setEarningYear] = useState(new Date().getFullYear());

  const { data } = useGetStatsQuery();
  const statsData = data?.data;

  const stats = [
    {
      label: "Active User",
      value: statsData?.totalUsers,
      icon: <UserOutlined />,
    },
    {
      label: "Card Sent",
      value: statsData?.totalGiftCards,
      icon: <GiftOutlined />,
    },
    {
      label: "Revenue",
      value: `$${statsData?.totalRevenue}`,
      icon: <DollarOutlined />,
    },
  ];

  return (
    <div className="px-10">
      <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md relative ">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-4 w-full ">
          {stats?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="w-full h-[360px] p-4 bg-white rounded mt-4 relative shadow-md">
        <h2 className="text-lg font-medium mb-2 py-2 px-3">Monthly Earnings</h2>
        <Filter
          picker="year"
          placeholder={new Date().getFullYear()}
          setValue={setEarningYear}
        />
        <AreaCharts year={earningYear} />
      </div>

      <Flex align="center" justify="space-between" gap={20}>
        <UserStatistics />
        <TotalGifts />
      </Flex>
    </div>
  );
};

export default Home;
