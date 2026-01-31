import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  async function requestOTP() {
    await fetch("https://village-shop-backend-2.onrender.com/api/otp/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setStep(2);
  }

  async function verifyOTP() {
    const res = await fetch(
      "https://village-shop-backend-2.onrender.com/api/otp/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      },
    );

    const data = await res.json();
    localStorage.setItem("sessionId", data.sessionId);
    navigate("/shop-dashboard");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Shopkeeper Login</h2>

      {step === 1 && (
        <>
          <input
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <br />
          <button onClick={requestOTP}>Get OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br />
          <br />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
