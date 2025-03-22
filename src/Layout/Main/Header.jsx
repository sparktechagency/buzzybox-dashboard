import React from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Badge, Space, Flex } from "antd";
import { Avatar, Dropdown, ConfigProvider } from "antd";
import { useUser } from "../../provider/User";
import logo from "../../assets/gtdandy/logo.png";
const Header = () => {
  const { user } = useUser();
  const src = user?.image?.startsWith("https")
    ? user?.image
    : `${imageUrl}/${user?.image}`;

  const items = [
    {
      label: <Link to="auth/login">Log Out</Link>,
      key: "0",
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: "16px",
          colorPrimaryBorderHover: "red",
        },
        components: {
          Dropdown: {
            paddingBlock: "5px",
          },
        },
      }}
    >
      <Flex
        align="center"
        className="w-100% px-10 py-2 shadow-md overflow-auto bg-white"
      >
        {/* Logo on the left with flex-grow */}
        <div className="flex-1">
          <img src={logo} width={200} alt="Logo" />
        </div>

        {/* Right-side icons and user info */}
        <Flex align="center" gap={20} justify="flex-end">
          {/* Notification Badge */}
          <div className="w-8 h-8 bg-[#fff9fc] flex items-center justify-center p-5">
            <Link to="/notification" className="h-fit mt-[10px]">
              <Badge dot>
                <FaRegBell color="#ffc301" size={24} />
              </Badge>
            </Link>
          </div>

          {/* User Profile */}
          <Link to="/setting" className="flex items-center gap-3">
            <Avatar shape="square" size={50} className="rounded" src={src} />
          </Link>

          {/* Dropdown Menu */}
          <Flex vertical align="start">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {`${user?.firstName} ${user?.lastName}`}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <p>Admin</p>
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default Header;
