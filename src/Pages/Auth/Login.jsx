import { Checkbox, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { LoaderIcon } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveToAuth } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values) => {
    toast.loading("Logging in...", { id: "loginToast" });
    try {
      const response = await login(values).unwrap();

      if (response.success) {
        toast.success("Login Successful", { id: "loginToast" });
        const accessToken = response?.data?.accessToken;
        dispatch(saveToAuth({ data: { accessToken } }));
        navigate("/");
      }
    } catch (error) {
      toast.error(error || "Something went wrong", { id: "loginToast" });
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={
            <p className="text-black font-normal text-base">Enter Your Email</p>
          }
          rules={[
            {
              required: true,
              message: `Please Enter your email`,
            },
          ]}
        >
          <Input
            placeholder={`Enter Your email`}
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<p className="text-black font-normal text-base">Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 46,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-[#edb50e] hover:text-gtdandy font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 47,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",

              marginTop: 20,
            }}
            className="flex items-center justify-center bg-gtdandy rounded-lg text-base"
          >
            {isLoading ? <LoaderIcon /> : "Sign in"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
