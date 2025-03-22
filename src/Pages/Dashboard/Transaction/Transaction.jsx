import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import user from "../../../assets/gtdandy/user.png";

// UserAvatar Component
const UserAvatar = ({ user }) => (
  <div className="flex gap-2 items-center">
    <Avatar shape="square" size={30} src={user} />
    <p>John Doe</p>
  </div>
);

// Sample Data
const initialData = [
  {
    key: 1,
    date: "2021-09-01",
    customername: user,
    recipientname: "John Lennon",
    ocation: "Birthday",
    price: "$ 5",
    status: "Sent",
  },
  {
    key: 2,
    date: "2021-10-15",
    customername: user,
    recipientname: "Paul McCartney",
    ocation: "Anniversary",
    price: "$ 10",
    status: "pending",
  },
];

function Transaction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(initialData);

  // Handle search input change
  const handleSearch = (value) => setSearchQuery(value);

  // Filter data based on search query
  const filteredData = data.filter(
    (transaction) =>
      transaction.recipientname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.ocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // Handle delete function
  const handleDelete = () => {
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
  };

  // Columns Definition
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{new Date(date).toLocaleDateString()}</p>,
    },
    {
      title: "Customer Name",
      dataIndex: "customername",
      key: "customername",
      render: (customername) => <UserAvatar user={customername} />,
    },
    {
      title: "Recipient Name",
      dataIndex: "recipientname",
      key: "recipientname",
    },
    {
      title: "Ocation",
      dataIndex: "ocation",
      key: "ocation",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`${
            status === "Sent"
              ? "text-green-500"
              : status === "pending"
              ? "text-sky-500"
              : "text-red-500"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      key: "action",
      render: () => <MoreOutlined className="cursor-pointer w-10 h-10" />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: { rowSelectedBg: "#fef9eb", headerBg: "#fef9eb" },
          Pagination: {
            itemActiveBg: "#FFC301",
            itemBg: "black",
            borderRadius: "50px",
            colorText: "white",
          },
        },
      }}
    >
      {/* Pass selectedRowKeys and handleDelete to Head */}
      <Head
        onSearch={handleSearch}
        pagename="Transactions"
        selectedRowKeys={selectedRowKeys}
        handleDelete={handleDelete}
      />

      <Table
        columns={columns}
        rowSelection={rowSelection}
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

export default Transaction;

// Head Component (for Search Bar and Delete Button)
function Head({ onSearch, pagename, selectedRowKeys, handleDelete }) {
  return (
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
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-[20px] font-medium">{pagename}</h1>
        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search by Recipient, Ocation, Price, or Status"
            onChange={(e) => onSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200, height: 45 }}
          />
          {/* Conditionally show delete button next to search input */}
          {selectedRowKeys.length > 0 && (
            <Button
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="bg-gtdandy text-white px-4 h-11 rounded"
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
