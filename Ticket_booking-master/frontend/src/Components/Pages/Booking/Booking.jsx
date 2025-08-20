import React, { useState } from "react";
import Header from "../../Common/Layout/Header/Header";
import PageTop from "../../Common/PageTop/PageTop";
import Footer from "../../Common/Layout/Footer/Footer";
import DateSelect from "./DateSelect";

const Booking = () => {
  return (
    <div>
      <Header />
      <PageTop title={"Booking"} />
      <DateSelect />
      <Footer />
    </div>
  );
};

export default Booking;
