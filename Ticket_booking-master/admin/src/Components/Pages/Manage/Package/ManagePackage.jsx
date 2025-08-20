import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../../Common/Client/Client";
import { Button } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import "./ManagePackage.css";
import { Popconfirm } from "antd";
import { toast } from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Modal, Form, FormLabel } from "react-bootstrap";
import { TextField } from "@mui/material";

const initalData = {
  price: "",
  source: "",
  destination: "",
  packageName: "",
  description: [],
  packageDay: "",
};

const ManagePackage = () => {
  const [packages, setPackages] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [description, setDescription] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacation, setVacation] = useState(initalData);
  const [startTime, setStartTime] = useState(dayjs().hour(9).minute(0));
  const [endTime, setEndTime] = useState(dayjs().hour(17).minute(0));

  const [error, setError] = useState({
    price: "",
    packageName: "",
    packageDay: "",
    source: "",
    destination: "",
    description: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getPackage();
  }, []);

  const getPackage = async () => {
    try {
      const response = await client.get("/package/get-package", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setPackages(response.data);
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
        "/package/delete-package",
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        getPackage();
        toast.success("package deleted successfully");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Login again");
      } else {
        toast.error("Failed to delete the package details");
      }
    }
  };

  //update
  const handleUpdate = async (value) => {
    setOpen(true);
    setId(value._id);
    setStartTime(dayjs(value.startTime, "HH:mm"));
    setEndTime(dayjs(value.endTime, "HH:mm"));
    setVacation((pre) => ({
      ...pre,
      source: value.source,
      destination: value.destination,
      packageDay: value.packageDay,
      packageName: value.packageName,
      price: value.price,
    }));

    setDescription(value.description?.join("\n"));
  };
  const handleCancel = () => {
    toast.dismiss();

    setOpen(false);
    setLoading(false);
    setStartTime(dayjs().hour(9).minute(0));
    setEndTime(dayjs().hour(17).minute(0));
    setVacation(initalData);
    setDescription([]);
    setError({
      price: "",
      packageName: "",
      packageDay: "",
      source: "",
      destination: "",
      description: "",
    });
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

  const handleDescChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));

    setDescription(value);
  };

  const validateProductsForm = () => {
    let newErrors = {};
    if (!vacation.packageName.trim()) {
      newErrors.packageName = "Please enter a valid Package Name";
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

    if (!description.trim()) {
      newErrors.description = "Please enter a valid description";
    } else if (description.length < 10) {
      newErrors.description = "Please enter a valid description";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    toast.dismiss();
    if (!validateProductsForm()) return;

    setLoading(true);
    const formattedTime = dayjs(startTime).format("hh:mm A");
    const formattedEndTime = dayjs(endTime).format("hh:mm A");

    const vacationList = description.split("\n");

    try {
      const response = await client.post(
        "/package/update-package",
        {
          id: id,
          price: vacation.price,
          packageName: vacation.packageName,
          packageDay: vacation.packageDay,
          description: vacationList,
          destination: vacation.destination,
          source: vacation.source,
          startTime: formattedTime,
          endTime: formattedEndTime,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Package update successfully");
        setLoading(false);
        setVacation(initalData);
        setDescription([]);
        setOpen(false);

        setStartTime(dayjs().hour(9).minute(0));
        setEndTime(dayjs().hour(17).minute(0));
        getPackage();
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
            <li className="breadcrumb-item active">Manage Package Details</li>
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
              Manage Package
            </h5>
          </div>
          {packages !== null ? (
            <div className="table-responsive px-2">
              <table className="table table-striped table-hover table-bordered ">
                <thead>
                  <tr>
                    <td>S.no</td>
                    <td>Package Name</td>
                    <td>Source</td>
                    <td>Destination</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((value, item) => {
                    return (
                      <tr
                        key={item}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <td>{item + 1}</td>
                        <td>{value.packageName}</td>
                        <td>{value.source}</td>
                        <td>{value.destination}</td>
                        <td>{value.startTime}</td>
                        <td>{value.endTime}</td>
                        <td>
                          <span
                            className="icon edit-icon mb-3 "
                            onClick={() => handleUpdate(value)}
                          >
                            <FaPencilAlt />
                          </span>
                          <Popconfirm
                            title="Delete the package Details"
                            description="Are you sure to delete this package Details?"
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
                No package Available
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
                  navigate("/package");
                }}
              >
                Add Package
              </Button>
            </div>
          )}
        </div>
      </section>
      <div className="container">
        <Modal show={open} onHide={handleCancel} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Update package Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Package Name *</span>
                        </FormLabel>
                      </div>
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

                          if (
                            vacation.packageName.length === 0 &&
                            e.key === " "
                          ) {
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
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Source *</span>
                        </FormLabel>
                      </div>
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
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Destination *</span>
                        </FormLabel>
                      </div>
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

                          if (
                            vacation.destination.length === 0 &&
                            e.key === " "
                          ) {
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
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Ticket Price *</span>
                        </FormLabel>
                      </div>
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
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Package Day *</span>
                        </FormLabel>
                      </div>
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
                          if (
                            vacation.packageDay.length === 0 &&
                            e.key === " "
                          ) {
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
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Start Time *</span>
                        </FormLabel>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Starting Time"
                          value={startTime}
                          onChange={(newValue) => setStartTime(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>End Time *</span>
                        </FormLabel>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Ending Time"
                          value={endTime}
                          onChange={(newValue) => setEndTime(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group>
                    <div className="mt-2">
                      <div>
                        <FormLabel>
                          <span>Description *</span>
                        </FormLabel>
                      </div>
                      <TextField
                        label="Description"
                        fullWidth
                        required
                        name="description"
                        rows={2}
                        multiline
                        value={description}
                        onKeyDown={(e) => {
                          if (
                            vacation.description.length === 0 &&
                            e.key === " "
                          ) {
                            e.preventDefault();
                            return;
                          }

                          // Check if the pressed key is not allowed
                          // Check if the pressed key is not allowed
                        }}
                        onChange={handleDescChange}
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
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </main>
  );
};

export default ManagePackage;
