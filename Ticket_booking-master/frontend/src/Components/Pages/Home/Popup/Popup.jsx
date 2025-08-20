import React, { useState, useEffect } from "react";
import "./OfferPopup.css";
import { useNavigate } from "react-router-dom";
import client from "../../../Common/Client/Client";
import imagesOffer from "../../../../assets/Images/offerImage.png";

const DateControlledOffer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const isOfferActive = () => {
    const today = new Date();
    const currentDate = `${String(today.getDate()).padStart(2, "0")}/${String(
      today.getMonth() + 1
    ).padStart(2, "0")}/${today.getFullYear()}`;

    const [startDay, startMonth, startYear] = offers[0]?.startDate
      .split("/")
      .map(Number);
    const [endDay, endMonth, endYear] = offers[0]?.endDate
      .split("/")
      .map(Number);
    const [currentDay, currentMonth, currentYear] = currentDate
      .split("/")
      .map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay, 23, 59, 59);
    const current = new Date(currentYear, currentMonth - 1, currentDay);

    return current >= start && current <= end;
  };

  useEffect(() => {
    if (!offers.length) return;

    const hasBeenShown = sessionStorage.getItem("offerPopupShown");

    if (isOfferActive() && !hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [offers]);

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = async () => {
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

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("offerPopupShown", "true");
  };

  const handleClaim = () => {
    setIsVisible(false);
    sessionStorage.setItem("offerPopupShown", "true");
    navigate("/booking");
  };

  if (!isVisible || !isOfferActive()) {
    return null;
  }

  return (
    <div className="offer-overlay">
      <div className="offer-popup">
        <button className="offer-close" onClick={handleClose}>
          ✕
        </button>

        <div className="offer-container">
          <img src={imagesOffer} className="sp" />
          <div className="offer-header">
            <h2 className="offer-heading">Exclusive Bus Ticket Offer!</h2>
          </div>
        </div>
        <div className="content-ofer">
          <div className="offer-body">
            <p className="offer-details-text">{offers[0]?.description}</p>

            <div className="offer-period">
              <div className="offer-period-item">
                <span className="label">Start Date:</span>
                <span className="value">{offers[0]?.startDate}</span>
              </div>
              <div className="offer-period-item">
                <span className="label">End Date:</span>
                <span className="value">{offers[0]?.endDate}</span>
              </div>
            </div>
          </div>

          <div className="offer-image">
            <img src={offers[0]?.image} alt="Offer" />
          </div>
          <div className="offer-terms">
            <p>
              {" "}
              *Terms and conditions apply. Offer valid for new customers only.
            </p>
          </div>
        </div>

        {/* <button className="offer-claim-btn" onClick={handleClaim}>
          Claim Offer
        </button> */}
      </div>
    </div>
  );
};

export default DateControlledOffer;
