import React, { useState } from "react";
import { Collapse, Modal, Form, Input, ConfigProvider, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FaqPopover from "../../../components/common/PopContent";
import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqsQuery,
  useUpdateFaqMutation,
} from "../../../redux/features/faq/faqApi";
import toast from "react-hot-toast";

// FAQ Header Component
export const HeadFaq = ({ showModal }) => (
  <div className="flex justify-between items-center py-5">
    <h1 className="text-[20px] font-medium">FAQ</h1>
    <button
      className="bg-gtdandy text-white px-4 py-2.5 rounded-md shadow-md"
      onClick={showModal}
    >
      <PlusOutlined size={24} className="mr-2" />
      Add New
    </button>
  </div>
);

// FAQ Collapse Component
export default function FaqCollapse() {
  const [activeKeys, setActiveKeys] = useState(["1"]);
  const { data } = useGetAllFaqsQuery();
  const faqData = data?.data?.data;

  // State for Add/Edit FAQ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState(null);
  const [form] = Form.useForm(); // Ant Design form instance

  // State for Delete Confirmation Modal
  const [deleteFaq, setDeleteFaq] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // backend api
  const [addFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaqFn] = useDeleteFaqMutation();

  // Open modal for adding a new FAQ
  const showAddModal = () => {
    setEditFaq(null);
    form.resetFields(); // Reset form when adding a new FAQ
    setIsModalOpen(true);
  };

  // Open modal for editing an existing FAQ
  const showEditModal = (faq) => {
    setEditFaq(faq);
    form.setFieldsValue(faq); // Pre-fill form with selected FAQ
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const showDeleteModal = (faq) => {
    setDeleteFaq(faq);
    setIsDeleteModalOpen(true);
  };

  // Handle update faq or add
  const handleSave = async (values) => {
    if (editFaq) {
      // edit faq
      toast.loading("Updating...", { id: "faqUpdateToast" });
      try {
        const res = await updateFaq({
          payload: values,
          id: editFaq._id,
        }).unwrap();
        if (res.success) {
          toast.success(res.message || "Updated successfully", {
            id: "faqUpdateToast",
          });
          setIsModalOpen(false);
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to udpate", {
          id: "faqUpdateToast",
        });
      }
    } else {
      // add faq
      toast.loading("Adding...", { id: "faqAddToast" });
      try {
        const res = await addFaq({ payload: values }).unwrap();
        if (res.success) {
          toast.success(res.message || "Added successfully", {
            id: "faqAddToast",
          });
          setIsModalOpen(false);
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to add", {
          id: "faqAddToast",
        });
      }
    }
  };

  // Handle Delete FAQ
  const handleDelete = async () => {
    toast.loading("Deleting...", { id: "faqDeleteToast" });
    try {
      const res = await deleteFaqFn({ id: deleteFaq._id }).unwrap();
      if (res.success) {
        toast.success(res.message || "Deleted successfully", {
          id: "faqDeleteToast",
        });
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete", {
        id: "faqDeleteToast",
      });
    }
  };

  // Generate FAQ items
  const getItems = () =>
    faqData?.map(({ _id, question, answer }) => {
      return {
        _id,
        label: (
          <div className="flex items-center justify-between ">
            {question}
            <FaqPopover
              onEdit={() => showEditModal({ _id, question, answer })}
              onDelete={() => showDeleteModal({ _id, question })}
            />
          </div>
        ),
        children: <p className="border-l-2 border-yellow-400 pl-4">{answer}</p>,
      };
    });

  return (
    <div className="min-h-[90vh] px-10">
      <HeadFaq showModal={showAddModal} />

      <Collapse
        bordered={false}
        activeKey={activeKeys}
        onChange={setActiveKeys}
        expandIcon={({ isActive }) => (
          <div
            className="flex items-center justify-center w-6 h-6 transition-transform duration-300 "
            style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
          >
            <PlusOutlined />
          </div>
        )}
        items={getItems()}
        className="shadow-md bg-white"
      />

      {/* Add/Edit FAQ Modal */}
      <Modal
        title={editFaq ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={null}
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
                itemMarginBottom: 8,
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="flex flex-col gap-5"
          >
            {/* Question */}
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input placeholder="Enter the question" className="h-12" />
            </Form.Item>

            {/* Answer */}
            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter the answer" }]}
            >
              <Input.TextArea placeholder="Enter the answer" rows={5} />
            </Form.Item>

            <div className="flex justify-end gap-4">
              <ButtonEDU
                actionType="cancel"
                onClick={() => {
                  form.resetFields(); // Reset the form fields
                  setIsModalOpen(false); // Close the modal
                }}
              />
              <ButtonEDU actionType="save" htmlType="submit" />
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete FAQ"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        centered
        footer={null}
      >
        <p>Are you sure you want to delete this FAQ?</p>
        <div className="flex justify-center gap-4 mt-4">
          <ButtonEDU
            actionType="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <ButtonEDU actionType="delete" onClick={handleDelete} />
        </div>
      </Modal>
    </div>
  );
}
