import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { Popconfirm } from "antd";
import client from "../../../Common/Client/Client";
import toast from "react-hot-toast";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Modal, Form, FormLabel } from "react-bootstrap";

import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const InfoManage = () => {
  const [info, setInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Place, setPlace] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await client.get("/info/get-allinfo", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setInfo(response.data?.festivalInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = (e) => {
    toast.error("You Cancle delete");
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      const response = await client.post(
        "/info/delete-info",
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getInfo();
        toast.success("Information deleted successfully");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to delete the Information details");
      }
    }
  };

  const handleUpdate = async (value) => {
    setOpen(true);
    setId(value._id);

    console.log(value.date);
    const parsedDate = dayjs(value.date, "DD/MM/YYYY");
    console.log(parsedDate);

    setSelectedDate(parsedDate.isValid() ? parsedDate : null);

    const mappedPlaces = value.placeInfo.map((item) => ({
      value: item.place,
      info: item.info,
      error: "",
      infoError: "",
    }));

    setPlace(mappedPlaces);
  };

  console.log(selectedDate);

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

  const handleCancel = () => {
    toast.dismiss();

    setId("");
    setSelectedDate(null);
    setPlace([]);
    setOpen(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    toast.dismiss();

    if (!selectedDate) {
      toast.error("select a date");
      return;
    }

    if (Place.some((item) => item.value === "")) {
      toast.error("Please fill in all Place fields");
      return;
    }

    if (Place.some((item) => item.error !== "")) {
      toast.error("Please check error in all place fields");
      return;
    }

    if (Place.some((item) => item.info === "")) {
      toast.error("Please fill in all Info fields");
      return;
    }

    if (Place.some((item) => item.infoError !== "")) {
      toast.error("Please check error in all Info fields");
      return;
    }

    setLoading(true);

    const formData = {
      id: id,
      date: dayjs(selectedDate).format("DD/MM/YYYY"),
      placeInfo: Place.map((value) => {
        return {
          place: value.value,
          info: value.info,
        };
      }),
    };

    try {
      const response = await client.post("/info/update-info", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Festival update successfully");
        setLoading(false);
        setSelectedDate(null);
        setPlace([]);
        setId("");
        setOpen(false);
        getInfo();
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
            <li className="breadcrumb-item active">
              Manage Festival Information Details
            </li>
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
              Manage Festival Information Details
            </h5>
          </div>
          {info !== null ? (
            <div className="table-responsive px-2">
              <table className="table table-striped table-hover table-bordered ">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Date</th>
                    <th>Festival Places & Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {info.map((value, item) => {
                    return (
                      <tr
                        key={item}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <td>{item + 1}</td>
                        <td>{value.date}</td>
                        <td>
                          {value.placeInfo.map((placeItem, idx) => (
                            <p
                              style={{
                                margin: "0px",
                              }}
                            >
                              {placeItem.place}
                            </p>
                          ))}
                        </td>
                        <td>
                          <span
                            className="icon edit-icon mb-3 "
                            onClick={() => handleUpdate(value)}
                          >
                            <FaPencilAlt />
                          </span>
                          <Popconfirm
                            title="Delete the Festival Info Details"
                            description="Are you sure to delete this  Festival Info Details?"
                            onConfirm={() => handleDelete(value._id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            className="table-button"
                          >
                            <span className="icon delete-icon">
                              <RiDeleteBinFill />
                            </span>
                          </Popconfirm>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
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
                No Festival Information Available
              </span>
              <Button
                color="success"
                variant="contained"
                style={{
                  padding: "8px 16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  boxShadow: "0 3px 6px rgba(0, 123, 255, 0.2)",
                }}
                onClick={() => {
                  navigate("/info");
                }}
              >
                Add Info
              </Button>
            </div>
          )}
        </div>
      </section>
      <div className="container">
        <Modal show={open} onHide={handleCancel} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update Festival Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Date *</span>
                        </FormLabel>
                      </div>
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
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
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
                              marginTop: "10px",
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
                              style={{
                                marginBottom: "20px",
                                marginTop: "20px",
                              }}
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
                                    const allowedCharPattern =
                                      /^[A-Za-z.,-_ ]$/;
                                    if (
                                      field.value.length === 0 &&
                                      e.key === " "
                                    )
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
                                    const allowedCharPattern =
                                      /^[A-Za-z.,-_ ]$/;
                                    if (
                                      field.value.length === 0 &&
                                      e.key === " "
                                    )
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
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="contained"
              color="primary"
              style={{ display: "block", margin: "20px auto" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "submitting ... " :"submit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default InfoManage;
