import React, { useEffect, useState } from "react";
import client from "../../../Common/Client/Client";
import "./Package.css";
import { useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const [packages, setPackages] = useState(null);
  const [loading ,setLoading]=useState(true)
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
        setLoading(false)
        setPackages(response.data[0]);
      }
    } catch (err) {
      setLoading(false)
    }
  };
  return (
    <>
     {loading ?  <div className="spinner-wrapper">
      <div className="spinner-border"></div>
      <div className="spinner-text">Loading</div>
    </div>  : <div className="container conn">
      {packages !== null && (
        <div className="packages-details">
          <div className="booking-package booking-heading-subtitle">
            <h2>{packages?.packageName}</h2>
            <p>
              {packages?.packageDay} Package:{" "}
              <strong>
                {packages?.startTime} – {packages?.endTime}
              </strong>
            </p>
          </div>
          <div className="packages-details-header">
            <div className="package-header-info">
              <p>
                <strong>Source:</strong> {packages?.source}
              </p>
              <p>
                <strong>Destination:</strong> {packages?.destination}
              </p>
              <p>
                <strong>Price:</strong> ₹ {packages?.price} per person
              </p>
            </div>

            <button
              className="book-now-btn "
              onClick={() => navigate("/booking")}
                style={{
                  backgroundColor:"#e89e25 ",
                  color:"white"
                }}
            >
              🚐 Book Now
            </button>
          </div>

          <div className="package-details-decription">
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
          </div>
          <div className="package-details-coverd">
            <div className="package-facilities-section">
              <h3 className="facilities-heading">Place Coverd</h3>
              <ul className="about-us-list">
                {packages.Place.map((value, index) => (
                  <li key={index}>
                    <div>
                      <img src={value.image} alt={value.value} />
                      <p>{value.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>}
    
    </>
    
  );
};

export default PackageDetails;
