import React from "react";
import "./BookingSteps.css";
import arrow from "../../../../assets/Images/arrow.png";
import { FaBus } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { MdOutlinePayments } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const BookingSteps = () => {
  return (
    <div className="container con" style={{
      overflow:"hidden"
    }}>
      <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }} className="booking-heading">
        <div className="booking-heading-title">
          <p>How it Works</p>
        </div>
        <div className="booking-heading-subtitle">
          <h2>
            4 Steps To
            <span className="span-booking">Booking a Bus</span> On Temple Tourism
          </h2>
        </div>
      </motion.div>
      <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }} className="booking-heading-content">
        <p>
          Booking your bus journey is now easier than ever. Just follow four
          simple steps to select, confirm, and pay for your seat—then sit back
          and enjoy the ride with Temple Tourism.
        </p>
      </motion.div>

      <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }} className="booking-step">
        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }} className="booking-steps">
          <div>
            <FaBus />
          </div>
          <div>
            <h3>Select a Seat</h3>
            <p>Choose your preferred seat from the available options.</p>
          </div>
          <div className="arrow">
            <img src={arrow} alt="arrow" className="arrow-icons" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="booking-steps">
          <div>
            <CgNotes />
          </div>
          <div>
            <h3>Booking & Confirm</h3>
            <p>Review your seat and confirm your booking instantly.</p>
          </div>
          <div className="arrows">
            <img src={arrow} alt="arrow" className="arrow-icon" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }} className="booking-steps">
          <div>
            <MdOutlinePayments />
          </div>
          <div>
            <h3>Booking Payment</h3>
            <p>Securely pay online to finalize your bus reservation.</p>
          </div>
          <div className="arrow">
            <img src={arrow} alt="arrow" className="arrow-icons" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0}} className="booking-steps">
          <div>
            <FaMapLocationDot />
          </div>
          <div>
            <h3>Start Your Trip</h3>
            <p>Get ready and enjoy a comfortable journey with Shuttle.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSteps;
