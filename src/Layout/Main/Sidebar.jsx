import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi2";
import { TbDatabaseDollar } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { PiChartPieSliceFill, PiCopyBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbBulbFilled } from "react-icons/tb";
import { HiTicket } from "react-icons/hi2";
import { IoNewspaper } from "react-icons/io5";
import { IoBriefcase } from "react-icons/io5";
import { PiWallet } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { PiCirclesThreePlusLight } from "react-icons/pi";
import { RiSettings5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: <Link to="/">Overview</Link>,
    },
    // {
    //   key: "/contents",
    //   icon: <PiCopyBold size={24} />,
    //   label: <Link to="/contents">Contnets</Link>,
    // },
    {
      key: "/userlist",
      icon: <AiOutlineUser size={24} />,
      label: <Link to="/userlist">UserList</Link>,
    },
    // {
    //   key: "/earnings",
    //   icon: <TbDatabaseDollar size={24} />,
    //   label: <Link to="/earnings">Earnings</Link>,
    // },
    // {
    //   key: "/insight",
    //   icon: <TbBulbFilled size={24} />,
    //   label: <Link to="/insight">Insightful Tips</Link>,
    // },
    {
      key: "/transaction",
      icon: <PiWallet size={24} />,
      label: <Link to="/transaction">Transaction</Link>,
    },
    // {
    //   key: "/blogs",
    //   icon: <IoNewspaper size={24} />,
    //   label: <Link to="/blogs">Blogs</Link>,
    // },
    // {
    //   key: "/medicalhistory",
    //   icon: <IoBriefcase size={24} />,
    //   label: <Link to="/medicalhistory">Medical History</Link>,
    // },
    // {
    //     key: "/artists",
    //     icon: <HiUsers size={24} />,
    //     label: <Link to="/artists">Artists</Link>
    // },
    // {
    //     key: "/users",
    //     icon: <HiUserGroup size={24} />,
    //     label: <Link to="/users">User</Link>
    // },

    /* {
            key: "/admin",
            icon: <MdOutlineAdminPanelSettings size={24} />,
            label: <Link to="/admin">Make Admin</Link>
        }, */
    // {
    //     key: "/category",
    //     icon: <MdOutlineCategory size={24} />,
    //     label: <Link to="/category" >Category</Link>
    // },
    // {
    //     key: "/sub-category",
    //     icon: <BiSolidCategory size={24} />,
    //     label: <Link to="/sub-category" >Sub Category</Link>
    // },
    // {
    //     key: "/events",
    //     icon: <MdOutlineCategory size={24} />,
    //     label: <Link to="/events" >Events</Link>
    // },

    {
      key: "subMenuSetting",
      icon: <PiCirclesThreePlusLight size={24} />,
      label: "Cms",
      children: [
        // {
        //   key: "/banner",
        //   label: (
        //     <Link to="/banner" className="text-white hover:text-white">
        //       Banner
        //     </Link>
        //   ),
        // },
        // {
        //   key: "/profile",
        //   label: (
        //     <Link to="/profile" className="text-white hover:text-white">
        //       Personal Information
        //     </Link>
        //   ),
        // },
        {
          key: "/slider",
          label: (
            <Link to="/slider" className="text-white hover:text-white">
              Slider
            </Link>
          ),
        },
        {
          key: "/category",
          label: (
            <Link to="/category" className="text-white hover:text-white">
              Category
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/faq",
          label: (
            <Link to="/faq" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
        {
          key: "/contact",
          label: (
            <Link to="/contact" className="text-white hover:text-white">
              Contact Us
            </Link>
          ),
        },
        // {
        //   key: "/change-password",
        //   label: (
        //     <Link to="/change-password" className="text-white hover:text-white">
        //       Change Password
        //     </Link>
        //   ),
        // },
      ],
    },

    {
      key: "/setting",
      icon: <RiSettings5Line size={24} />,
      label: <Link to="/setting">Setting</Link>,
    },
    {
      key: "/logout",
      icon: <FiLogOut size={23} />,
      label: (
        <p onClick={handleLogout} className="text-black hover:text-white">
          Logout
        </p>
      ),
    },

    // {
    //   key: "/subscription",
    //   icon: <HiTicket size={24} />,
    //   label: <Link to="/subscription">Subscription</Link>,
    // },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="w-auto bg-white  rounded-lg  h-[full]">
      <Link to={"/"} className=" flex items-center justify-center py-4 ">
        <div className="w-auto flex items-center justify-center border border-gtdandy px-10 py-3 gap-5 rounded-lg">
          <PiChartPieSliceFill size={30} className=" rotate-90 text-gtdandy" />
          <p className="text-4xl font-semibold text-[18px] font-sans tracking-wider text-gtdandy">
            Dashboard
          </p>
        </div>
      </Link>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "#ffffff " }}
        items={menuItems}
        className="space-y-5 "
      />
    </div>
  );
};

export default Sidebar;
