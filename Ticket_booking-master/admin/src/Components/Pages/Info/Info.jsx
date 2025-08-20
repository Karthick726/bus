import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import client from "../../Common/Client/Client";

const Info = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [loading,setLoading]=useState(false)
  const [Place, setPlace] = useState([
    { value: "", error: "", info: "", infoError: "" },
  ]);

  const handlePlaceChange = (index, e) => {
    const { value } = e.target;
    const newPlace = [...Place];
    newPlace[index].value = value;

    if (value.length < 3) {
      newPlace[index].error = "Place must be at least 3 characters.";
    } else {
      newPlace[index].error = "";
    }

    setPlace(newPlace);
  };

  const handlePlaceBlur = (index, e) => {
    const { value } = e.target;
    const newPlace = [...Place];
    if (value === "") {
      newPlace[index].error = "Place is required.";
    }
    setPlace(newPlace);
  };

  const handleInfoBlur = (index, e) => {
    const { value } = e.target;
    const newPlace = [...Place];
    if (value === "") {
      newPlace[index].infoError = "Info is required.";
    }
    setPlace(newPlace);
  };

  const handleInfoChange = (index, e) => {
    const { value } = e.target;
    const newPlace = [...Place];
    newPlace[index].info = value;

    if (value.length < 5) {
      newPlace[index].infoError = "Info must be at least 5 characters.";
    } else {
      newPlace[index].infoError = "";
    }

    setPlace(newPlace);
  };

  const addsourceField = () => {
    toast.dismiss();
    const lastField = Place[Place.length - 1];
    if (lastField.value === "") {
      toast.error("Complete the current field.");
    } else if (lastField.error || lastField.infoError) {
      toast.error("Fix the errors before adding a new place.");
    } else {
      setPlace([...Place, { value: "", error: "", info: "", infoError: "" }]);
    }
  };

  const deletesourceField = (index) => {
    toast.dismiss();
    if (Place.length <= 1) {
      toast.error("At least one Place field must remain.");
      return;
    }
    const newPlace = [...Place];
    newPlace.splice(index, 1);
    setPlace(newPlace);
  };


  const handleSubmit=async()=>{
    toast.dismiss()

    if(!selectedDate){
        toast.error("select a date")
        return
    }

    if (Place.some((item) => item.value === "")) {
      toast.error("Please fill in all Place fields");
      return;
    }
    
    if (Place.some((item) => item.error !== "")) {
      toast.error("Please check error in all place fields");
      return;
    }
    
    if (Place.some((item) =>item.info==="")) {
      toast.error("Please fill in all Info fields");
      return;
    }
    
    if (Place.some((item) => item.infoError !== "")) {
      toast.error("Please check error in all Info fields");
      return;
    }
    



    setLoading(true);


    const formData={
        date:dayjs(selectedDate).format("DD/MM/YYYY"),
        placeInfo:Place.map((value)=>{
            return {
                place:value.value,
                info:value.info
            }
        })
    }

       
        try {
          const response = await client.post("/info/add-info", formData, {
            withCredentials: true,
          });
    
          if (response.status === 200) {
            toast.success("Package added successfully");
            setLoading(false);
              setSelectedDate(dayjs())
              setPlace([{ value: "", error: "", info: "", infoError: "" }])
        } }catch (err) {
          setLoading(false);
          console.log(err);
        }



  }

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Add Festival Information</li>
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
              Add Festival Information
            </h5>

            <Grid
              item
              size={{
                xs: 12,
              }}
            >
              <div className="date-booking" style={{ margin: "0 auto" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Travel Date"
                    value={selectedDate}
                    format="DD/MM/YYYY"
                    disablePast
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>
            </Grid>
            <Grid container spacing={2}>
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
                  <h5 style={{ textAlign: "center" }}>Information</h5>
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
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    alignItems="center"
                    style={{ marginBottom: "20px", marginTop: "20px" }}
                  >
                    <Grid
                      item
                      size={{
                        xs: 12,
                        sm: 5,
                      }}
                    >
                      <TextField
                        label={`Place ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        value={field.value}
                        onChange={(e) => handlePlaceChange(index, e)}
                        onBlur={(e) => handlePlaceBlur(index, e)}
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
                          if (field.value.length === 0 && e.key === " ")
                            e.preventDefault();
                          if (
                            !allowedKeys.includes(e.key) &&
                            !allowedCharPattern.test(e.key)
                          )
                            e.preventDefault();
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      size={{
                        xs: 12,
                        sm: 5,
                      }}
                    >
                      <TextField
                        label={`Info ${index + 1}`}
                        fullWidth
                        variant="outlined"
                        value={field.info}
                        onChange={(e) => handleInfoChange(index, e)}
                        onBlur={(e) => handleInfoBlur(index, e)}
                        error={!!field.infoError}
                        helperText={field.infoError}
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
                          if (field.value.length === 0 && e.key === " ")
                            e.preventDefault();
                          if (
                            !allowedKeys.includes(e.key) &&
                            !allowedCharPattern.test(e.key)
                          )
                            e.preventDefault();
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={2}>
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
                            disabled={loading}
                          >
                            {loading  ? "submitting..." :"submit"}
                          </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Info;
