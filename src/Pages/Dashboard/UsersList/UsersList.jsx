import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd"; // Import Button
import user from "../../../assets/gtdandy/user.png";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetAllUsersQuery } from "../../../redux/apiSlices/userSlice";

function UsersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Track selected rows
  const { data } = useGetAllUsersQuery({
    page,
    searchTerm: searchQuery,
  });
  const userData = data?.data?.data;

  // format user data for table
  const formatedUsersData = userData?.map((item, index) => ({
    key: item?._id,
    username: item?.user?.name,
    email: item?.user?.email,
    phone: item?.user?.contact,
    giftsent: item?.totalGiftCards,
  }));

  // Handle Search
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Delete selected users
  // const [] = delete

  const handleDeleteSelected = () => {
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
            placeholder="Search by name or email"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200, height: 45 }}
          />
          {/* <ConfigProvider
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
          </ConfigProvider> */}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={formatedUsersData}
        className="px-10"
        pagination={{
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          position: ["bottomCenter"],
          onChange: (page) => setPage(page),
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
];
