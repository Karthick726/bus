import React, { useEffect, useState } from "react";
import Header from "../../Common/Layout/Header/Header";
import Footer from "../../Common/Layout/Footer/Footer";
import PageTop from "../../Common/PageTop/PageTop";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../../Common/Client/Client";
import SeatInfo from "./SeatInfo/SeatInfo";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { search, state } = useLocation();
  const navigate = useNavigate();
  const [seatData, setSeatData] = useState(null);
  const [booked, setBooked] = useState(null);
  const [sepcial,setSepcial]=useState(null)
  const [packages, setPackages] = useState(null);
  const query = new URLSearchParams(search);
  const date = query.get("date");

  useEffect(() => {
 if (date === state?.date) {
  if(!isBookingAllowed(date)){
    navigate("/")    
  }else{
     getLayout();
      getPackage();
      getSepcial()
  }
     
    } else {
      navigate("/");
    }
  }, []);

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

  const getLayout = async () => {
    try {
      const response = await client.get("/bus/get-busLayout", {
        params: {
          date: date,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSeatData(response.data);
        setBooked(response.data?.bookingSeat.map((value) =>{
          return {
            id:value.id,
            status:value.status
          }
        }))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSepcial=async()=>{
 try {
      const response = await client.get("/info/get-info", {
        params: {
          date: date,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
          setSepcial(response.data?.festivalInfo)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Header />
      <PageTop title={"Booking"} />
      <SeatInfo seatData={seatData} packages={packages} booked={booked} sepcial={sepcial}/>
      <Footer />
    </div>
  );
};

export default SeatLayout;
