import React from 'react';
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="glass-box">
        <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="booking-heading-subtitle">
          <h2 style={{
            color:"white",
            backgroundColor:"#e89e25"
          }}>
          Navagraha Temple Tour Package
          </h2>
        </motion.div>
          <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="booking-heading-content">
        <p style={{
            color:"white",
        }}>
          Book your sacred journey now. Easy booking and hassle-free cancellations.
        </p>
      </motion.div>
      
        <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="hero-buttons">
          <button className="book-now-btn secondary-btn" onClick={() => navigate("/booking")}>
            Book Ticket
          </button>
          <button className="book-now-btn primary-btn" onClick={() => navigate("/booking")}>
            Cancel Ticket
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
