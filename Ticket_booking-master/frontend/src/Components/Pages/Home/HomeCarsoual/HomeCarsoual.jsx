import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../../../../assets/Images/bus.jpg";
import ExampleCarouselImage1 from "../../../../assets/Images/link1.jpg";
import ExampleCarouselImage2 from "../../../../assets/Images/header.avif";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeCarsoual.css";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import PackageDetails from "../PackageDetails/PackageDetails";
import { motion } from 'framer-motion';

const HomeCarsoual = () => {
  const navigate=useNavigate()
  return (
    <section >
       
      <div className="home-container-carousel">
        <Carousel fade>
          <Carousel.Item>
            <div className="image-container">
              <img src={ExampleCarouselImage2} className="d-block w-100" />
              <div className="gradient-overlay"></div>
            </div>

            <Carousel.Caption>
              <motion.div  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }} style={{ display: "flex", marginBottom: "20px" }}>
                <span className="hero-carousel-highlight">
                  Hassle-Free Booking
                  <span style={{ marginLeft: "10px" }}>
                    <FaLocationDot />
                  </span>
                </span>
              </motion.div>

              <motion.h1  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="hero-carousel-title">
                Quick & <span style={{ color: "#ffffff" }}>Secure</span>{" "}
                Ticketing
              </motion.h1>

              <motion.h5  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="mt-3">
                Book your tickets in just a few clicks. Pay securely with
                multiple options.
                <br />
                No queues. No stress.
              </motion.h5>

              <motion.button  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="btn btn-dark text-light mt-4" onClick={()=>navigate("/booking")} style={{
                  zIndex:20
                }}>
                <Link to="/booking" className="text-light" style={{
                  zIndex:"10"
                }} >
                  Start Booking
                </Link>
                <span style={{ marginLeft: "10px" }}>
                  <FaArrowRightLong />
                </span>
              </motion.button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="image-container">
              <img src={ExampleCarouselImage1} className="d-block w-100" />
              <div className="gradient-overlay"></div>
            </div>
          <Carousel.Caption>
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    style={{ display: "flex", marginBottom: "20px" }}
  >
    <span className="hero-carousel-highlight">
      Navagaraph Bus Booking
      <span style={{ marginLeft: "10px" }}>
        <FaLocationDot />
      </span>
    </span>
  </motion.div>

  <motion.h1
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="hero-carousel-title"
  >
    Book Your <span style={{ color: "#ffffff" }}>Bus Tickets</span> Instantly
  </motion.h1>

  <motion.h5
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="mt-3"
  >
    Enjoy fast, affordable, and secure bus ticket booking<br />
    with Navagaraph — anytime, anywhere.
  </motion.h5>

  <motion.button
    initial={{ opacity: 0, x: 200 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="btn btn-dark text-light mt-4"
    onClick={() => navigate("/booking")}
    style={{ zIndex: "10" }}
  >
    <Link to="/booking" className="text-light">
      Book Now
    </Link>
    <span style={{ marginLeft: "10px" }}>
      <FaArrowRightLong />
    </span>
  </motion.button>
</Carousel.Caption>

          </Carousel.Item>
          <Carousel.Item>
            <div className="image-container">
              <img src={ExampleCarouselImage} className="d-block w-100" />
              <div className="gradient-overlay"></div>
            </div>
            <Carousel.Caption>
              <motion.div  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}  style={{ display: "flex", marginBottom: "20px" }}>
                <span className="hero-carousel-highlight">
                  Travel in Comfort
                  <span style={{ marginLeft: "10px" }}>
                    <FaLocationDot />
                  </span>
                </span>
              </motion.div>

              <motion.h1  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="hero-carousel-title">
                Enjoy a <span style={{ color: "#ffffff" }}>Smooth Journey</span>
              </motion.h1>

              <motion.h5  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="mt-3">
                Clean buses, punctual service, and 24/7 customer support.
                <br />
                Travel the way you deserve.
              </motion.h5>

              <motion.button  initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }} className="btn btn-dark text-light mt-4" onClick={()=>navigate("/about")} style={{
                  zIndex:20
                }}>
                <Link to="/about" className="text-light">
                  Learn More
                </Link>
                <span style={{ marginLeft: "10px" }}>
                  <FaArrowRightLong />
                </span>
              </motion.button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      
      </div>
      
   
   
    </section>
  );
};

export default HomeCarsoual;
