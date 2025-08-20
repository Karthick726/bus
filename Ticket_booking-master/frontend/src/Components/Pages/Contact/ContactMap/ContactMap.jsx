import React from "react";
import "./ContactMap.css";

const ContactMap = () => {
  return (
    <section className="contact-map-container">
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.079574532056!2d79.38792957587006!3d10.957361655828542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5532b7401bf815%3A0x28c87b4ab0a46bd1!2sNBS%20Air%20Travels%20Kumbakonam!5e0!3m2!1sen!2sin!4v1747978903132!5m2!1sen!2sin" 
          width="600"
          height="450"
          style={{ border: "none" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
