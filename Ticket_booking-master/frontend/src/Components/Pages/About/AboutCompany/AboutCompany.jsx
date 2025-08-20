import React, { useContext } from "react";
import "./AboutComapny.css";
import shipImage from "../../../../assets/Images/contact.jpg";
import truckImage from "../../../../assets/Images/contact1.jpg";
import { FaPhoneAlt, FaCheckCircle, FaTruckMoving } from "react-icons/fa";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AboutCompany = () => {
  const { travel } = useContext(AppContext);
  const navigate=useNavigate()
  return (
    <section className="container conn" style={{
        overflow:"hidden"
    }}>
      <motion.div
                          initial={{ opacity: 0, x: -200 }}
                          whileInView={{ opacity: 1,x: 0 }}
                          transition={{ duration: 0.8,delay:0.3 }} className="aboutus-main ">
        <motion.div
                          initial={{ opacity: 0, x: -200 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8,delay:0.3 }} className="aboutus-left">
          <img src={truckImage} alt="Shipping" className="aboutus-img-main" />
          <img src={shipImage} alt="Trucking" className="aboutus-img-sub" />
        </motion.div>
        <motion.div
                          initial={{ opacity: 0, x: -200 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }} className="aboutus-right">
          <div className="booking-heading-title">
            <p>Why we are ?</p>
          </div>

          <div className="booking-heading-subtitle">
            <h2   style={{
                textAlign: "left",
                padding: "0px",
              }}>
              South India's Leading  


              <span className="span-booking"> Navagraha Pilgrimage Package</span>Provider
            </h2>
          </div>
          <div
            className="booking-heading-content"
            style={{
              justifyContent: "flex-start",
            }}
          >
            <p
              style={{
                textAlign: "left",
                padding: "0px",
              }}
            >
              At <strong>Temple Tourism</strong>, we’re dedicated to providing a
              seamless bus booking experience. Enjoy real-time seat selection,
              secure payments, and instant confirmation on a wide range of
              routes.
            </p>
          </div>

          <div className="aboutus-features">
            <ul
              className="about-us-list"
              style={{
                gap: "2px",
              }}
            >
              <li className="about-us-list-1">
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
                <span className="point-content"> Real-time Seat Layout</span>
              </li>
              <li className="about-us-list-1">
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
                <span className="point-content">
                  Instant Booking Confirmation
                </span>
              </li>
              <li className="about-us-list-1">
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
                <span className="point-content">24/7 Customer Support</span>
              </li>
              <li className="about-us-list-1">
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
                <span className="point-content"> Secure Online Payments</span>
              </li>
              <li className="about-us-list-1">
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
                <span className="point-content"> Trusted Bus Operators</span>
              </li>
              <li className="about-us-list-1">
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
                <span className="point-content">User-Friendly Interface</span>
              </li>
            </ul>
          </div>

          <div className="aboutus-contact">
            <button className="book-now-btn primary-btn" onClick={()=>navigate("/contact")}>
              Request a Quote →
            </button>
            <div className="call-info">
              <FaPhoneAlt className="phone-icon" />
              <div>
                <p
                  style={{
                    margin: "0px",
                  }}
                >
                  Call for free
                </p>
                <strong
                  onClick={() => {
                    window.location.href = `tel: ${travel[0]?.phoneIndia}`;
                  }}
                >
                  {" "}
                  +91 {travel[0]?.phoneIndia}
                </strong>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutCompany;
