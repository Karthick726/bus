import React, { useEffect, useState } from "react";
import "./PackageDetails.css";
import { PiShootingStarFill } from "react-icons/pi";
import logos from "../../../../assets/Images/logo1.jpeg";
import client from "../../../Common/Client/Client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PackageDetails = () => {
  const [packages, setPackages] = useState(null);
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
        setPackages(response.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className=" tour-card"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="tour-card-header">
        <motion.h2
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {" "}
          {packages?.packageName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          🕒 {packages?.packageDay} Package:{" "}
          <strong>
            {packages?.startTime} – {packages?.endTime}
          </strong>
        </motion.p>
      </div>

      <div className="tour-card-body">
        <h4>🗺️ Places Covered</h4>
        <div className="places-grid">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="place-list"
          >
            {packages?.Place?.map((place, index) => (
              <div key={index} className="place-pill">
                <img
                  src={place.image}
                  alt={place.value}
                  className="place-image"
                />
                <span className="place-name">{place.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="tour-card-footer"
      >
        <button
          className="book-now-btn primary-btn"
          onClick={() => {
            navigate("/booking");
          }}
        >
          🚐 Book Now
        </button>
        <button
          className="book-now-btn secondary-btn"
          onClick={() => {
            navigate("/package");
          }}
        >
          📖 Read More
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;
