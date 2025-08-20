import React, { useEffect } from "react";
import "./Homefeatures.css";

import mision from "../../../../assets/Images/mission.png";
import vission from "../../../../assets/Images/vission.webp";
import value from "../../../../assets/Images/value.png";

import { motion } from "framer-motion";

const Homefeatures = () => {
  return (
    <section>
      <section className="home-feature-container">
        <div className="feature-area feature-bg py-120">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-6 mx-auto">
      
                <motion.div  initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }} className="site-heading text-center">
                  <h2 className="site-title text-white fs-1">
                    Making Travel<span className="span-booking"> Simple, Safe</span> & Accessible
                  </h2>
                  <div className="heading-divider" />
                </motion.div>
              </div>
            </div>
            <motion.div
              className="row"
              style={{ marginBottom: "100px" }}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="feature-item mt-lg-5">
                  <div className="feature-icon">
                    <img
                      src={vission}
                      alt="vission"
                      width="100%"
                      height="auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="feature-content">
                    <h4>Vission</h4>
                    <p>
                      We envision becoming the most trusted and preferred
                      platform for bus ticket bookings, connecting cities and
                      people with comfort, convenience, and innovation.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div className="feature-item">
                  <div className="feature-icon">
                    <img
                      src={mision}
                      alt="mission"
                      width="100%"
                      height="auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="feature-content">
                    <h4>Mission</h4>
                    <p>
                      Our mission is to simplify bus travel for everyone by
                      offering a seamless, secure, and user-friendly ticket
                      booking experience—anytime, anywhere.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="feature-item mt-lg-5">
                  <div className="feature-icon">
                    <img
                      src={value}
                      alt="value"
                      width="100%"
                      height="auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="feature-content">
                    <h4>Value</h4>
                    <p>
                      We value customer satisfaction, transparency, and
                      reliability in every journey. Our goal is to make travel
                      easy, safe, and accessible for everyone.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Homefeatures;
