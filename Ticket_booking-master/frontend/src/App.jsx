import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

const Home = React.lazy(() => import("./Components/Pages/Home/Home"));
// const About = React.lazy(() => import("./Components/Pages/About/About"));
// const Contact = React.lazy(() => import("./Components/Pages/Contact/Contact"));
// const Package = React.lazy(() => import("./Components/Pages/Package/Package"));
// const SeatLayout = React.lazy(() => import("./Components/Pages/SeatLayout/SeatLayout"));
// const Booking = React.lazy(() => import("./Components/Pages/Booking/Booking"));
// const Cancel = React.lazy(() => import("./Components/Pages/Cancel/Cancel"));

import About from "./Components/Pages/About/About";
import Contact from "./Components/Pages/Contact/Contact";
import Package from "./Components/Pages/Package/Package";
import Booking from "./Components/Pages/Booking/Booking";
import SeatLayout from "./Components/Pages/SeatLayout/SeatLayout";
import Cancel from "./Components/Pages/Cancel/Cancel";
import { AppProvider } from "./Components/Pages/Context/AppContext";
import Spinner from "./Components/Common/spinner/Spinner";
import ScrollTop from "./Components/Common/ScrollTop/ScrollTop";
import Term from "./Components/Pages/Term/Term";
import Privacy from "./Components/Pages/Privacy/Privacy";
import NotFound from "./Components/Common/NotFound/NotFound";

const App = () => {
  return (
    <div>
      <AppProvider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                duration: 3000,
                background: "green",
                color: "white",
              },
            },
            error: {
              style: {
                duration: 3000,
                background: "red",
                color: "white",
              },
            },
          }}
        />
        <ScrollTop />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/package" element={<Package />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/seat-layout" element={<SeatLayout />} />
            <Route path="/cancel-ticket" element={<Cancel />} />
            <Route path="/terms" element={<Term />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </div>
  );
};

export default App;
