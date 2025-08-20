import React, { useContext } from "react";
import Header from "../../Common/Layout/Header/Header";
import Footer from "../../Common/Layout/Footer/Footer";
import PageTop from "../../Common/PageTop/PageTop";
import { FaHome, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";

const Privacy = () => {
      const {travel}=useContext(AppContext)
  return (
      <div>
      <Header />
      <PageTop title={"Privacy Policy"} />

      <div className="terms-containers con">
     

<div className="booking-heading-subtitle">
          <h2 style={{
            textAlign:"center",
            marginBottom:"20px",
            color:"#ec2125"
          }}>
          
            <span className="span-booking"> Privacy  Policy </span> 
          </h2>
        </div>
        <section className="section1-card1s">
          <h3>1. Information We Collect
</h3>
          <p>
            We collect the following types of information when you use our website to book a tour:
          </p>
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
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
             Personal details: Full name, age, mobile number, and email address.

              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              Payment details: Transaction information required for processing bookings via Razorpay
              </span>
            </li>
               <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
              Age proof documents: Required for verifying eligibility for senior citizen or child
discounts
              </span>
            </li>
          </ul>
        </section>
         <section className="section1-card1s">
          <h3>2. How We Use Your Information
</h3>
          <p>
           We use the information we collect for the following purposes:

          </p>
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
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
            To process and confirm your tour bookings.

              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
             To apply discounts appropriately based on age eligibility.

              </span>
            </li>
               <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
             To send important trip updates (such as departure time, boarding point, etc.) via SMS.

              </span>
            </li>
              <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
             To ensure safe and secure payment transactions through Razorpay.

              </span>
            </li>
          </ul>
        </section>
         <section className="section1-card1s">
          <h3>3.Data Sharing
</h3>
          <p>
         We share your personal data only with third parties necessary to complete your booking and
provide tour services:


          </p>
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
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
           Razorpay – for secure payment processing

              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
            SMS service providers – for sending booking confirmations and trip updates.


              </span>
            </li>
               <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
           Tour operations team – for managing on-ground logistics and passenger coordination.


              </span>
            </li>
             
          </ul>
           <p>
        We do not sell, rent, or share your personal data with any marketing agencies or unrelated
third parties.



          </p>
        </section>
          <section className="section1-card1s">
          <h3>4. Data Security

</h3>
        
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
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
           We implement strict technical and organizational security measures to protect your
personal information from unauthorized access, misuse, or disclosure.


              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
           Payment transactions are encrypted and processed through PCI-compliant gateways
to ensure complete safety

              </span>
            </li>
           
          </ul>
        </section>
           <section className="section1-card1s">
          <h3>5. Your Privacy Rights


</h3>
<p>You have the right to:
</p>
        
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
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
         Request access to the personal data we hold about you


              </span>
            </li>
            <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
          Ask us to correct or delete your personal data.

              </span>
            </li>
             <li
              className="about-us-list-1"
              style={{
                width: "100%",
              }}
            >
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
          Opt-out of any future marketing messages (if introduced).

              </span>
            </li>
          </ul>
        </section>
           <section className="section1-card1s">
          <h3>6.Contact Us

</h3>
<p>
For any questions, concerns, or requests related to our Terms or Privacy Policy, please contact
us:

</p>
        
             <ul
            className="about-us-list"
            style={{
              gap: "2px",
              flexDirection: "column",
              width: "100%",
            }}
          >
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
                <span style={{
                    color:"#444"
                }}>{travel[0]?.email}</span>
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
                  <span style={{
                    color:"#444"
                }}>+91 {travel[0]?.phoneIndia}</span>
                </li>
            
          </ul>
        </section>

       
      </div>

      <Footer />
    </div>
  )
}

export default Privacy