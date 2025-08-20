import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import client from "../../Common/Client/Client";
import "./DateSelect.css";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../Common/spinner/Spinner";

const DateSelect = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [packages, setPackages] = useState(null);
  const navigate = useNavigate();

  const [minSelectableDate, setMinSelectableDate] = useState(dayjs());

  useEffect(() => {
    if (!packages?.startTime) return;
    const now = dayjs();

    const startTimeToday = dayjs(packages?.startTime, "hh:mm A");

    const fullStartDateTime = dayjs()
      .hour(startTimeToday.hour())
      .minute(startTimeToday.minute())
      .second(0);

    const bookingCutoff = fullStartDateTime.subtract(3, "hour");

    if (now.isAfter(bookingCutoff)) {
      setMinSelectableDate(dayjs().add(1, "day").startOf("day"));
    } else {
      setMinSelectableDate(dayjs().startOf("day"));
    }
  }, [packages]);

  useEffect(() => {
    getPackage();
  }, []);



  const getPackage = async () => {
    try {
      const response = await client.get("/package/get-package", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLoading(false);
        setPackages(response.data[0]);
      }
    } catch (err) {
      setLoading(false);
    
    }
  };

  


  const handleClick = async () => {
    toast.dismiss();
    if (!selectedDate) {
      toast.error("Select a date");
      return;
    }

      
    // const dateObj = new Date(selectedDate);

    // const day = String(dateObj.getUTCDate()).padStart(2, "0");
    // const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    // const year = dateObj.getUTCFullYear();

    const formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");

    // const formattedDate = `${day}/${month}/${year}`;
    navigate(`/seat-layout?date=${formattedDate}`, {
      state: {
        date: formattedDate,
      },
    });
  };
  const handleClickCancel = async () => {
    toast.dismiss();
    toast.dismiss();
    if (!selectedDate) {
      toast.error("Select a date");
      return;
    }

   
  
    const formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");

    navigate(`/cancel-ticket?date=${formattedDate}`, {
      state: {
        date: formattedDate,
      },
    });
  };

 
  return (
    <>
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner-border"></div>
          <div className="spinner-text">Loading</div>
        </div>
      ) : (
        <>
          <div className="container conn">
            <div className="date-container">
              {packages && (
                <div className="book-package-details">
                  <div className="booking-package booking-heading-subtitle">
                    <h2>{packages?.packageName}</h2>
                    <p>
                      {packages?.packageDay} Package:{" "}
                      <strong>
                        {packages?.startTime} – {packages?.endTime}
                      </strong>
                    </p>
                  </div>

                  <div className="package-facilities-section">
                    <h3 className="facilities-heading">Facilities</h3>
                    <ul className="about-us-list">
                      {packages.description.map((value, index) => (
                        <li className="about-us-list-1" key={index}>
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
                      ))}
                    </ul>
                  </div>
                  <div className="booking-package package-facilities-section">
                    <p>Select the Date for Tour Package</p>
                    <div className="date-booking">
                      <div>
                      
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Select Travel Date"
                            value={selectedDate}
                            disablePast
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setSelectedDate(newValue)}
                            minDate={minSelectableDate}
                            slotProps={{ textField: { fullWidth: true } }}
                          />
                        </LocalizationProvider>
                      </div>
                      <div className="button-bookingssss">
                        <Button
                          variant="contained"
                          className=""
                          onClick={handleClick}
                          style={{
                            backgroundColor: "#e89e25 ",
                          }}
                        >
                          Book Now
                        </Button>
                        <Button
                          variant="contained"
                          className="book-now-btns"
                          onClick={handleClickCancel}
                         
                        >
                          Cancel Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DateSelect;
