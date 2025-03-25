import React, { useState } from "react";
import { Modal, Form, Input, Button, Flex } from "antd";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { PiMapPinAreaLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
} from "../../../redux/features/contact/contactApi";
import toast from "react-hot-toast";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetContactInfoQuery();
  const contactInfo = data?.data[0];

  const [editedContact, setEditedContact] = useState({ ...contactInfo });

  const showModal = () => {
    setEditedContact({ ...contactInfo }); // Reset edits to original contact info
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle update contact info
  const [updateContact] = useUpdateContactInfoMutation();
  const handleUpdate = async (values) => {
    toast.loading("Updating...", { id: "contactUpdateToast" });
    try {
      const res = await updateContact({ payload: values }).unwrap();
      if (res.success) {
        toast.success(res.message || "Updated successfully", {
          id: "contactUpdateToast",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update", {
        id: "contactUpdateToast",
      });
    }
  };

  const handleChange = (key, value) => {
    setEditedContact((prev) => ({ ...prev, [key]: value }));
  };

  const contactFields = [
    { key: "phone", label: "Phone Number", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "location", label: "Location", type: "text" },
  ];

  return (
    <div className="px-10 py-5">
      <h1 className="text-[20px] font-medium mb-5">Contact</h1>
      <Flex vertical justify="center" gap={30} className="w-full">
        <div className="flex items-center justify-normal bg-white p-12 w-4/5 gap-4 rounded-xl ">
          {[
            {
              icon: <LiaPhoneVolumeSolid size={50} />,
              title: "Phone",
              details: contactInfo?.phone,
            },
            {
              icon: <CiMail size={50} />,
              title: "Email",
              details: contactInfo?.email,
            },
            {
              icon: <PiMapPinAreaLight size={50} />,
              title: "Location",
              details: contactInfo?.location,
            },
          ].map((item, index) => (
            <Flex
              vertical
              key={index}
              gap={20}
              align="center"
              className="flex-auto"
            >
              <div className="bg-white rounded-xl shadow-[0px_0px_15px_4px_rgba(0,_0,_0,_0.1)] p-4 hover:bg-gtdandy text-gtdandy hover:text-black">
                {item.icon}
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold">{item?.title}</h2>
                <p className="text-gray-600">{item?.details}</p>
              </div>
            </Flex>
          ))}
        </div>
        <button
          onClick={showModal}
          className="w-4/5 h-12 bg-white rounded-lg border border-1 border-gtdandy text-gtdandy font-bold tracking-wider hover:bg-gtdandy hover:text-white"
        >
          Edit Info
        </button>
      </Flex>

      {/* Edit Contact Modal */}
      <Modal
        title="Edit Contact"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
      >
        <div className="py-5">
          <Form
            layout="vertical"
            onFinish={handleUpdate}
            initialValues={editedContact}
          >
            {contactFields.map((field, i) => (
              <Form.Item
                key={i}
                label={field.label}
                name={field.key}
                rules={[
                  {
                    required: true,
                    message: `Please enter the ${field.label.toLowerCase()}`,
                  },
                  field.key === "email" && {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:
                      "Please enter a valid email address (e.g. test@example.com)",
                  },
                ].filter(Boolean)}
              >
                <Input
                  type={field.type}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="h-12 rounded-xl"
                  value={editedContact[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              </Form.Item>
            ))}

            <div className="flex justify-end gap-4">
              <ButtonEDU actionType="cancel" onClick={handleCancel} />
              <ButtonEDU actionType="update" htmlType="submit" />
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
