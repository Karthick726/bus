import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Grid, TextField, Button, Box } from "@mui/material";
import "./Offer.css"
import toast from "react-hot-toast";
import client from "../../Common/Client/Client";
import Loader from "../../Common/Layout/Loader/Loader";


const Offer = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [image,setImage]=useState(null)
  const [description,setDescription]=useState("")
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState({
    description:"",
    image:""
  })


    const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };

   const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }


    if (fieldName === "description") {
      if (fieldValue.length < 10) {
        message = "Please enter a valid description";
      } else {
        message = "";
      }
    }

    return { message: message };
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    setDescription(value)
  };


   const handleImageChange = (file) => {
  
    if (!file) {
      error.image = "Image is required.";
    } else {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 1000 * 1024; 
  
      if (!validTypes.includes(file.type)) {
       error.image = "Only PNG, JPG, or JPEG files are allowed.";
      } else if (file.size > maxSize) {
        error.image = "Image must be under 100 KB.";
      } else {
      error.image = "";
      }
    }
  
    setImage(file);
  };

console.log(image)
  const handleSubmit=()=>{

  toast.dismiss()

    if(!startDate || !endDate || description ==="" || image ===""){
         toast.error("please fill all field")

    }else if(error.description !=="" || error.image !==""){
         toast.error("please check all field before submit")
    }else{
        offerSubmit()
    }

  }

 const offerSubmit = async () => {
  let startDateOffer = dayjs(startDate).format("DD/MM/YYYY");
  let endDateOffer = dayjs(endDate).format("DD/MM/YYYY");
  setLoading(true)
  try {
    const formData = new FormData();
    formData.append("startDate", startDateOffer);
    formData.append("endDate", endDateOffer);
    formData.append("description", description);
    formData.append("image", image); 

    const response = await client.post("/offer/add-offer", formData, {
      withCredentials: true,
    });

    if (response.status === 200) {
      toast.success("Offer added successfully");
      setLoading(false);
      setStartDate(dayjs());
      setEndDate(dayjs());
      setImage(null);
      setDescription("");
    }
  } catch (err) {
    setLoading(false);
    console.log(err);
  }
};

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Add Offer Information</li>
          </ol>
        </nav>
      </div>

      <section
        className="section dashboard"
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
          <div className="card-body" style={{ padding: "20px" }}>
            <h5
              className="card-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Add offer Information
            </h5>
            <div className="offer">
   <Grid
                          item
                          size={{
                            xs: 6,
                              sm:12
                          }}
                        >
                          <div className="date-booking" style={{ margin: "0 auto",width:"100%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Select start Date"
                                value={startDate}
                                format="DD/MM/YYYY"
                                disablePast
                                onChange={(newValue) => setStartDate(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                            </LocalizationProvider>
                          </div>
                        </Grid>
                        <Grid
                          item
                          size={{
                            xs: 6,
                            sm:12
                          }}
                        >
                          <div className="date-booking" style={{ margin: "0 auto",width:"100%" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Select end Date"
                                value={endDate}
                                format="DD/MM/YYYY"
                                disablePast
                                onChange={(newValue) => setEndDate(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                            </LocalizationProvider>
                          </div>
                        </Grid>

                          <Grid
                                          item
                                          size={{
                                            xs: 12,
                                            sm:5
                                          }}
                                        >
                                           <Box>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageChange( e.target.files[0] || null)
                                }
                              />
                              {error.image && (
                                <p style={{ color: "red", fontSize: "0.9rem" }}>
                                  {error.image}
                                </p>
                              )}
                            </Box>
                                          </Grid>
            </div>
               <Grid
                              item
                              size={{
                                xs: 12,
                              }}
                            >
                              <TextField
                                label="Description"
                                fullWidth
                                required
                                name="description"
                                rows={2}
                                multiline
                                value={description}
                                onKeyDown={(e) => {
                                  if (description.length === 0 && e.key === " ") {
                                    e.preventDefault();
                                    return;
                                  }
            
                                  // Check if the pressed key is not allowed
                                    // Check if the pressed key is not allowed
                                      
                                }}
                                onChange={handleChange}
                                error={!!error.description}
                                onBlur={handleBlur}
                                helperText={error.description}
                                variant="outlined"
                                margin="normal"
                                slotProps={{
                                  htmlInput: {
                                    maxLength: 400,
                                  },
                                }}
                              />
                            </Grid>
          

            <Button
                          variant="contained"
                          color="primary"
                          style={{ display: "block", margin: "20px auto" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>

                        {loading && <Loader/>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Offer;
