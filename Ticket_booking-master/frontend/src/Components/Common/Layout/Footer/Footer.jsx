import React, { useContext, useEffect, useState } from "react";
import "./Footer.css";
import { FaHome, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/Images/logo.png";
import pay from "../../../../assets/Images/pay.png";
import { AppContext } from "../../../Pages/Context/AppContext";

function Footer() {

const {travel}=useContext(AppContext)
  return (
    <>
      <footer className="ssfooter">
        <div className="container con">
          <div className="footerstart">
            <p className="footthanks">
              Thanks for visiting Temple Tourism!
            </p>
            <p className="footquestions">
              Need help? We're just a message away.
            </p>
          </div>

          <hr style={{ color: "white" }} />

          <div className="footerlinks">
            <div className="row rows">
              <div className="col-12 col-md-6 col-lg-3 mb-4">
                {/* <img src="" /> */}
                <h5>About Us</h5>
                <p className="footabout">
                  Thank you for choosing us for your travel needs. We’re
                  dedicated to providing a safe, comfortable, and hassle-free
                  bus booking experience. From easy seat selection to secure
                  payments, we’re here to make your journey smooth from start to
                  finish. Travel smart. Travel with confidence.
                </p>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-4 footersections">
                <h5>Quick Links</h5>
                <ul className="quicklinks">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">About us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/package">Package</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact Us</NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-4 footersections">
                <h5>Help & Info</h5>
                <ul className="quicklinks">
                  <li>
                    <NavLink to="/terms">Term & Condition</NavLink>
                  </li>
                  <li>
                    <NavLink to="/privacy">Privacy Policy</NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-4 footersections">
                <h5>Reach Us</h5>
             <ul className="quicklinks">
  <>
    <li className="footaddress" style={{ display: "flex", gap: "14px" }}>
      <span>
        <FaHome style={{ color: "#e89e25" }} />
      </span>
      <span style={{ textTransform: "capitalize" }}>
        {travel[0]?.address || "Visit Us"}
      </span>
    </li>

    <li
      className="footmail"
      style={{ display: "flex", gap: "14px" }}
      onClick={() => {
        window.location.href = `mailto:${travel[0]?.email}`;
      }}
    >
      <span>
        <FaEnvelope style={{ color: "#e89e25" }} />
      </span>
      <span>{travel[0]?.email}</span>
    </li>

    <li
      className="footphone"
      style={{ display: "flex", gap: "14px" }}
      onClick={() => {
        window.location.href = `tel:${travel[0]?.phoneIndia}`;
      }}
    >
      <span>
        <FaPhone style={{ color: "#e89e25" }} />
      </span>
      <span>+91 {travel[0]?.phoneIndia}</span>
    </li>

    <li>
      <a
        href={`https://wa.me/${travel[0]?.whatsapp?.replace(/[^0-9]/g, "")}`}
        style={{ display: "flex", gap: "14px" }}
        target="_blank"
        className="footphone"
        rel="noopener noreferrer"
      >
        <span>
          <FaWhatsapp style={{ color: "#e89e25" }} />
        </span>
        <span> +91 {travel[0]?.whatsapp }</span>
      </a>
    </li>
  </>
</ul>
              </div>
            </div>
          </div>
          <hr style={{ color: "white" }} />
          <div className="container con mt-4">
            <div className="row align-items-center text-center text-lg-start">
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <img
                  src={logo}
                  alt="Company logo"
                  style={{ maxWidth: "180px", height: "auto" }}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="footersections">
                  <h5>Payments</h5>
                  <p
                    className="mb-2"
                    style={{
                      color: "white",
                    }}
                  >
                    All payment modes are acceptable
                  </p>
                  <img
                    src={pay}
                    alt="Payment modes"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <div className="soicalmedia d-flex justify-content-center  gap-3">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ color: "white" }} />

          <div className="companydetails">
            <div
              className="terms-privacy"
              style={{
                color: "white",
              }}
            >
              ©{" "}
              <span
                style={{
                  color: "#e89e25",
                }}
              >
               Temple Tourism
              </span>
              <span> All Rights Reserved.</span>
            </div>
            <div className="copyrights">
              <p style={{ color: "white" }}>
                Developed by{" "}
                <a
                  href="https://hellowtec.com/"
                  target="_blank"
                  style={{
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    color: "#e89e25",
                  }}
                >
                  Hello Technologies
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
