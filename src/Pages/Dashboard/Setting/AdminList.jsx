import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Flex,
  Input,
  Table,
  Popover,
  Button,
  Modal,
  Form,
  ConfigProvider,
} from "antd";
import { MoreOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminMutation,
} from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";

const AdminList = () => {
  const { data, isLoading, refetch } = useGetAllAdminsQuery();
  const adminsData = data?.data?.data;

  // format admins data with adding Key property
  useEffect(() => {
    const formatedAdminsData = adminsData?.map((admin, index) => ({
      ...admin,
      key: index + 1,
    }));
    setAdmins(formatedAdminsData);
    setFilteredData(formatedAdminsData);
  }, [isLoading]);

  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState(adminsData);
  const [filteredData, setFilteredData] = useState(adminsData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [addAdminForm] = Form.useForm();
  const [editAdminForm] = Form.useForm();
  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = admins.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  // Open Add Admin Modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close Add Admin Modal
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();
  };

  const [addAdmin] = useCreateAdminMutation();

  // handle add admin
  const handleAddAdmin = async () => {
    toast.loading("Adding...", { id: "addAdminToast" });
    const values = await addAdminForm.validateFields();
    const cleanEmail = values.email.replace(/\.com.*/i, ".com");

    const newAdmin = {
      key: admins.length + 1,
      ...values,
      email: cleanEmail,
      role: "Admin",
    };

    try {
      const res = await addAdmin({ payload: newAdmin }).unwrap();
      if (res.success) {
        toast.success(res.message || "Added successfully", {
          id: "addAdminToast",
        });
        refetch();
        setIsAddModalOpen(false);
        addFormRef.current?.resetFields();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: "addAdminToast",
      });
    }
  };

  // Open Edit Admin Modal
  const showEditModal = (record) => {
    setSelectedAdmin(record);
    setIsEditModalOpen(true);
    setTimeout(() => {
      editFormRef.current?.setFieldsValue(record);
    }, 0);
  };

  // Close Edit Admin Modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    editFormRef.current?.resetFields();
  };

  const [updateAdmin] = useUpdateAdminMutation();

  // handle edit admin
  const handleEditAdmin = async (item) => {
    toast.loading("Updating...", { id: "editAdminToast" });
    const values = await editAdminForm.validateFields();

    try {
      const res = await updateAdmin({ payload: values, id: item._id }).unwrap();
      if (res.success) {
        toast.success(res.message || "Updated successfully", {
          id: "editAdminToast",
        });
        setIsEditModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: "editAdminToast",
      });
      console.error(error?.data);
    }
  };

  // Open Delete Admin Modal
  const showDeleteModal = (record) => {
    setSelectedAdmin(record);
    setIsDeleteModalOpen(true);
  };

  const [deleteAdmin] = useDeleteAdminMutation();

  // Confirm Delete Admin
  const handleConfirmDelete = async () => {
    toast.loading("Deleting...", { id: "deleteAdminToast" });
    if (!selectedAdmin) return;

    try {
      const res = await deleteAdmin({ id: selectedAdmin._id }).unwrap();
      if (res.success) {
        toast.success("Deleted successfully", { id: "deleteAdminToast" });
        refetch();
        setIsDeleteModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete", {
        id: "deleteAdminToast",
      });
      console.error(error?.data);
    }
  };

  return (
    <div className="w-[60%] bg-white rounded-lg shadow-lg p-5">
      <TableHead
        searchText={searchText}
        handleSearch={handleSearch}
        onAdd={showAddModal}
      />
      <TableBody
        filteredData={filteredData}
        onEdit={showEditModal}
        onDelete={showDeleteModal}
      />

      {/* Add Admin Modal */}
      <Modal
        title="Add Admin"
        open={isAddModalOpen}
        onCancel={handleCancelAdd}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form form={addAdminForm} layout="vertical" ref={addFormRef}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input placeholder="Name" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" className="h-12" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password missing" }]}
            >
              <Input.Password placeholder="Set a Password" className="h-12" />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelAdd} />
              <ButtonEDU actionType="save" onClick={handleAddAdmin} />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal
        title="Edit Admin"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form form={editAdminForm} layout="vertical" ref={editFormRef}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input placeholder="Name" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input placeholder="Role" className="h-12" />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelEdit} />
              <ButtonEDU
                actionType="save"
                onClick={() => handleEditAdmin(selectedAdmin)}
              />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Admin Modal */}
      <Modal
        title="Delete Admin"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
        centered
        className="z-50"
      >
        <DeleteAdmin
          name={selectedAdmin?.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
const TableHead = ({ searchText, handleSearch, onAdd }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        placeholder="Search admins..."
        value={searchText}
        onChange={handleSearch}
        className="w-1/3 h-10"
      />
      <ButtonEDU actionType="add" icon={<FaPlus />} onClick={onAdd}>
        Add Admin
      </ButtonEDU>
    </div>
  );
};
const TableBody = ({ filteredData, onEdit, onDelete }) => (
  <Table
    rowKey={(record) => record.key}
    columns={columns(onEdit, onDelete)}
    dataSource={filteredData}
    pagination={false}
    className="mt-5"
  />
);

const DeleteAdmin = ({ name, onConfirm, onCancel }) => (
  <Flex
    vertical
    justify="space-between"
    className="w-full h-full mb-3 mt-3"
    gap={20}
  >
    <Flex align="center" justify="center">
      Are you sure you want to delete{" "}
      <span className="font-bold ml-1">{name}</span>?
    </Flex>
    <div className="flex items-center justify-center gap-4">
      <ButtonEDU actionType="cancel" onClick={onCancel} />
      <ButtonEDU actionType="delete" onClick={onConfirm} />
    </div>
  </Flex>
);

const columns = (onEdit, onDelete) => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    key: "action",
    render: (_, record) => (
      <Popover
        content={
          <div className="flex gap-3">
            <Button onClick={() => onEdit(record)}>
              <EditFilled />
            </Button>
            <Button onClick={() => onDelete(record)} danger>
              <DeleteFilled />
            </Button>
          </div>
        }
        trigger="hover"
      >
        <MoreOutlined />
      </Popover>
    ),
  },
];
export default AdminList;
