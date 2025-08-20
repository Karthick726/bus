import React from "react";
import "./Service.css";
import { AiOutlineSafety } from "react-icons/ai";
import {
  FaUserTie,
  FaClock,
  FaLaptop,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineDiscount } from "react-icons/md";

function Services() {
  return (
    <div className="container con service" style={{
      overflow:"hidden"
    }}>
      <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="services-header">
        <div className="booking-heading-title">
          <p>Why Choose us ?</p>
        </div>
        <div className="booking-heading-subtitle">
          <h2>
            We Provide
            <span className="span-booking"> Best Services</span> For You
          </h2>
        </div>
      </motion.div>
      <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="booking-heading-content">
        <p>
          Experience hassle-free travel with our trusted services. From secure
          booking and timely schedules to personal guidance and 24/7 support, we
          make your journey smooth, safe, and comfortable.
        </p>
      </motion.div>

      <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="services-section1">
        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }} className="section1-card1">
          <div>
            <AiOutlineSafety className="My-icon" />
          </div>
          <div>
            <h3>Safety Guarantee</h3>
            <p>
              Safety bags and necessary safety gear are provided on board for
              every journey.
            </p>
          </div>
          <div className="section1-links">
            <Link  to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }} className="section1-card1">
          <div>
            <MdOutlineDiscount className="My-icon" />
          </div>
          <div>
            <h3>Senior & Child Discount</h3>
            <p>
              Enjoy 22% discount for senior citizens and children under 12 years
              of age.
            </p>
          </div>
          <div className="section1-links">
            <Link  to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0 }} className="section1-card1">
          <div>
            <FaUserTie className="My-icon" />
          </div>
          <div>
            <h3>Personal Guide</h3>
            <p>
              Travel with ease—our professional guides are here to assist
              throughout your journey.
            </p>
          </div>
          <div className="section1-links">
            <Link  to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
                          initial={{ opacity: 0, y: 200 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} className="services-section1">
        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }} className="section1-card1">
          <div>
            <FaClock className="My-icon" />
          </div>
          <div>
            <h3>Scheduled On Time</h3>
            <p>
              Buses are scheduled and dispatched promptly to ensure you're
              always on time.
            </p>
          </div>
          <div className="section1-links">
            <Link to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }} className="section1-card1">
          <div>
            <FaLaptop className="My-icon" />
          </div>
          <div>
            <h3>Online Booking</h3>
            <p>
              Book your tickets online anytime, anywhere with just a few clicks.
            </p>
          </div>
          <div className="section1-links">
            <Link  to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0 }} className="section1-card1">
          <div>
            <FaHeadset className="My-icon" />
          </div>
          <div>
            <h3>24/7 Support</h3>
            <p>
              Our customer support team is available 24/7 to help with your
              queries and concerns.
            </p>
          </div>
          <div className="section1-links">
            <Link  to="/contact">Learn More</Link>
            <FaArrowRight className="Arrow-icon" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Services;
