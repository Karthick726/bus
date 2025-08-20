import React, { useState, useEffect } from "react";
import client from "../../../Common/Client/Client";

const Timer = ({
  initalData,
  setCancelData,
  setOtp,
  close,
  setResend,
  resend,
  date,
  pnr,
  setResendBtnDisable
}) => {
  const [seconds, setSeconds] = useState(120);

  const minuteRemaining = Math.floor(seconds / 60);
  const secondRemaining = seconds % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setResend(true);
           setResendBtnDisable(true)
          setOtp("");
          resetOtp();
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setResend, resend]);

  const resetOtp = async () => {
    try {
      const resetOtpResponse = await client.post("/cancel/resetOTP", {
        date,
        pnr,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {minuteRemaining} : {secondRemaining}
    </>
  );
};

export default Timer;
