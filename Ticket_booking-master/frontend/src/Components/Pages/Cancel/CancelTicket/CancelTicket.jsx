import { useState } from "react";
import "./CancelTicket.css";
import toast from "react-hot-toast";
import client from "../../../Common/Client/Client";
import OtpCancel from "./OtpCancel";
import { useEffect } from "react";

const initalData = {
  mobileNumber: "",
  PNR: "",
};

const CancelTicket = ({ date }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cancelData, setCancelData] = useState(initalData);
  const [error, setError] = useState({
    mobileNumber: "",
    PNR: "",
  });
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    getPackage();
  }, []);

  const getPackage = async () => {
    try {
      const response = await client.get("/package/get-package", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setPackages(response.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  function canCancelTicket(journeyDate, startTime) {
    // 1. Convert journey date and time into a Date object
    const [day, month, year] = journeyDate.split("/").map(Number);
    const fullDateTimeStr = `${year}-${month}-${day} ${startTime}`;
    const journeyDateTime = new Date(fullDateTimeStr);

    // 2. Get current time
    const now = new Date();

    // 3. Calculate time difference in milliseconds
    const timeDiff = journeyDateTime.getTime() - now.getTime();

    // 4. Check if the difference is more than or equal to 24 hours
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    return timeDiff >= twentyFourHoursInMs;
  }

  const handleCancel = () => {
    toast.dismiss();

    if (!cancelData.mobileNumber && !cancelData.PNR) {
      setError((pre) => ({
        ...pre,
        mobileNumber: "Mobile Number is Required",
        PNR: "PNR is Required",
      }));
      return;
    }
    if (!cancelData.mobileNumber) {
      setError((pre) => ({
        ...pre,
        mobileNumber: "Mobile Number is Required",
      }));
      return;
    }

    if (!cancelData.PNR) {
      setError((pre) => ({
        ...pre,
        PNR: "PNR is Required",
      }));
      return;
    }

    if (error.mobileNumber !== "") {
      toast.error("Check the field Mobile Number");
      return;
    }
    if (error.PNR !== "") {
      toast.error("Check the field PNR");
      return;
    }
    let startTime = packages.startTime;
    if (!canCancelTicket(date, startTime)) {
      toast.error("Cancellation not allowed (less than 24 hrs)");
      return;
    }

    submitData();
  };

  const submitData = async () => {
    setLoading(true);
    try {
      const response = await client.post(
        "/cancel/ticket",
        {
          date: date,
          PNR: cancelData.PNR,
          mobileNumber: cancelData.mobileNumber,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setError({
          PNR: "",
          mobileNumber: "",
        });
        handleClickOpen();
      }
    } catch (err) {
      if (err.status === 404) {
        toast.error(err.response.data.message);
      }

      if (err.status == 400) {
        toast.error(err.response.data.message);
      }
      setLoading(false);
    }
  };

  const errorMessage = (fieldName, fieldValue) => {
    let message = "";

    if (fieldValue === "") {
      message = "";
    }

    if (fieldName === "mobileNumber") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (!/^\d+$/.test(fieldValue)) {
        message = "Mobile Number must contain only numbers";
      } else if (numericValue.length < 10) {
        message = "Mobile number needs 10 characters";
      } else if (numericValue.length > 10) {
        message = "Mobile number is too long";
      } else {
        const prefix = parseInt(numericValue.slice(0, 2), 10);
        if (!(prefix >= 63 && prefix <= 99)) {
          message = "Invalid Mobile Number";
        } else {
          message = "";
        }
      }
    }

    if (fieldName === "PNR") {
      const pnrslice = fieldValue.slice(0, 1);
      if (pnrslice !== "T") {
        message = "PNR number start with T";
      } else if (fieldValue.length < 10) {
        message = "PNR  needs 10 characters";
      } else {
        message = "";
      }
    }
    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const err = errorMessage(name, value).message;

    setError((pre) => ({
      ...pre,
      [name]: err,
    }));

    setCancelData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setError((pre) => ({
        ...pre,
        [name]: `${name} is Required`,
      }));
    }
  };

  const handleDown = (e) => {
    if (e.key === " " && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };

  const cancel = [
    "Cancellation is only available up to 24 hours before the journey.",
    "No cancellation or refund is allowed within 24 hours of the scheduled departure.",
  ];

  return (
    <div className="container conn">
      <div className="cancel-ticket">
        <div className="policy-cancel">
          <h3 className="cancel-title">Cancellation policy</h3>
          <ul className="ticket-cancellation-list">
            {cancel.map((value, index) => (
              <li className="ticket-cancellation-item" key={index}>
                <span className="about-us-listicons">
                  <svg
                    aria-hidden="true"
                    className="svg-inline--fa fa-check fa-w-14"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path>
                  </svg>
                </span>
                <span className="ticket-cancellation-text">{value}</span>
              </li>
            ))}
          </ul>
          <h3 className="cancel-title">Refund Fee</h3>
          <div className="table-responsive px-2 mt-2">
            <table className="table table-striped table-hover table-bordered ">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Percentage (Includes GST)</th>
                  <th>Razorpay Fee/GST</th>
                  <th>You Get</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Below ₹1000</td>
                  <td>4% (includes GST)</td>
                  <td>2.36%</td>
                  <td>₹960 (pay ₹1000)</td>
                </tr>
                <tr>
                  <td>₹1001 - ₹2500</td>
                  <td>3.28% (includes GST)</td>
                  <td>2.36%</td>
                  <td>₹2418 (pay ₹2500)</td>
                </tr>
                <tr>
                  <td>Above ₹2500</td>
                  <td>3.22% (includes GST)</td>
                  <td>2.36%</td>
                  <td>₹2903 (pay ₹3000)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="cancel-ticket-container">
          <h3 className="cancel-title">Cancel Your Ticket</h3>

          <div className="cancel-field">
            <label>Date of Journey *</label>
            <input type="text" value={date} readOnly />
          </div>

          <div className="cancel-field">
            <label>Phone Number *</label>
            <input
              type="text"
              placeholder="Enter phone number"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                handleDown(e);

                const allowedKeys = [
                  "Backspace",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Tab",
                ];
                const allowedCharPattern = /^[0-9-]$/;

                if (
                  !allowedKeys.includes(e.key) &&
                  !allowedCharPattern.test(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              name="mobileNumber"
              value={cancelData.mobileNumber}
            />
            {error.mobileNumber && (
              <p className="error-text">{error.mobileNumber}</p>
            )}
          </div>

          <div className="cancel-field">
            <label>PNR Number *</label>
            <input
              type="text"
              placeholder="Enter PNR number"
              value={cancelData.PNR}
              maxLength={10}
              name="PNR"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                handleDown(e);

                const allowedKeys = [
                  "Backspace",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Tab",
                ];
                const allowedCharPattern = /^[0-9A-Z-]$/;

                if (
                  !allowedKeys.includes(e.key) &&
                  !allowedCharPattern.test(e.key)
                ) {
                  e.preventDefault();
                }
              }}
            />
            {error.PNR && <p className="error-text">{error.PNR}</p>}
          </div>

          <button className="cancel-btn" onClick={handleCancel}>
            Cancel Ticket
          </button>
        </div>
      </div>
      <OtpCancel
       open={open}
        setOpen={setOpen}
        date={date}
        pnr={cancelData.PNR}
        phone={cancelData.mobileNumber}
        setCancelData={setCancelData}
        initalData={initalData}
      />
    </div>
  );
};

export default CancelTicket;
