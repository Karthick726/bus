import React, { useContext } from "react";
import Header from "../../Common/Layout/Header/Header";
import Footer from "../../Common/Layout/Footer/Footer";
import PageTop from "../../Common/PageTop/PageTop";
import "./Term.css";
import { FaTicketAlt } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";

const Term = () => {

  return (
    <div>
      <Header />
      <PageTop title={"Terms and Condition"} />

      <div className="terms-containers con">
     

<div className="booking-heading-subtitle">
          <h2 style={{
            textAlign:"center",
            marginBottom:"20px",
            color:"#ec2125"
          }}>
           Terms 
            <span className="span-booking"> &</span> Conditions
          </h2>
        </div>
        <section className="section1-card1s">
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using our website to book tickets for temple tours,
            you acknowledge that you have read, understood, and agree to be
            bound by these Terms & Conditions. If you do not agree to these
            terms, you must not proceed with any bookings or use our services.
          </p>
        </section>

        <section className="section1-card1s">
          <h3>2. Booking Confirmation</h3>
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
                Bookings are confirmed only upon receipt of full payment through
                our secure payment partner, <strong>Razorpay</strong>.
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
                Once the payment is successful, you will receive a confirmation
                message and a receipt via <strong>SMS</strong> to the mobile
                number provided during booking.
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>3. Tour Package Inclusions</h3>

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
                This is a <strong>one-day group</strong> tour dedicated to
                visiting the <strong>Navagraha temples</strong>.
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
                The package includes:
                <ul
                  className="about-us-list"
                  style={{
                    gap: "2px",
                    flexDirection: "column",
                  }}
                >
                  <li
                    className="about-us-list-1"
                    style={{
                      width: "100%",
                    }}
                  >
                    <span className="about-us-listicons">
                      <FaTicketAlt color="gold" />
                    </span>
                    <span className="point-content">
                      Comfortable transportation to and from all temple
                      destinations.
                    </span>
                  </li>
                  <li
                    className="about-us-list-1"
                    style={{
                      width: "100%",
                    }}
                  >
                    <span className="about-us-listicons">
                      <FaTicketAlt color="gold" />
                    </span>
                    <span className="point-content">
                      A professional and knowledgeable tour guide to assist you
                      throughout the journey.
                    </span>
                  </li>
                </ul>
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
                Meals and entrance fees (if any) are not included unless
                explicitly mentioned during booking.
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>4. Discount Policy</h3>
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
                We offer a 22% discount on the base fare for:
                <ul
                  className="about-us-list"
                  style={{
                    gap: "2px",
                    flexDirection: "column",
                  }}
                >
                  <li
                    className="about-us-list-1"
                    style={{
                      width: "100%",
                    }}
                  >
                    <span className="about-us-listicons">
                      <FaTicketAlt color="gold" />
                    </span>
                    <span className="point-content">
                      Senior citizens aged 60 years and above.
                    </span>
                  </li>
                  <li
                    className="about-us-list-1"
                    style={{
                      width: "100%",
                    }}
                  >
                    <span className="about-us-listicons">
                      <FaTicketAlt color="gold" />
                    </span>
                    <span className="point-content">
                      Children aged below 12 years.
                    </span>
                  </li>
                </ul>
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
                To avail of the discount, valid government-issued age proof must
                be shown at the time of boarding.
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
                If proper documentation is not provided, the passenger will be
                required to pay the difference between the discounted and full
                fare before departure
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>5. Cancellation & Refund Policy</h3>
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
                Cancellations must be made at least 24 hours before the
                scheduled departure.
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
                No refunds for cancellations within 24 hours or no-shows.
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
                Refunds (after gateway charges) take 5–7 business days.
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>6. Boarding Information</h3>
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
                Boarding point and time will be shared via SMS 2 hours before
                departure.
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
                Arrive 15 minutes early to avoid delays.
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
                Latecomers may miss the trip without refund.
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>7. Responsibility Disclaimer</h3>
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
                Loss, theft, or damage of personal belongings.
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
                Injuries or medical emergencies during travel.
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
                Delays due to traffic, weather, or other factors.
              </span>
            </li>
          </ul>
        </section>

        <section className="section1-card1s">
          <h3>8. Changes to Terms</h3>
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
                We may update these Terms & Conditions without notice.
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
                Continued use after changes means you accept the updated terms.
              </span>
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Term;
