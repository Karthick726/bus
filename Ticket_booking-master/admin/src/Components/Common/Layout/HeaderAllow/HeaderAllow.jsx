import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const HeaderAllow = (props) => {
  const { setAdmin } = props;
  const location = useLocation();
  const headerPaths = [
    "/",
    "/package",
    "/manage/contact",
    "/bus-layout",
    "/manage/package",
    "/manage/booking",
    "/manage/user-contact",
    "/info",
    "/manage/info",
    "/manage/cancel-booking",
    "/offer",
    "/manage/offer"
  ];
  return (
    <>
      {headerPaths.includes(location.pathname) && (
        <Header setAdmin={setAdmin} />
      )}
    </>
  );
};

export default HeaderAllow;
