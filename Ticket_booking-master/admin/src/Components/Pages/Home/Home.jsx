import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-hot-toast";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ContactsIcon from '@mui/icons-material/Contacts';
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import "./Home.css";
import client from "../../Common/Client/Client";
import bookings from "../../../Assets/Images/booking.avif";
import cancel from "../../../Assets/Images/cancel.jpg";
import contact from "../../../Assets/Images/contact.avif";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Home = () => {
  const [booking, setBooking] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
    const [userContact,setUserContact]=useState([])


       const dateObj = new dayjs();
      console.log(dateObj)
     const day = dateObj.date().toString().padStart(2, "0");
  const month = (dateObj.month() + 1).toString().padStart(2, "0"); 
  const year = dateObj.year();

    const formattedDate = `${day}/${month}/${year}`;

    

    const getUserContact=async()=>{
        try{
            const response = await client.get('/usercontact/get-user-contact',{
                withCredentials:true
            })
            if(response.status===200){
                setUserContact(response.data)
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
                toast.error("Login again");
              } else {
                toast.error("Failed to fetch user contact details");
              }
        }
    }

  const fetchData = async () => {
    try {
  const response = await client.get("/booking/get-booking", {
        params: {
          date: formattedDate,
        },
        withCredentials: true,
      });
       
      

      if(response.status===200){
 setBooking(response.data?.booking);
      }

     
     
    } catch (err) {

      console.log(err)
      toast.error("Failed to fetch data");
    }
  };
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (token) {
      fetchData();
      getUserContact()
    }
  }, [token]);

  const cancels = booking?.bookings?.filter((value)=>value.bookingStatus ==="Cancelled")
  const booked = booking?.bookings?.filter((value)=>value.bookingStatus ==="Booked")


  console.log("hi",booking,cancels,booked)
  // Get last 5 bookings
  const lastFiveBookings = userContact.slice(-5);

  return (
    <Fragment>
      <main
        id="main"
        className="main"
        style={{ backgroundColor: "#F9F9F9", padding: "20px" }}
      >
        <div className="pagetitle">
          <h1 style={{ fontWeight: "bold", color: "#333" }}>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: "#6C757D" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <Grid container spacing={10} sx={{ mt: 2, mb: 4 }}>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                position: "relative",
                color: "#000",
                p: 3,
                boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                borderRadius: 2,
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${bookings})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.5)",
                  zIndex: 1,
                },
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "0.3s",
                },
              }}
            >
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <BookOnlineIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                <Typography variant="h6" align="center">
                 Booking Count
                </Typography>
                <Typography variant="h4" align="center">
                  {booked ? booked.length :"0"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                position: "relative",
                 bgcolor: "#000",
                color: "#000",
                p: 3,
                boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                borderRadius: 2,
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${cancel})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.6,
                  zIndex: 1,
                },
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "0.3s",
                },
              }}
            >
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <EventBusyIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                 Cancel  Count
                </Typography>
                <Typography variant="h4" align="center" sx={{ color: "#fff" }}>
                       {cancels? cancels.length :"0"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                position: "relative",
                bgcolor: "#000",
                color: "#000",
                p: 3,
                boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)",
                borderRadius: 2,
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${contact})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.6,
                  zIndex: 1,
                },
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "0.3s",
                },
              }}
            >
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ContactsIcon sx={{ fontSize: 40, color: "#fbc02d" }} />
                <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
                  Booking Count
                </Typography>
                <Typography variant="h4" align="center" sx={{ color: "#fff" }}>
                 {userContact?.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="recent-bookings">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.2rem",
              mb: 2,
            }}
          >
            Bookings
          </Typography>
         <div className="booking-table" style={{ marginTop: "30px" }}>
                  {booking?.length === 0 ? (
                    <p>No bookings found for the selected date.</p>
                  ) : (
                     booked?.length === 0 ? (
                         <p>No  bookings found for the selected date.</p>
                      ) :(
                    <div>
                     
                      <div className="table-responsive px-2 mt-2">
                        <table className="table table-striped table-hover table-bordered ">
                          <thead>
                            <tr>
                              <th>Seat No</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Gender</th>
                              <th>Age Group</th>
                              <th>Mobile</th>
                              <th>Proof</th>
                              <th>Proof ID</th>
                              <th>PNR</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {booked.slice(-5)
                              .sort(
                                (a, b) =>
                                  parseInt(a.number) - parseInt(b.number)
                              )
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{item.number}</td>
                                  <td>{item.name}</td>
                                  <td>{item.age}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.agegroup}</td>
                                  <td>{item.mobileNumber}</td>
                                  <td>{item.proof}</td>
                                  <td>{item.proofIdNumber}</td>
                                  <td>{item.PNR}</td>
                                  <td>₹{item.price}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                      )
                  )}
                </div>
        </div>
         <div className="recent-bookings">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.2rem",
              mb: 2,
            }}
          >
           Cancel Bookings
          </Typography>
         <div className="booking-table" style={{ marginTop: "30px" }}>
                  {booking?.length === 0 ? (
                    <p>No bookings found for the selected date.</p>
                  ) : (
                     cancels?.length === 0 ? (
                         <p>No  bookings found for the selected date.</p>
                      ) :(
                    <div>
                     
                      <div className="table-responsive px-2 mt-2">
                        <table className="table table-striped table-hover table-bordered ">
                          <thead>
                            <tr>
                              <th>Seat No</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Gender</th>
                              <th>Age Group</th>
                              <th>Mobile</th>
                              <th>Proof</th>
                              <th>Proof ID</th>
                              <th>PNR</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cancels
                            .slice(-5)
                              .sort(
                                (a, b) =>
                                  parseInt(a.number) - parseInt(b.number)
                              )
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{item.number}</td>
                                  <td>{item.name}</td>
                                  <td>{item.age}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.agegroup}</td>
                                  <td>{item.mobileNumber}</td>
                                  <td>{item.proof}</td>
                                  <td>{item.proofIdNumber}</td>
                                  <td>{item.PNR}</td>
                                  <td>₹{item.price}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                      )
                  )}
                </div>
        </div>
         <div className="recent-bookings">
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "1.2rem",
              mb: 2,
            }}
          >
           Last 5 User Contact
          </Typography>
          <div className="table-responsive">
             {userContact.length> 0 ? (
              <div>
                  <table className="table table-striped table-hover table-bordered ">
                  <thead>
                    <tr
                     
                    >
                      <th style={{ padding: "8px" }}>Name</th>
                      <th style={{ padding: "8px" }}>Email</th>
                      <th style={{ padding: "8px" }}>Phone Number</th>
                      <th style={{ padding: "8px", width: "33%" }}>Message</th>
  
                    
                    </tr>
                  </thead>
                  <tbody>
                    {lastFiveBookings.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td style={{ padding: "8px" }}>{item.name}</td>
                                <td style={{ padding: "8px" }}>{item.email}</td>
                                <td style={{ padding: "8px" }}>{item.phoneNumber}</td>
                                <td style={{ padding: "8px" }}>{item.message}</td>
                     
                            </tr>)
                    })}
                    </tbody>
                    </table>
                   
          </div>
             ):(
                    <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      maxWidth: "300px",
                      margin: "20px auto",
                      textAlign: "center",
                    }}
                  >
                    <span
                      className="mb-2"
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#555",
                      }}
                    >
                      No User Contact Available
                    </span>
    
                   
                  </div>
             )}
            </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
