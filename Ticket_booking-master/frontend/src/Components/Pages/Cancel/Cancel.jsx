import React from "react";
import Header from "../../Common/Layout/Header/Header";
import PageTop from "../../Common/PageTop/PageTop";
import Footer from "../../Common/Layout/Footer/Footer";
import CancelTicket from "./CancelTicket/CancelTicket";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cancel = () => {
  const { search, state } = useLocation();

  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const date = query.get("date");

  useEffect(() => {
    if (date !== state?.date) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Header />
      <PageTop title={"Cancel Ticket"} />
      <CancelTicket  date={date}/>
      <Footer />
    </div>
  );
};

export default Cancel;
