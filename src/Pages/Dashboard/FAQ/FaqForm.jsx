import React from "react";
import { Form, Input, Button } from "antd";
import TextEditor from "./TextEditor";

const FaqForm = () => {
  const [form] = Form.useForm(); // Ant Design form instance

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="flex flex-col gap-6 mt-8"
    >
      {/* Question Title */}
      <Form.Item
        label="Add Question Title"
        name="question"
        rules={[{ required: true, message: "Please enter a question title" }]}
      >
        <Input className="h-11" placeholder="Enter question title" />
      </Form.Item>

      {/* Answer */}
      <Form.Item
        label="Add Your Answer"
        name="answer"
        rules={[{ required: true, message: "Please enter an answer" }]}
      >
        <TextEditor />
      </Form.Item>

      {/* Submit Button */}
      <Button
        type="primary"
        htmlType="submit"
        className="bg-dashboard text-white"
        style={{ width: "180px", height: "50px", borderRadius: "8px" }}
      >
        Create FAQ
      </Button>
    </Form>
  );
};

export default FaqForm;
