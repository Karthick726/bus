import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { TextField, styled, Button, Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import "./Package.css";
import client from './../../Common/Client/Client';



const initalData = {
  price:"",
source: "",
  destination: "",
  packageName:"",
  description: "",
  packageDay:""
};

const Vacation = () => {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(dayjs().hour(9).minute(0));
  const [endTime, setEndTime] = useState(dayjs().hour(17).minute(0));
  const [Place, setPlace] = useState([
    { value: "", error: "", image: null, imageError: "" },
  ]);

  const [error, setError] = useState({
    price:"",
    packageName:"",
    description: "",
    packageDay:"",
    source: "",
    destination: "",
  });

  const [vacation, setVacation] = useState(initalData);



  const handlesourveChange = (index, e) => {
    const { value } = e.target;
    const newSourcePlace = [...Place];
    newSourcePlace[index].value = value;

    if (value.length < 3) {
      newSourcePlace[index].error =
        "place must be at least 3 characters.";
    } else {
      newSourcePlace[index].error = "";
    }

    setPlace(newSourcePlace);
  };



  const handleSourceBlur = (index, e) => {
    const { value } = e.target;
    const newSourcePlace = [...Place];
    if (value === "") {
      newSourcePlace[index].error = " place covered is required.";
    }
    setPlace(newSourcePlace);
  };

  
  const addsourceField = () => {
    toast.dismiss();
    const lastField = Place[Place.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error || lastField.image === null) {
      toast.error("Fix the errors before adding a new place.");
    } else {
      setPlace([
        ...Place,
        { value: "", error: "", image: null, imageError: "" },
      ]);
    }
  };


  const handleImageChange = (index, file) => {
    const newPlaces = [...Place];
  
    if (!file) {
      newPlaces[index].image = null;
      newPlaces[index].imageError = "Image is required.";
    } else {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      const maxSize = 100 * 1024; 
  
      if (!validTypes.includes(file.type)) {
        newPlaces[index].image = null;
        newPlaces[index].imageError = "Only PNG, JPG, or JPEG files are allowed.";
      } else if (file.size > maxSize) {
        newPlaces[index].image = null;
        newPlaces[index].imageError = "Image must be under 100 KB.";
      } else {
        newPlaces[index].image = file;
        newPlaces[index].imageError = "";
      }
    }
  
    setPlace(newPlaces);
  };
  ;


 

  const deletesourceField = (index) => {
    toast.dismiss();
    if (Place.length <= 1) {
      toast.error("At least one Place field must remain.");
      return;
    }

    const newSourcePlace = [...Place];

    newSourcePlace.splice(index, 1);

    setPlace(newSourcePlace);
  };


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

    if (fieldName === "packageName") {
      if (fieldValue.length < 10) {
        message = "Please enter a valid Package Name";
      } else {
        message = "";
      }
    }

    if (fieldName === "destination") {
      if (fieldValue.length < 3) {
        message = "Please enter a valid destination";
      } else {
        message = "";
      }
    }

    
    if (fieldName === "source") {
      if (fieldValue.length < 3) {
        message = "Please enter a valid source";
      } else {
        message = "";
      }
    }


    if (fieldName === "price") {
      const numericValue = fieldValue.replace(/[^0-9]/g, "");

      if (numericValue.length < 2) {
        message = " Price needs at least 2 characters";
      } else if (numericValue.length > 10) {
        message = " Price is too long";
      } else if (/^0/.test(numericValue)) {
        message = " Price cannot start with 0";
      } else {
        message = "";
      }
    }

    if (fieldName === "packageDay") {
      if (fieldValue.length < 3) {
        message = "Please enter a valid package day";
      } else {
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
    setVacation({
      ...vacation,
      [e.target.name]: e.target.value,
    });
  };

  console.log("dec",vacation.description)

  const validateProductsForm = () => {
    let newErrors = {};
    if (!vacation.packageName.trim()) {
      newErrors.packageName= "Please enter a valid Package Name";
    } else if (vacation.packageName.length < 3) {
      newErrors.packageName = "Please enter a valid Package Name";
    }
   

    if (!vacation.source.trim()) {
      newErrors.source = "Please enter a valid source";
    } else if (vacation.source.length < 3) {
      newErrors.source = "Please enter a valid source";
    }
    if (!vacation.destination.trim()) {
      newErrors.destination = "Please enter a valid destination";
    } else if (vacation.destination.length < 3) {
      newErrors.destination = "Please enter a valid destination";
    }

    if (!vacation.price.trim()) {
      newErrors.price = "Please enter a valid Ticket price";
    } else if (vacation.price.length < 2) {
      newErrors.price = "Please enter a valid Ticket price";
    }

    if (!vacation.packageDay.trim()) {
      newErrors.packageDay = "Please enter a valid packageDay";
    } else if (vacation.packageDay.length < 3) {
      newErrors.packageDay = "Please enter a valid packageDay";
    }

    if (!vacation.description.trim()) {
      newErrors.description = "Please enter a valid description";
    } else if (vacation.description.length < 10) {
      newErrors.description = "Please enter a valid description";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };





  const handleSubmit = async () => {
    toast.dismiss();
    if (!validateProductsForm()) return;

    if (Place.some((item) => item.value === "")) {
      toast.error("Please fill in all Place fields");
      return;
    }
    
    if (Place.some((item) => item.error !== "")) {
      toast.error("Please check error in all place fields");
      return;
    }
    
    if (Place.some((item) => !item.image)) {
      toast.error("Please upload an image for each place");
      return;
    }
    
    if (Place.some((item) => item.imageError)) {
      toast.error("Please fix the image errors");
      return;
    }
    



    setLoading(true);
    const formattedTime = dayjs(startTime).format("hh:mm A");
    const formattedEndTime = dayjs(endTime).format("hh:mm A");


    const vacationList=vacation.description.split("\n")

   

    const formData=new FormData()
    vacationList.forEach((value)=>formData.append("description",value))
    
    formData.append("packageName",vacation.packageName)
    formData.append("source",vacation.source)
    formData.append("price",vacation.price)
    formData.append("destination",vacation.destination)
    formData.append("startTime",formattedTime)
   formData.append("endTime",formattedEndTime)
   formData.append("packageDay",vacation.packageDay)
   Place.forEach((item, index) => {
    formData.append(`place[${index}][value]`, item.value);
    formData.append(`place[${index}][image]`, item.image);
  });
  
   

   
    try {
      const response = await client.post("/package/add-package", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Package added successfully");
        setLoading(false);
        setVacation(initalData);
        setPlace([
          {
            value: "",
            error: "",
          },
        ]);
       
        setStartTime(dayjs().hour(9).minute(0));
        setEndTime(dayjs().hour(17).minute(0));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
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
              <li className="breadcrumb-item active">Add Package Details</li>
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
                Add Package
              </h5>

              <Grid container spacing={2}>
              <Grid
                  item
                  size={{
                    xs: 12,
                  }}
                >
                  <TextField
                    label="Package Name"
                    fullWidth
                    required
                    name="packageName"
                    value={vacation.packageName}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[A-Za-z.,_-]$/;

                      if (vacation.packageName.length === 0 && e.key === " ") {
                        e.preventDefault();
                        return;
                      }

                      // Check if the pressed key is not allowed
                    }}
                    onChange={handleChange}
                    error={!!error.packageName}
                    onBlur={handleBlur}
                    helperText={error.packageName}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 50,
                      },
                    }}
                  />

                </Grid>
                <Grid
                                  item
                                  size={{
                                    xs: 12,
                                    sm: 6,
                                  }}
                                >
                                  <TextField
                                    label="Source"
                                    fullWidth
                                    required
                                    name="source"
                                    value={vacation.source}
                                    onKeyDown={(e) => {
                                      const allowedKeys = [
                                        "Backspace",
                                        "ArrowLeft",
                                        "ArrowRight",
                                        "Delete",
                                        "Tab",
                                      ];
                                      const allowedCharPattern = /^[A-Za-z.,_-]$/;
                
                                      if (vacation.source.length === 0 && e.key === " ") {
                                        e.preventDefault();
                                        return;
                                      }
                
                                      // Check if the pressed key is not allowed
                                    }}
                                    onChange={handleChange}
                                    error={!!error.source}
                                    onBlur={handleBlur}
                                    helperText={error.source}
                                    variant="outlined"
                                    margin="normal"
                                    slotProps={{
                                      htmlInput: {
                                        maxLength: 50,
                                      },
                                    }}
                                  />
                                </Grid>
                
                                <Grid
                                  item
                                  size={{
                                    xs: 12,
                                    sm: 6,
                                  }}
                                >
                                  <TextField
                                    label="Destination"
                                    fullWidth
                                    required
                                    name="destination"
                                    value={vacation.destination}
                                    onKeyDown={(e) => {
                                      const allowedKeys = [
                                        "Backspace",
                                        "ArrowLeft",
                                        "ArrowRight",
                                        "Delete",
                                        "Tab",
                                      ];
                                      const allowedCharPattern = /^[A-Za-z.,_-]$/;
                
                                      if (vacation.destination.length === 0 && e.key === " ") {
                                        e.preventDefault();
                                        return;
                                      }
                
                                      // Check if the pressed key is not allowed
                                    }}
                                    onChange={handleChange}
                                    error={!!error.destination}
                                    onBlur={handleBlur}
                                    helperText={error.destination}
                                    variant="outlined"
                                    margin="normal"
                                    slotProps={{
                                      htmlInput: {
                                        maxLength: 50,
                                      },
                                    }}
                                  />
                                </Grid>
               

                 <Grid
                                      item
                                      size={{
                                        xs: 12,
                                        sm: 6,
                                      }}
                                    >
                                      <TextField
                                        label="Ticket Price"
                                        value={vacation.price}
                                        error={!!error.price}
                                    onBlur={handleBlur}
                                    helperText={error.price}
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        required
                                        fullWidth
                                        name="price"
                                        variant="outlined"
                                        margin="normal"
                                        slotProps={{
                                          htmlInput: {
                                            maxLength: 5,
                                          },
                                        }}
                                        onKeyDown={(e) => {
                                          const allowedKeys = [
                                            "Backspace",
                                            "ArrowLeft",
                                            "ArrowRight",
                                            "Delete",
                                            "Tab",
                                          ];
                                          const allowedCharPattern = /^[0-9+]$/;
                
                                          // Check if the pressed key is not allowed
                                          if (
                                            !allowedKeys.includes(e.key) &&
                                            !allowedCharPattern.test(e.key)
                                          ) {
                                            e.preventDefault(); // Prevent the default action of the disallowed key
                                          }
                                        }}
                                      />
                                    </Grid>
                <Grid
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <TextField
                    label="Package Day"
                    fullWidth
                    required
                    name="packageDay"
                    value={vacation.packageDay}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                    
                      // Now includes space in the allowed characters
                      const allowedCharPattern = /^[A-Za-z.,_\- ]$/;
                    
                      // Optional: Prevent starting with a space if needed
                      if (vacation.packageDay.length === 0 && e.key === " ") {
                        e.preventDefault();
                        return;
                      }
                    
                      if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    
                    onChange={handleChange}
                    error={!!error.packageDay}
                    onBlur={handleBlur}
                    helperText={error.packageDay}
                    variant="outlined"
                    margin="normal"
                    slotProps={{
                      htmlInput: {
                        maxLength: 40,
                      },
                    }}
                  />
                </Grid>

          
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid
                    item
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <TimePicker
                      label="Starting Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                  </Grid>
                  <Grid
                    item
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <TimePicker
                      label="Ending Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                    />
                  </Grid>
                </LocalizationProvider>
            
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
                    value={vacation.description}
                    onKeyDown={(e) => {
                      if (vacation.description.length === 0 && e.key === " ") {
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
                <Grid
                  item
                  size={{
                    xs: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h5 style={{ textAlign: "center" }}> Place Cover</h5>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        onClick={addsourceField}
                      >
                        Add
                      </Button>
                    </Box>
                  </div>

                  {Place.map((field, index) => (

     <Grid container spacing={2}     key={index}
     style={{
      marginBottom:"20px",
      alignItems:"center"
     }}
     >
      <Grid
                  item
                  size={{
                    xs: 12,
                    sm:5
                  }}
                >

      <TextField
        label={`Place ${index + 1}`}
        fullWidth
        variant="outlined"
        slotProps={{ htmlInput: { maxLength: 50 } }}
        value={field.value}
        onChange={(e) => handlesourveChange(index, e)}
        onBlur={(e) => handleSourceBlur(index, e)}
        error={!!field.error}
        helperText={field.error}
        onKeyDown={(e) => {
          const allowedKeys = [
            "Backspace",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            "Tab",
            " ",
          ];
          const allowedCharPattern = /^[A-Za-z.,-_ ]$/;
          if (field.value.length === 0 && e.key === " ") e.preventDefault();
          if (!allowedKeys.includes(e.key) && !allowedCharPattern.test(e.key))
            e.preventDefault();
        }}
      />
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
          handleImageChange(index, e.target.files[0] || null)
        }
      />
      {field.imageError && (
        <p style={{ color: "red", fontSize: "0.9rem" }}>
          {field.imageError}
        </p>
      )}
    </Box>
                  </Grid>
                  <Grid
                   item
                   size={{
                     xs: 12,
                     sm:2
                   }}
                   >

      <Button
        variant="outlined"
        color="error"
        onClick={() => deletesourceField(index)}
        disabled={Place.length <= 1}
        sx={{ marginLeft: "10px" }}
      >
        Delete
      </Button>
      </Grid>
      </Grid>
    

   
))}

                </Grid>
              
              </Grid>

              <Button
                variant="contained"
                color="primary"
                style={{ display: "block", margin: "20px auto" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Vacation;
