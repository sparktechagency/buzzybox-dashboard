import React, { useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button } from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useGetAllTransactionsQuery } from "../../../redux/features/transaction/transactionApi";
import { maskLongString } from "../../../utils/maskLongString";
import { imageUrl } from "../../../redux/api/baseApi";

// UserAvatar Component
const UserAvatar = ({ user }) => (
  <div className="flex gap-2 items-center">
    <Avatar shape="square" size={30} src={`${imageUrl}${user?.profile}`} />
    <p>{user?.name}</p>
  </div>
);
function Transaction() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data } = useGetAllTransactionsQuery({ page, limit });
  const transactions = data?.data[0]?.data;
  const metaData = data?.data[0]?.meta;

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  // format data for table
  const formatedTransactions = transactions?.map((item, index) => ({
    key: index + 1,
    customername: item?.user,
    recipientname: item?.coverPage?.recipientName,
    paymentId: item?.paymentIntentId,
    price: item?.price,
    status: item?.paymentStatus,
  }));

  // Columns Definition
  const columns = [
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
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (paymentId) => <p>{maskLongString(paymentId)}</p>,
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
    // {
    //   key: "action",
    //   render: () => <MoreOutlined className="cursor-pointer w-10 h-10" />,
    // },
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
      <Head pagename="Transactions" selectedRowKeys={selectedRowKeys} />

      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={formatedTransactions}
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

export default Transaction;

// Head Component (for Search Bar and Delete Button)
function Head({ pagename }) {
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
          {/* <Input
            placeholder="Search by Recipient, Ocation, Price, or Status"
            onChange={(e) => onSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200, height: 45 }}
          /> */}
        </div>
      </div>
    </ConfigProvider>
  );
}
