import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email");
  const [verifyOtp] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();

  // handle otp verification
  const onFinish = async () => {
    toast.loading("Verifying OTP...", { id: "otpVerifyToast" });
    try {
      const data = {
        email: email,
        oneTimeCode: Number(otp),
      };
      const response = await verifyOtp(data).unwrap();
      if (response.success) {
        toast.success("OTP verified successfully", { id: "otpVerifyToast" });
        navigate(`/auth/reset-password?email=${email}&auth=${response.data}`);
      }
    } catch (error) {
      toast.error("Invalid OTP", { id: "otpVerifyToast" });
      console.log(error);
    }
  };

  // handle resend otp
  const handleResendOtp = async () => {
    toast.loading("Resending OTP...", { id: "resendOtpToast" });
    try {
      const data = {
        email: email,
      };
      const response = await resendOtp(data).unwrap();
      if (response.success) {
        toast.success("OTP sent successfully", { id: "resendOtpToast" });
      }
    } catch (error) {
      toast.error("Failed to resend OTP", { id: "resendOtpToast" });
      console.log;
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #ffc301 ",
              color: "#2B2A2A",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text>Don't received code?</Text>

          <p
            onClick={handleResendOtp}
            className="login-form-forgot"
            style={{ color: "#ffc301 ", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              height: 45,
              border: "1px solid #ffc301 ",
              outline: "none",
              boxShadow: "none",
              background: "#ffc301 ",
              color: "white",
            }}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
