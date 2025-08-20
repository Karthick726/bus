import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./src/Components/Common/Layout/Header/Header";
import Footer from "./src/Components/Common/Layout/Footer/Footer";
import ScrollTop from "./src/Components/Common/ScrollTop/ScrollTop";


//common

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
     
      <ScrollTop />
      <Footer />
    </>
  );
};

export default Layout;
