import React, { useState } from "react";
import {
  Table,
  ConfigProvider,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { PlusOutlined, CloudUploadOutlined } from "@ant-design/icons";
import ButtonEDU from "../../../components/common/ButtonEDU";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../redux/api/baseApi";
import { FaTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

function Category() {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploadedCategoryImage, setUploadedCategoryImage] = useState(null);
  const [uploadedOccasionImage, setUploadedOccasionImage] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);

  const showModal = () => {
    setIsEditing(false);
    form.setFieldsValue(null);
    setUploadedOccasionImage(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUploadedCategoryImage(null);
    setEditingKey(null);
  };

  // handle add or edit form
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const handleFormSubmit = async (values) => {
    if (!uploadedCategoryImage && !isEditing) {
      message.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    if (values.name) formData.append("name", values.name);
    if (values.categoryImage?.file?.originFileObj)
      formData.append(
        "categoryImage",
        values.categoryImage?.file?.originFileObj
      );
    if (values.occasionImage?.file?.originFileObj)
      formData.append(
        "occasionImage",
        values.occasionImage?.file?.originFileObj
      );

    if (isEditing) {
      // Update existing category
      toast.loading("Updating...", { id: "updateCategoryToast" });
      try {
        const res = await updateCategory({
          payload: formData,
          id: editingKey,
        }).unwrap();
        if (res.success) {
          toast.success("Updated successfully", { id: "updateCategoryToast" });
          handleCancel();
        }
      } catch (error) {
        toast.error("Failed to update", { id: "updateCategoryToast" });
        console.log(error);
      }
    } else {
      // Add new category
      toast.loading("Adding...", { id: "updateCategoryToast" });
      try {
        const res = await addCategory({ payload: formData }).unwrap();
        if (res.success) {
          toast.success("Added successfully", { id: "updateCategoryToast" });
          handleCancel();
        }
      } catch (error) {
        toast.error("Failed to add", { id: "updateCategoryToast" });
        console.log(error);
      }
    }
  };

  // handle category image upload
  const handleCategoryImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedCategoryImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // handle occasion image upload
  const handleOccasionImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedOccasionImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingKey(record?._id);
    setUploadedCategoryImage(record?.categoryImage);
    setUploadedOccasionImage(record?.occasionImage);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    setDeletingRecord(record);
    setIsDeleteModalOpen(true);
  };

  // handle delete category
  const [deleteCategory] = useDeleteCategoryMutation();
  const onConfirmDelete = async () => {
    toast.loading("Deleting...", { id: "deleteCategoryToast" });
    try {
      const res = await deleteCategory({ id: deletingRecord?._id }).unwrap();
      if (res.success) {
        toast.success("Deleted successfully", { id: "deleteCategoryToast" });
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to delete", { id: "deleteCategoryToast" });
      console.log(error);
    }
  };

  const onCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // format data for table
  const formatedCategoriesData = categories?.map((item, index) => ({
    _id: item?._id,
    key: index + 1,
    serial: index + 1,
    name: item?.name,
    categoryImage: item?.categoryImage,
    occasionImage: item?.occasionImage,
  }));

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
      render: (serial) => (
        <p className="font-bold text-black text-[16px]">
          {serial < 10 ? "0" + serial : serial}
        </p>
      ),
    },
    {
      title: "Category Image",
      dataIndex: "categoryImage",
      key: "categoryImage",
      render: (categoryImage) => (
        <img width={60} src={`${imageUrl}${categoryImage}`} alt="slider" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <FiEdit2
            style={{ fontSize: 24 }}
            className="text-black hover:text-blue-500 cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <RiDeleteBin6Line
            style={{ fontSize: 24 }}
            className="text-black hover:text-red-500 cursor-pointer"
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">Category</h1>
        <button
          className="bg-gtdandy text-white px-4 py-2.5 rounded-md flex items-center"
          onClick={showModal}
        >
          <PlusOutlined className="mr-2" />
          Add New
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowSelectedBg: "#fef9eb",
              headerBg: "#fef9eb",
              cellFontSize: "17px",
            },
            Pagination: {
              itemActiveBg: "#FFC301",
              itemBg: "black",
              borderRadius: "50px",
              colorText: "white",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={formatedCategoriesData}
          pagination={{
            pageSizeOptions: [5, 10, 15, 20],
            defaultPageSize: 8,
            position: ["bottomCenter"],
          }}
        />
      </ConfigProvider>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Confirmation"
        visible={isDeleteModalOpen}
        onCancel={onCancelDelete}
        footer={null}
        centered
      >
        <div className="flex flex-col justify-between gap-5">
          <div className="flex justify-center">
            Are you sure you want to delete{" "}
            <span className="font-bold ml-1">{deletingRecord?.name}</span>?
          </div>
          <div className="flex justify-center gap-4">
            <ButtonEDU actionType="cancel" onClick={onCancelDelete} />
            <ButtonEDU actionType="delete" onClick={onConfirmDelete} />
          </div>
        </div>
      </Modal>

      {/* Modal Form */}
      <Modal
        title={isEditing ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
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
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input placeholder="Enter slider name" className="h-12" />
            </Form.Item>

            {/* category image field */}
            <Form.Item
              label="Category Image"
              name="categoryImage"
              rules={[
                { required: true, message: "Please upload category image" },
              ]}
            >
              <Upload
                name="image"
                accept="image/png, image/jpeg"
                maxCount={1}
                listType="picture-card"
                showUploadList={false}
                onChange={handleCategoryImageUpload}
              >
                {uploadedCategoryImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        uploadedCategoryImage.includes("base64")
                          ? uploadedCategoryImage
                          : `${imageUrl}${uploadedCategoryImage}`
                      }
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <FaTrashCan
                      className="text-xl absolute top-1 right-1 text-red-500 hover:text-stone-800 cursor-pointer"
                      onClick={() => setUploadedCategoryImage(null)}
                    />
                  </div>
                ) : (
                  <button style={{ border: 0, background: "none" }}>
                    <CloudUploadOutlined style={{ fontSize: 24 }} />
                    <div>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>

            {/* occasion image field */}
            <Form.Item
              label="Occasion Image"
              name="occasionImage"
              rules={[
                { required: true, message: "Please upload occasion image" },
              ]}
            >
              <Upload
                name="image"
                accept="image/png, image/jpeg"
                maxCount={1}
                listType="picture-card"
                showUploadList={false}
                onChange={handleOccasionImageUpload}
              >
                {uploadedOccasionImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        uploadedOccasionImage.includes("base64")
                          ? uploadedOccasionImage
                          : `${imageUrl}${uploadedOccasionImage}`
                      }
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <FaTrashCan
                      className="text-xl absolute top-1 right-1 text-red-500 hover:text-stone-800 cursor-pointer"
                      onClick={() => setUploadedOccasionImage(null)}
                    />
                  </div>
                ) : (
                  <button style={{ border: 0, background: "none" }}>
                    <CloudUploadOutlined style={{ fontSize: 24 }} />
                    <div>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>

            <div className="flex justify-end">
              <ButtonEDU actionType="save" />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  );
}

export default Category;
