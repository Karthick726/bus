import React, { useEffect, useRef, useState } from "react";
import "./SeatInfo.css";
import { GrSteps } from "react-icons/gr";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import client from "./../../../Common/Client/Client";
import { useNavigate } from "react-router-dom";

const initalData = {
  mobileNumber: "",
  email: "",
  proofIdNumber: "",
  proof: "",
};

const SeatInfo = ({ seatData, packages, booked, sepcial }) => {
   
   console.log(seatData)
    const bookedStatus=booked?.filter((value)=>value.status ==="booked")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [seatOpen, setSeatOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [term, setTerm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
const [timerStarted, setTimerStarted] = useState(false);
const [countdownExpired, setCountdownExpired] = useState(false);
let timerId = null;

  const [customerDetails, setCustomerDetails] = useState(initalData);
  const [error, setError] = useState({
    mobileNumber: "",
    email: "",
    proofIdNumber: "",
    proof: "",
  });


  useEffect(() => {
  if (timerStarted && !bookingSuccess) {
    timerId = setTimeout(() => {
      setCountdownExpired(true);
      toast.error("Session expired. Redirecting to home...");
  
     window.location.href = "/";
    }, 20 * 60 * 1000);

    return () => clearTimeout(timerId);
  }
}, [timerStarted, bookingSuccess]);

  const [formErrors, setFormErrors] = useState({});

  let duration = "";
  if (packages?.startTime && packages?.endTime) {
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr
        .toString()
        .toLowerCase()
        .split(/(am|pm)/);
      let [hours, minutes] = time.trim().split(":").map(Number);

      if (modifier === "pm" && hours !== 12) hours += 12;
      if (modifier === "am" && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const start = parseTime(packages.startTime);
    const end = parseTime(packages.endTime);

    const startDate = new Date();
    startDate.setHours(start.hours, start.minutes, 0);

    const endDate = new Date();
    endDate.setHours(end.hours, end.minutes, 0);

    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate - startDate;
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
    const diffMinutes = Math.floor((diffMs / 1000 / 60) % 60);

    const paddedMinutes = diffMinutes.toString().padStart(2, "0");
    duration = `${diffHours} : ${paddedMinutes} Hrs`;
  }




  const isBookingAllowed = (journeyDateStr) => {

    console.log(journeyDateStr)
  // journeyDateStr example: "30/06/2025"
  const [day, month, year] = journeyDateStr.split("/");

  // Create journey date with start time at 5:30 AM
  const journeyStartTime = new Date(`${year}-${month}-${day}T05:30:00`);

  // Subtract 2 hours for booking cutoff
  const bookingCutoff = new Date(journeyStartTime.getTime() - 2 * 60 * 60 * 1000);

  // Current time
  const now = new Date();

  // Compare current time to cutoff time
  return now < bookingCutoff;
};

// useEffect(()=>{
//   const journeyDate = seatData?.date;

// if (!isBookingAllowed(journeyDate)) {
//   toast.error("Booking closed. Bookings are only allowed up to 2 hours before departure.");
//   navigate("/")
// } 
// },[seatData?.date])


  const handleOpen = () => {
    setSeatOpen(true);
  };

  const rows = parseInt(seatData?.layoutResult?.rows);
  const seats = seatData?.layoutResult?.seats || [];


  console.log(seats)
  const getSeatsForRow = (rowNumber) =>
    seats.filter((seat) => parseInt(seat.row) === rowNumber);

  const handleSeatChange = (seat) => {
  setSelectedSeats((prev) => {
    const exists = prev.find((s) => s.id === seat._id);

    if (exists) {
      // If seat is already selected, deselect it
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[seat._id];
        return newErrors;
      });
      return prev.filter((s) => s.id !== seat._id);
    } else {
      // If max seat limit reached, remove the first selected seat
      let updatedSeats = [...prev];
      if (prev.length === 5) {
        toast.dismiss();
        toast.error("Maximum 5 seats allowed.");
       return updatedSeats;
      }

      return [
        ...updatedSeats,
        {
          id: seat._id,
          number: seat.number,
          row: seat.row,
          price: packages.price,
          name: "",
          age: "",
          gender: "",
          agegroup: "",
        },
      ];
    }
  });
};


  console.log(selectedSeats)

  const handleDetailsChange = (seatId, fieldName, fieldValue) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          const updatedSeat = { ...seat, [fieldName]: fieldValue };
          const alphabetRegex = /^[A-Za-z\s]+$/;
          // Name validation
          if (fieldName === "name") {
            if (fieldValue.trim().length < 3) {
              setFormErrors((prev) => ({
                ...prev,
                [seatId]: {
                  ...prev[seatId],
                  name: "Name must be at least 3 characters",
                },
              }));
            } else if (!alphabetRegex.test(fieldValue)) {
              setFormErrors((prev) => ({
                ...prev,
                [seatId]: {
                  ...prev[seatId],
                  name: "Name must only contain alphabets",
                },
              }));
            } else {
              setFormErrors((prev) => ({
                ...prev,
                [seatId]: { ...prev[seatId], name: "" },
              }));
            }
          }

          //age validation
          if (fieldName === "age") {
            const numericRegex = /^[1-9][0-9]{0,2}$/; // 1 to 999, cannot start with 0

            if (!numericRegex.test(fieldValue.trim())) {
              setFormErrors((prev) => ({
                ...prev,
                [seatId]: {
                  ...prev[seatId],
                  age: "Age must be a number",
                },
              }));
            } else {
              setFormErrors((prev) => ({
                ...prev,
                [seatId]: { ...prev[seatId], age: "" },
              }));
            }
          }

          if (fieldName === "gender") {
            setFormErrors((prev) => ({
              ...prev,
              [seatId]: { ...prev[seatId], gender: "" },
            }));
          }
          // Age-based logic (from previous step)
          if (fieldName === "age") {
            const age = parseInt(fieldValue);
            if (!isNaN(age)) {
              if (age <= 12) {
                updatedSeat.agegroup = "child";
                updatedSeat.price = Number(packages.price) - 200;
              } else if (age >= 60) {
                updatedSeat.agegroup = "senior-citizen";
                updatedSeat.price = Number(packages.price) - 200;
              } else {
                updatedSeat.agegroup = "adult";
                updatedSeat.price = Number(packages.price);
              }
            } else {
              updatedSeat.agegroup = "";
              updatedSeat.price = Number(packages.price);
            }
          }

          return updatedSeat;
        }
        return seat;
      })
    );
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + parseInt(seat.price),
    0
  );

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

    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (fieldValue === "") {
        message = "";
      } else if (!emailRegex.test(fieldValue)) {
        message = `Email is Invalid`;
      } else {
        message = "";
      }
    }

    if (fieldName === "proofIdNumber") {
      const isValid = /^[A-Za-z0-9]+$/.test(fieldValue);
      if (!isValid || fieldValue.length < 10) {
        message = "Proof ID  Number is invalid";
      } else {
        message = "";
      }
    }



    return { message: message };
  };

  const handleDown = (e) => {
    if (e.key === " " && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    const err = errorMessage(name, value).message;

    setError((pre) => ({
      ...pre,
      [name]: err,
    }));

    setCustomerDetails((pre) => ({
      ...pre,
      [name]: value,
    }));
  };


  const handleProofChange=(e)=>{
      const { name, value } = e.target;

    const err = errorMessage(name, value).message;

    setError((pre) => ({
      ...pre,
      [name]: err,
    }));

    setCustomerDetails((pre) => ({
      ...pre,
      [name]: value,
      proofIdNumber:""
    }));
  }
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (value === "") {
      setError((pre) => ({
        ...pre,
        [name]: `${name} is Required`,
      }));
    }
  };

  const handleSubmit = () => {
    toast.dismiss();
    if (selectedSeats.length === 0) {
      toast.error("select aleast one seat ");
      return;
    }
    if (customerDetails.mobileNumber === "") {
      setError((prev) => {
        return {
          ...prev,
          mobileNumber: "Mobile number is required",
        };
      });

      return;
    }

    if (customerDetails.proof === "") {
      setError((prev) => {
        return {
          ...prev,
          proof: "proof is required",
        };
      });
           return;
    }
    if (customerDetails.proofIdNumber === "") {
      setError((prev) => {
        return {
          ...prev,
          proofIdNumber: "proofIdNumber is required",
        };
      });

      return ;
    }

    let hasErrors = false;

    const updatedErrors = {};

    selectedSeats.forEach((seat) => {
      const seatErrors = {};

      if (!seat.name || seat.name.trim().length < 3) {
        seatErrors.name = "Name is required and must be at least 3 characters";
        hasErrors = true;
      }

      const age = parseInt(seat.age);
      if (!seat.age || isNaN(age) || age <= 0) {
        seatErrors.age = "Valid age is required";
        hasErrors = true;
      }

      if (!seat.gender) {
        seatErrors.gender = "Gender is required";
        hasErrors = true;
      }

      if (!seat.agegroup) {
        seatErrors.agegroup = "Age group is missing or invalid";
        hasErrors = true;
      }

      if (Object.keys(seatErrors).length > 0) {
        updatedErrors[seat.id] = seatErrors;
      }
    });

    if (hasErrors) {
      setFormErrors(updatedErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    if (
      error.email !== "" ||
      error.mobileNumber !== "" ||
      error.proof !== "" ||
      error.proofIdNumber !== ""
    ) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    if (!term) {
      toast.error("Please accpect the term and condition");
      return;
    }


    if(seatData?.date){
        const journeyDate = seatData?.date;

if (!isBookingAllowed(journeyDate)) {
  toast.error("Booking closed. Bookings are only allowed up to 2 hours before departure.");
  navigate("/")
  return
} else {
 bookingConfirm();
}


    }

   
  };

  const generatePNR = () => {
    const randomPart = Math.floor(100000000 + Math.random() * 900000000);

    const randPad = randomPart.toString().padStart(9, "0");
    return `T${randPad}`;
  };

  const bookingConfirm = async () => {
    try {
      setLoading(true);
      const response = await client.post(
        "/razorpay/payment",
        {
          date: seatData?.date,
          totalPrice,
          BookingDetails: selectedSeats,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
         setTimerStarted(true); 
        setLoading(false);
        const options = {
          key: "rzp_test_4THACgEOcz97Hi",
          amount: totalPrice * 100,
          currency: "INR",
          order_id: response.data?.order.id,
          name: "Bus Ticket Booking",
          description: "Seat Booking Payment",
          prefill: {
            contact: customerDetails.mobileNumber,
            email: customerDetails.email || "",
          },
          handler: async function (razorpayResponse) {
            setLoading(true);
            setBookingSuccess(true);
            const paymentId = razorpayResponse.razorpay_payment_id;
            const bookingData = await selectedSeats.map((seat) => ({
              ...seat,
              mobileNumber: customerDetails.mobileNumber,
              email: customerDetails.email,
              proof: customerDetails.proof,
              proofIdNumber: customerDetails.proofIdNumber,
              PNR: generatePNR(),
              order_id: response.data?.order.id,
              payment_id: paymentId,
              totalprice:totalPrice,
              totalTicket:selectedSeats.length
            }));
            try {
              const responseBooking = await client.post(
                "/booking/verify",
                {
                  date: seatData?.date,
                  bookingData,
                  razorpayResponse,
                },
                {
                  withCredentials: true,
                }
              );

              if (responseBooking.status === 200) {
                setLoading(false);
                setBookingSuccess(true)
                saveBooking(
                  razorpayResponse.razorpay_payment_id,
                  razorpayResponse.razorpay_order_id
                );
              }
            } catch (err) {
              setLoading(false);
              if (err.response.status === 400) {
                toast.error(err.response.data.message);
              }
          
            }
          },
           modal: {
    ondismiss: async function () {
      toast.error("Payment was cancelled or failed.");
          navigate("/")
  setBookingSuccess(true)
      try {
         const responseUnlock= await client.post("/booking/unlock", {
          date: seatData?.date,
          seatIds: selectedSeats.map((seat) => seat.id),
        }, { withCredentials: true });
        if(responseUnlock.status===200){
            setLoading(false);
        }
      } catch (unlockErr) {
          setLoading(false);
        console.error("Unlock failed:", unlockErr);
      }
    },
  },

          theme: {
            color: "#3399cc",
          },
        };

       const razor = new window.Razorpay(options);

       razor.on("payment.failed", async function (response) {
 

  try {
    await client.post("/booking/unlock", {
      date: seatData?.date,
      seatIds: selectedSeats.map((seat) => seat.id),
    }, { withCredentials: true });
  } catch (err) {
    console.error("Unlock failed:", err);
  }

  // reset state
  setBookingSuccess(false);
  setTimerStarted(false);
  setCountdownExpired(false);
  setSelectedSeats([]);
  setCustomerDetails(initalData);

  // redirect home
  navigate("/");
   
  window.location.reload()
  toast.error("Payment failed. Redirecting to home...");
});
 razor.open();
      }
    } catch (err) {
      setLoading(false);
        setBookingSuccess(false)
        setTimerStarted(false)
        setCountdownExpired(false)
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      }
    }
  };

  const saveBooking = async (payment_id, order_id) => {
    setLoading(true);
    const bookingData = await selectedSeats.map((seat) => ({
      ...seat,
      mobileNumber: customerDetails.mobileNumber,
      email: customerDetails.email,
      proof: customerDetails.proof,
      proofIdNumber: customerDetails.proofIdNumber,
      PNR: generatePNR(),
      order_id: order_id,
      payment_id: payment_id,
      totalprice:totalPrice,
              totalTicket:selectedSeats.length
    }));

    try {
      const responseBooking = await client.post(
        "/booking/confirmbooking",
        {
          date: seatData?.date,
          bookingData,
        },
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      if (responseBooking.status === 200) {
        setLoading(false);

        const pdfBlob = new Blob([responseBooking.data], {
          type: "application/pdf",
        });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(pdfBlob);
        link.download = "Bus-ticket.pdf";
        link.click();
        toast.success("Booking Successfully");
        setSelectedSeats([]);
        setSeatOpen(false);
        setCustomerDetails(initalData);
        setTerm(false);
        setBookingSuccess(false)
        setTimerStarted(false)
        setCountdownExpired(false)
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      }
    }
  };



  return (
    <div className="container conn">
      {!packages || !booked ? (
        <div className="spinner-wrapper">
          <div className="spinner-border"></div>
          <div className="spinner-text">Loading</div>
        </div>
      ) : (
        packages && (
          <>
            <div className="bus-trip-card">
              <div className="bus-trip-header">
                <div className="booking-package booking-heading-subtitle">
                  <h2>{packages?.packageName}</h2>

                  <p className="journey-date">
                    Journey date : {seatData?.date}
                  </p>
                </div>
              </div>

              <div className="bus-trip-body">
                <div className="trip-details">
                  <div className="detail-block">
                    <p className="detail-label">Departure</p>
                    <p className="detail-value">{packages.startTime}</p>
                    <small>{packages.source}</small>
                  </div>
                  <div className="detail-block">
                    <p className="detail-label">Duration</p>
                    <p className="detail-value">{duration}</p>
                  </div>
                  <div className="detail-block">
                    <p className="detail-label">Arrival</p>
                    <p className="detail-value">{packages.endTime}</p>
                    <small>{packages.destination}</small>
                  </div>
                  <div className="detail-block">
                    <p className="detail-label">Price</p>
                    <p className="detail-value">₹{packages.price}</p>
                  </div>
                  <div className="detail-block">
                    <div>
                      <p className="detail-label">Seats Available</p>
                      <p className="detail-value">{`${
                        seatData?.layoutResult.seats.length - bookedStatus?.length
                      } avilable`}</p>
                    </div>

                    <button className="view-seats-btn" onClick={handleOpen}>
                      View Seats
                    </button>
                  </div>
                </div>
              </div>
              {seatOpen && (
                <>
                <div className="bus-layout-details">
                  {seatData && (
                    <div className="bus-layout-Info">
                      <div className="seat-hint">
                        <p>Click on Seat to select/deselect</p>
                      </div>

                      <div className="bus-container">
                        <div className="bus-row front-row">
                          <div className="bus-side left">
                            <GrSteps className="step-icon" />
                          </div>
                          <div className="bus-side right">
                            <p>Driver</p>
                          </div>
                        </div>

                        {seatData?.layoutResult.layout === "2x2"
                          ? [...Array(rows)].map((_, rowIndex) => {
                              const rowNumber = rowIndex + 1;
                              const rowSeats = getSeatsForRow(rowNumber);

                              const isLastRow = rowNumber === rows;
                              console.log(rowSeats)
                              if (isLastRow) {
                                return (
                                  <div
                                    className="bus-row back-row"
                                    key={rowNumber}
                                  >
                                    {rowSeats.map((seat) => {
                                      const bookedSeat = booked.find(
                                        (b) => b.id === seat._id
                                      );
                                      const seatStatus = bookedSeat
                                        ? bookedSeat.status
                                        : "available";

                                      return (
                                        <label
                                          className={`seat ${
                                            booked.find(
                                              (b) => b.id === seat._id
                                            )?.status === "booked"
                                              ? "bookedseat"
                                              : booked.find(
                                                  (b) => b.id === seat._id
                                                )?.status === "locked"
                                              ? "locked"
                                              : ""
                                          }`}
                                          key={seat._id}
                                        >
                                          {seatStatus !== "booked" && (
                                            <input
                                              type="checkbox"
                                              disabled={seatStatus === "locked"}
                                              checked={selectedSeats.some(
                                                (s) => s.id === seat._id
                                              )}
                                              onChange={() =>
                                                handleSeatChange(seat)
                                              }
                                            />
                                          )}

                                          <p className="booking-p">
                                            {seat.number}
                                          </p>
                                        </label>
                                      );
                                    })}
                                  </div>
                                );
                              }

                              const leftSide = rowSeats.slice(0, 2);
                              const rightSide = rowSeats.slice(2, 4);

                              return (
                                <div className="bus-row" key={rowNumber}>
                                  <div className="bus-side left">
                                    {leftSide.map((seat) => {
                                      const bookedSeat = booked.find(
                                        (b) => b.id === seat._id
                                      );
                                      const seatStatus = bookedSeat
                                        ? bookedSeat.status
                                        : "available";

                                      return (
                                        <label
                                          className={`seat ${
                                            booked.find(
                                              (b) => b.id === seat._id
                                            )?.status === "booked"
                                              ? "bookedseat"
                                              : booked.find(
                                                  (b) => b.id === seat._id
                                                )?.status === "locked"
                                              ? "locked"
                                              : ""
                                          }`}
                                          key={seat._id}
                                        >
                                          {seatStatus !== "booked" && (
                                            <input
                                              type="checkbox"
                                              disabled={seatStatus === "locked"}
                                              checked={selectedSeats.some(
                                                (s) => s.id === seat._id
                                              )}
                                              onChange={() =>
                                                handleSeatChange(seat)
                                              }
                                            />
                                          )}

                                          <p className="booking-p">
                                            {seat.number}
                                          </p>
                                        </label>
                                      );
                                    })}
                                  </div>
                                  <div className="aisle" />
                                  <div className="bus-side right">
                                    {rightSide.map((seat) => {
                                      const bookedSeat = booked.find(
                                        (b) => b.id === seat._id
                                      );
                                      const seatStatus = bookedSeat
                                        ? bookedSeat.status
                                        : "available";

                                      return (
                                        <label
                                          className={`seat ${
                                            booked.find(
                                              (b) => b.id === seat._id
                                            )?.status === "booked"
                                              ? "bookedseat"
                                              : booked.find(
                                                  (b) => b.id === seat._id
                                                )?.status === "locked"
                                              ? "locked"
                                              : ""
                                          }`}
                                          key={seat._id}
                                        >
                                          {seatStatus !== "booked" && (
                                            <input
                                              type="checkbox"
                                              disabled={seatStatus === "locked"}
                                              checked={selectedSeats.some(
                                                (s) => s.id === seat._id
                                              )}
                                              onChange={() =>
                                                handleSeatChange(seat)
                                              }
                                            />
                                          )}

                                          <p className="booking-p">
                                            {seat.number}
                                          </p>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })
                          : [...Array(rows)].map((_, rowIndex) => {
                              const rowNumber = rowIndex + 1;
                              const rowSeats = getSeatsForRow(rowNumber);

                              const leftSide = rowSeats.slice(3);
                              const rightSide = rowSeats.slice(0, 3);

                              return (
                                <div className="bus-row" key={rowNumber}>
                                  <div className="bus-side left">
                                    {leftSide.map((seat) => {
                                      const bookedSeat = booked.find(
                                        (b) => b.id === seat._id
                                      );
                                      const seatStatus = bookedSeat
                                        ? bookedSeat.status
                                        : "available";

                                      return (
                                        <label
                                          className={`seat ${
                                            booked.find(
                                              (b) => b.id === seat._id
                                            )?.status === "booked"
                                              ? "bookedseat"
                                              : booked.find(
                                                  (b) => b.id === seat._id
                                                )?.status === "locked"
                                              ? "locked"
                                              : ""
                                          }`}
                                          key={seat._id}
                                        >
                                          {seatStatus !== "booked" && (
                                            <input
                                              type="checkbox"
                                              disabled={seatStatus === "locked"}
                                              checked={selectedSeats.some(
                                                (s) => s.id === seat._id
                                              )}
                                              onChange={() =>
                                                handleSeatChange(seat)
                                              }
                                            />
                                          )}
                                          <p className="booking-p">
                                            {seat.number}
                                          </p>
                                        </label>
                                      );
                                    })}
                                  </div>
                                  <div className="aisle" />
                                  <div className="bus-side right">
                                    {rightSide.map((seat) => {
                                      const bookedSeat = booked.find(
                                        (b) => b.id === seat._id
                                      );
                                      const seatStatus = bookedSeat
                                        ? bookedSeat.status
                                        : "available";

                                      return (
                                        <label
                                          className={`seat ${
                                            booked.find(
                                              (b) => b.id === seat._id
                                            )?.status === "booked"
                                              ? "bookedseat"
                                              : booked.find(
                                                  (b) => b.id === seat._id
                                                )?.status === "locked"
                                              ? "locked"
                                              : ""
                                          }`}
                                          key={seat._id}
                                        >
                                          {seatStatus !== "booked" && (
                                            <input
                                              type="checkbox"
                                              disabled={seatStatus === "locked"}
                                              checked={selectedSeats.some(
                                                (s) => s.id === seat._id
                                              )}
                                              onChange={() =>
                                                handleSeatChange(seat)
                                              }
                                            />
                                          )}

                                          <p className="booking-p">
                                            {seat.number}
                                          </p>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                      <div className="color-variant">
                        <div className="legend-item">
                          <span className="legend-box available"></span>
                          <p>Available</p>
                        </div>
                        <div className="legend-item">
                          <span className="legend-box booked"></span>
                          <p>Booked</p>
                        </div>
                        <div className="legend-item">
                          <span className="legend-box locked"></span>
                          <p>Locked</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="passenger-details">
                    <div className="seat-hint">
                      <p>Booking Details</p>
                    </div>
                    <div className="passenger-details-form">
                      <div className="pd-details">
                        <div className="seat-hint">
                          <p
                            style={{
                              color: "#1c63c4",
                            }}
                          >
                            Passenger Details :
                          </p>
                        </div>
                        <div className="required-form">
                          <div className="input-field">
                            <label>Mobile Number *</label>
                            <input
                              type="text"
                              required
                              name="mobileNumber"
                              value={customerDetails.mobileNumber}
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

                                // Check if the pressed key is not allowed
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
                                  e.preventDefault(); // Prevent the default action of the disallowed key
                                }
                              }}
                              placeholder="Enter Your Mobile Number *"
                              maxLength={10}
                            />
                            {error.mobileNumber && (
                              <p className="error-text">{error.mobileNumber}</p>
                            )}
                          </div>
                          <div className="input-field">
                            <label>Email</label>
                            <input
                              type="text"
                              placeholder="Enter Your Email"
                              name="email"
                              value={customerDetails.email}
                              onChange={handleChange}
                              onKeyDown={(e) => {
                                handleDown(e);

                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ];
                                const allowedCharPattern = /^[0-9a-z._@-]$/;

                                // Check if the pressed key is not allowed
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
                                  e.preventDefault(); // Prevent the default action of the disallowed key
                                }
                              }}
                            />
                            {error.email && (
                              <p className="error-text">{error.email}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="id-proof">
                        <div className="seat-hint">
                          <p
                            style={{
                              color: "#1c63c4",
                            }}
                          >
                            Select Id Card Information :
                          </p>
                        </div>
                        <div className="required-form">
                          <div className="input-field">
                            <label>ID Proof *</label>
                            <select
                              required
                              defaultValue=""
                              name="proof"
                              value={customerDetails.proof}
                              onBlur={handleBlur}
                              onChange={handleProofChange}
                            >
                              <option value="" disabled>
                                Select ID Proof *
                              </option>
                              <option value="aadhar">Aadhar Card</option>
                              <option value="driving">Driving License</option>
                              <option value="voter">Voter ID</option>
                            </select>
                            {error.proof && (
                              <p className="error-text">{error.proof}</p>
                            )}
                          </div>
                          <div className="input-field">
                            <label>ID Proof Number *</label>
                            <input
                              type="text"
                              name="proofIdNumber"
                              value={customerDetails.proofIdNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={30}
                              onKeyDown={(e) => {
                                handleDown(e);

                                const allowedKeys = [
                                  "Backspace",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Delete",
                                  "Tab",
                                ];
                                const allowedCharPattern = /^[0-9a-zA-Z-]$/;

                                // Check if the pressed key is not allowed
                                if (
                                  !allowedKeys.includes(e.key) &&
                                  !allowedCharPattern.test(e.key)
                                ) {
                                  e.preventDefault(); // Prevent the default action of the disallowed key
                                }
                              }}
                              placeholder="Enter Your ID Proof Number *"
                            />
                            {error.proofIdNumber && (
                              <p className="error-text">
                                {error.proofIdNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="seat-proof">
                        <div>
                          <div className="seat-hint">
                            <p
                              style={{
                                color: "#1c63c4",
                              }}
                            >
                              Select seat Number :
                            </p>
                          </div>
                          <div className="seat-number">
                            {selectedSeats.map((value, index) => (
                              <p key={index}>{value.number}</p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="seat-hint">
                            <p
                              style={{
                                color: "#1c63c4",
                              }}
                            >
                              Enter a Passenger Details :
                            </p>
                          </div>
                          {selectedSeats.map((seat, index) => (
                            <div className="required-forms" key={seat.id}>
                              <div className="input-field">
                                <label>Name *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter Your Name *"
                                  maxLength={20}
                                  name={`name`}
                                  onChange={(e) =>
                                    handleDetailsChange(
                                      seat.id,
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    handleDown(e);

                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                      " ",
                                    ];
                                    const allowedCharPattern = /^[a-zA-Z-]$/;

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />
                                {formErrors[seat.id]?.name && (
                                  <span className="error-text">
                                    {formErrors[seat.id].name}
                                  </span>
                                )}
                              </div>

                              <div className="input-fields">
                                <label>Age *</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your Age"
                                  required
                                  name={`age`}
                                  maxLength={3}
                                  onChange={(e) =>
                                    handleDetailsChange(
                                      seat.id,
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                  onKeyDown={(e) => {
                                    handleDown(e);

                                    const allowedKeys = [
                                      "Backspace",
                                      "ArrowLeft",
                                      "ArrowRight",
                                      "Delete",
                                      "Tab",
                                      " ",
                                    ];
                                    const allowedCharPattern = /^[0-9-]$/;

                                    // Check if the pressed key is not allowed
                                    if (
                                      !allowedKeys.includes(e.key) &&
                                      !allowedCharPattern.test(e.key)
                                    ) {
                                      e.preventDefault(); // Prevent the default action of the disallowed key
                                    }
                                  }}
                                />

                                {formErrors[seat.id]?.age && (
                                  <span className="error-text">
                                    {formErrors[seat.id].age}
                                  </span>
                                )}
                              </div>

                              <div className="input-fields">
                                <label>Gender *</label>
                                <select
                                  required
                                  name={`gender`}
                                  defaultValue=""
                                  value={seat.gender || ""}
                                  onChange={(e) =>
                                    handleDetailsChange(
                                      seat.id,
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="" disabled>
                                    Gender *
                                  </option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="transgender">
                                    Transgender
                                  </option>
                                </select>
                                {formErrors[seat.id]?.gender && (
                                  <span className="error-text">
                                    {formErrors[seat.id].gender}
                                  </span>
                                )}
                              </div>

                              <div className="input-fields">
                                <label> Group *</label>
                                <select
                                  required
                                  name={`agegroup`}
                                  defaultValue=""
                                  disabled
                                  value={seat.agegroup || ""}
                                >
                                  <option value="" disabled>
                                    Group *
                                  </option>
                                  <option value="child">Child</option>
                                  <option value="adult">Adult</option>
                                  <option value="senior-citizen">Senior Citizen</option>
                                </select>
                              </div>

                              <div className="input-fields">
                                <label>Price *</label>
                                <input
                                  type="text"
                                  disabled
                                  required
                                  placeholder={`Seat: ${seat.number}`}
                                  name={`price-${seat.id}`}
                                  value={`price:${seat.price || 900}(Seat: ${
                                    seat.number
                                  })`}
                                  readOnly
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className="booking-summary"
                        style={{
                          borderRadius: "10px",
                          padding: "20px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        <div className="seat-hint">
                          <p
                            style={{
                              color: "#1c63c4",
                            }}
                          >
                            Booking Summary :
                          </p>
                        </div>

                        {selectedSeats.map((seat) => (
                          <div
                            key={seat.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "10px 0",
                              borderBottom: "1px solid #eee",
                            }}
                          >
                            <div>
                              <strong>{seat.name}</strong> ({seat.agegroup})
                              <br />
                              Seat: {seat.number}
                            </div>
                            <div style={{ fontWeight: "bold", color: "#333" }}>
                              ₹{seat.price}
                            </div>
                          </div>
                        ))}

                        <div
                          className="total-amount"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "green",
                          }}
                        >
                          <p>Total:</p>
                          <p>₹{totalPrice}</p>
                        </div>
                      </div>
                      <div className="booking-confirmation">
                        <div className="terms-container">
                          <input
                            type="checkbox"
                            onChange={() => setTerm(!term)}
                          />
                          <label className="terms-label">
                            I accept the <span onClick={()=>{
                              navigate("/terms")
                            }}
                            style={{
                              color:"blue",
                              cursor:"pointer"
                            }}>
                              Terms and Conditions
                              </span>
                          </label>
                        </div>

                        <button
                          className="confirm-button"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? "Booking ..." : "Confirm Booking"}
                        </button>
                      </div>
                    </div>
                                 <div className="bus-trip-note section1-card1s">
                                  <p>Note*</p>
                                  <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              <span className="point-content">
               Seats will be locked once you proceed to payment.
              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              <span className="point-content">
                You have 20 minutes to complete the payment.
              </span>
            </li>
             <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              <span className="point-content">
                If payment is not completed within 20 minutes, the seats will be automatically released.
              </span>
            </li>
             <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              <span className="point-content">
               On successful payment, your booking will be confirmed.
              </span>
            </li>
              <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              <span className="point-content">
              If you close the payment window or cancel, your seats will be unlocked.
              </span>
            </li>
          </ul>

</div>
                  </div>
                         
                </div>
    
</>
              )}

              {sepcial !== null && (
                <div className="special-section ">
                  <h5 className="special-heading">Special Instructions</h5>
                  <div className="special-box">
                    {sepcial?.placeInfo.map((item) => (
                      <div className="place-card" key={item._id}>
                        <h3 className="facilities-heading">{item.place}</h3>
                        <ul
                          className="about-us-list"
                          style={{
                            gap: "10px",
                          }}
                        >
                          {item.info
                            .split(".")
                            .filter((value) => value.trim() !== "")
                            .map((value, index) => {
                              return (
                                <li
                                  className="about-us-list-1"
                                  key={index}
                                  style={{
                                    width: "100%",
                                  }}
                                >
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
                                  <span className="point-content">{value}</span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

    
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SeatInfo;
