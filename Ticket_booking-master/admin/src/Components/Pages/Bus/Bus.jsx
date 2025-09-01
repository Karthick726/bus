import React, { useEffect, useState } from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./Bus.css";
import client from "../../Common/Client/Client";
import { toast } from "react-hot-toast";

const BusLayout = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [layout, setLayout] = useState("6819d38acc13411e292deaf1");

  const handleClick = async () => {

     toast.dismiss()
    const dateObj = new Date(selectedDate);
 
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    try {
      const response = await client.post(
        "/bus/update-layoutdate",
        {
          date: formattedDate,
          busId: layout,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Layout change success");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to add quotes details");
      }
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active"> Bus layout</li>
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
          <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
            <div className="card-body" style={{ padding: "20px" }}>
              <h5
                className="card-title"
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                Change Bus layout Sepcial date
              </h5>

              <Grid container spacing={2}>
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Travel Date"
                      value={selectedDate}
                      disablePast
                      format="DD/MM/YYYY"
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Seat Layout</FormLabel>
                    <RadioGroup
                      row
                      value={layout}
                      onChange={(e) => setLayout(e.target.value)}
                      name="bus-layout"
                    >
                      <FormControlLabel
                        value="6819d38acc13411e292deaf1"
                        control={<Radio />}
                        label="2 + 2(41 seats)"
                      />
                        <FormControlLabel
                        value="68ad7b2100a4170b659882ff"
                        control={<Radio />}
                        label="2 + 2(28 seats)"
                      />
                      <FormControlLabel
                        value="6819d362cc13411e292deab9"
                        control={<Radio />}
                        label="3 + 2(54 seats)"
                      />
                   
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button variant="contained" color="success" onClick={handleClick}>
                Submit
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BusLayout;
