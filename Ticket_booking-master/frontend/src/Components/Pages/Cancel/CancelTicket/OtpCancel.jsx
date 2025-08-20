import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import client from "../../../Common/Client/Client";
import Timer from "./Timer";
import { toast } from 'react-hot-toast';

const OtpCancel = ({
  open,
  setOpen,
  date,
  pnr,
  phone,
  initalData,
  setCancelData,
}) => {

  const [otp, setOtp] = useState();
  const [resend, setResend] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [resendBtnDisable, setResendBtnDisable] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setCancelData(initalData);
    setOtp("");
  };

  const otpSend = async () => {
 
  toast.dismiss()
    try {
      const otpSendResponse = await client.post("/cancel/otpVerification", {
        otp,
        date,
        pnr,
      });
      if (otpSendResponse.status === 200) {
        toast.success("Cancelled Successfully");
        handleClose();
        setOtp("");
        setCancelData(initalData);
    
      }
    } catch (error) {

      if (error.status === 401) {
        toast.error(error.response.data.message);
      }

      if (error.status === 429) {
        toast.error(error.response.data.message);
        handleClose();
        setCancelData(initalData);
        setOtp("");
      }
    }
  };

  const resendOTP = async () => {
    setResendBtnDisable(false);
    toast.dismiss()
    try {
      const response = await client.post(
        "/cancel/ticket",
        {
          date: date,
          PNR: pnr,
          mobileNumber: phone,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setResend(false);
        setTimerKey((prev) => prev + 1);
      }
    } catch (err) {
      if (err.status === 404) {
        toast.error(err.response.data.message);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="toast.error-dialog-title"
        aria-describedby="toast.error-dialog-description"
        disableEscapeKeyDown
      >
        <DialogTitle id="toast.error-dialog-title">
          {"Enter your OTP here"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="toast.error-dialog-description">
            <TextField
              id="standard-basic"
              label="Enter your OTP"
              variant="standard"
              onChange={(e) => setOtp(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <div>
          <p className="timer-remain">
            Time Remaining:&nbsp;&nbsp;
            <Timer
              key={timerKey}
              initalData={initalData}
              setCancelData={setCancelData}
              setOtp={setOtp}
              close={handleClose}
              setResend={setResend}
              resend={resend}
              date={date}
              pnr={pnr}
                 setResendBtnDisable={setResendBtnDisable}
            />
          </p>
          {resend ? (
            <div style={{display:'flex',justifyContent:'center'}}>
              <Button onClick={resendOTP} disabled={!resendBtnDisable}>Resend</Button>
            </div>
          ) : (
            ""
          )}
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={otpSend} autoFocus disabled={resend}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OtpCancel;
