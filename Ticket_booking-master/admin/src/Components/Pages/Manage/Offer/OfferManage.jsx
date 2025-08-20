import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../../Common/Client/Client";
import { Button } from "@mui/material";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { Popconfirm } from "antd";
import { toast } from "react-hot-toast";


const OfferManage = () => {

    const [offers,setOffers]=useState([])
 const navigate = useNavigate();
      useEffect(() => {
        getOffer();
      }, []);
    
      const getOffer = async () => {
        try {
          const response = await client.get("/offer/get-offer", {
            withCredentials: true,
          });
    
          if (response.status === 200) {
            setOffers(response.data);
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
              "/offer/delete-offer",
              {
                id: id,
              },
              {
                withCredentials: true,
              }
            );
            if (response.status === 200) {
              getOffer();
              toast.success("offer deleted successfully");
            }
          } catch (err) {
            if (err.response && err.response.status === 401) {
              toast.error("Login again");
            } else {
              toast.error("Failed to delete the offer details");
            }
          }
        };

        console.log("offer",offers)
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Manage Offer Details</li>
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
              Manage offers
            </h5>
          </div>
          {offers.length !== 0 ? (
            <div className="table-responsive px-2">
              <table className="table table-striped table-hover table-bordered ">
                <thead>
                  <tr>
                    <td>S.no</td>
                    <td>Start Date</td>
                    <td>End Date</td>
                    <td>Description</td>
                    <td>Images</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((value, item) => {
                    return (
                      <tr
                        key={item}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <td>{item + 1}</td>
                        <td>{value.startDate}</td>
                        <td>{value.endDate}</td>
                        <td>{value.description}</td>
                        <td><img src={value.image} style={{
                            width:"100px",
                            height:"100px",
                        }}/></td>
                        <td>
                          {/* <span
                            className="icon edit-icon mb-3 "
                           // onClick={() => handleUpdate(value)}
                          >
                            <FaPencilAlt />
                          </span> */}
                          <Popconfirm
                            title="Delete the Offer Details"
                            description="Are you sure to delete this Offer Details?"
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
                No offer Available
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
                  navigate("/offer");
                }}
              >
                Add offer
              </Button>
            </div>
          )}
        </div>
      </section>
      </main>
      
  )
}

export default OfferManage