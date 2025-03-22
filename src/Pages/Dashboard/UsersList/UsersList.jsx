import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd"; // Import Button
import user from "../../../assets/gtdandy/user.png";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function UsersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows
  const [userData, setUserData] = useState(data); // Store user data

  // Handle Search
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Filter data based on search query
  const filteredData = userData.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Delete selected users
  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]); // Reset selection
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#fef9eb",
            headerBg: "#fef9eb",
          },
          Pagination: {
            borderRadius: "50px",
            itemActiveBg: "#ffc301",
            itemHoverBg: "#ffc301",
            itemBg: "#000",
          },
        },
      }}
    >
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">User List</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Name, Email or Phone"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200, height: 45 }}
          />
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: "#ffc301",
                  defaultHoverColor: "black",
                  defaultHoverBorderColor: "none",
                },
              },
            }}
          >
            {selectedRowKeys.length > 0 && (
              <Button
                // type="primary"
                // danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteSelected}
                className="bg-gtdandy h-11"
              >
                Delete Selected
              </Button>
            )}
          </ConfigProvider>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        className="px-10"
        pagination={{
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          position: ["bottomCenter"],
        }}
      />
    </ConfigProvider>
  );
}

export default UsersList;

function UserAvatar({ user, username }) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar shape="square" size={40} src={user} />
      <p>{username}</p>
    </div>
  );
}

const columns = [
  {
    title: "User Name",
    dataIndex: "username",
    key: "username",
    render: (username) => <UserAvatar username={username} user={user} />,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Total Gift Card Sent",
    dataIndex: "giftsent",
    key: "giftsent",
  },
  {
    key: "action",
    render: () => <MoreOutlined className="cursor-pointer w-10 h-10" />,
  },
];

const data = [
  {
    key: 1,
    username: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    giftsent: 32,
  },
  {
    key: 2,
    username: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    giftsent: 32,
  },
  {
    key: 3,
    username: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    giftsent: 32,
  },
  {
    key: 4,
    username: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    giftsent: 15,
  },
  {
    key: 5,
    username: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    giftsent: 32,
  },
  {
    key: 6,
    username: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    giftsent: 32,
  },
  {
    key: 7,
    username: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    giftsent: 32,
  },
  {
    key: 8,
    username: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    giftsent: 15,
  },
  {
    key: 9,
    username: "John Doe",
    email: "test@gmail.com",
    phone: "+1234567890",
    giftsent: 32,
  },
  {
    key: 10,
    username: "Jane Smith",
    email: "test2@gmail.com",
    phone: "+1234567891",
    giftsent: 32,
  },
  {
    key: 11,
    username: "Mark Johnson",
    email: "test3@ymail.com",
    phone: "+1234567892",
    giftsent: 32,
  },
  {
    key: 12,
    username: "Alice Brown",
    email: "alice@gmail.com",
    phone: "+1234567893",
    giftsent: 15,
  },
];
