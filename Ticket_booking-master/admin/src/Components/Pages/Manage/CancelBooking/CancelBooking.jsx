import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../Booking/ManageBooking.css";
import client from "../../../Common/Client/Client";
    import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



const CancelBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    toast.dismiss();
    if (selectedDate === "") {
      toast.error("Select a date");
      return;
    }
    const dateObj = new Date(selectedDate);

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    setLoading(true);
    getBooking(formattedDate);
  };


    function dateTime(date){
    console.log(date)
    const isoString = date;
const dateObj = new Date(isoString);

// Convert to IST
const istDateTime = dateObj.toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

return istDateTime
  }

  const getBooking = async (formattedDate) => {
    try {
      const response = await client.get("/booking/get-booking", {
        params: {
          date: formattedDate,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("response", response.data);

        setBooking(response.data.booking);
        setLoading(false);
        setOpen(true);
      }
    } catch (err) {
      setLoading(false);
      setOpen(false);
      console.log(err);
    }
  };

  const handleDownload = () => {
  if (!booking.bookings || booking.bookings.length === 0) {
    toast.error("No booking data available to download.");
    return;
  }

  // Sort by seat number
  const sortedBookings = [...booking.bookings].sort(
    (a, b) => parseInt(a.number) - parseInt(b.number)
  );

  // Map data for Excel
  const data = sortedBookings.filter((value)=>value.bookingStatus ==="Cancelled").map((item, index) => ({
           "S.no": index + 1,

        Name: item.name,
        "Seat No": item.number,
        Age: item.age,
        Gender: item.gender,
        "Age Group": item.agegroup,
        "Mobile Number": item.mobileNumber,

        PNR: item.PNR,
        Price: item.price,
        "Date/Time":dateTime(item.cancelTime)

  }));

  // Create worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Booking Data");

  // Export to file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(fileData, `cancel-booking-${booking.date}.xlsx`);
};


console.log(booking)


const cancel = booking?.bookings?.filter((value)=>value.bookingStatus ==="Cancelled")
console.log("cancel",cancel)
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage Booking Details</li>
          </ol>
        </nav>
      </div>
      <section
        className="section dashboard"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "70px",
        }}
      >
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body" style={{ padding: "20px" }}>
            <h5
              className="card-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
             Cancel Booking Details
            </h5>
            <div className="booking-package package-facilities-section">
              <p>Select the Date for view Cancel Booking</p>
              <div className="date-booking">
                <div>
                
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Travel Date"
                      value={selectedDate}
                      format="DD/MM/YYYY"
                      onChange={(newValue) => {
                        setSelectedDate(newValue);
                        setOpen(false);
                        setBooking([]);
                      }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <Button
                    variant="contained"
                    className=""
                    onClick={handleClick}
                    disabled={open}
                    style={{
                      backgroundColor: "#e89e25 ",
                    }}
                  >
                    submit
                  </Button>
                </div>
              </div>
              {open && (
                <div className="booking-table" style={{ marginTop: "30px" }}>
                  {booking.length === 0 ? (
                    <p>No Cancel bookings found for the selected date.</p>
                  ) : (
                    
                  cancel.length === 0 ? (
                         <p>No Cancel bookings found for the selected date.</p>
                      ) :(
 <div>
                      <div className="shown-details">
                        <div>
                          <p>Selected Date:{booking.date}</p>
                        </div>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleDownload}
                            style={{
                              backgroundColor: "green ",
                            }}
                          >
                            Download in Excel
                          </Button>
                        </div>
                      </div>
                      <div className="table-responsive px-2 mt-2">
                        <table className="table table-striped table-hover table-bordered ">
                          <thead>
                            <tr>
                            <th>S.no</th>
                              <th>Name</th>
                                <th>Seat No</th>
                              <th>Age</th>
                              <th>Gender</th>
                              <th>Age Group</th>
                              <th>Mobile</th>
                              <th>Proof</th>
                              <th>Proof ID</th>
                              <th>PNR</th>
                              <th>Price</th>
                                        <th>Date / Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...booking.bookings].filter((value)=>value.bookingStatus ==="Cancelled")
                              .sort(
                                (a, b) =>
                                  parseInt(a.number) - parseInt(b.number)
                              )
                              .map((item, index) => (
                                <tr key={index}>
                                 <td>{index+1}</td>
                                  <td>{item.name}</td>
                                   <td>{item.number}</td>
                                  <td>{item.age}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.agegroup}</td>
                                  <td>{item.mobileNumber}</td>
                                  <td>{item.proof}</td>
                                  <td>{item.proofIdNumber}</td>
                                  <td>{item.PNR}</td>
                                  <td>₹{item.price}</td>
                               <td>{dateTime(item.cancelTime)}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                      )
                    
                   
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CancelBooking;
