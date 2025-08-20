import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import client from "../../Client/Client";
import toast from "react-hot-toast";

const Sidebar = ({ open, toggleSidebar, setAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleLogout = async () => {
    try {
      const res = await client.post(
        "/admins/logout",

        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        toast.error("Token is invalid.Login again");
      } else {
        toast.error("Try again");
      }
    }
  };
  return (
    <Fragment>
      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active" : "collapsed"}`}
              to="/"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/service-add") || isActive("/service-name") ? "active" : "collapsed"
              }`}
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
             <i class="bi bi-door-open"></i>
              <span>Service</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >

<li>
                <Link
                  to="/service-name"
                  className={`${isActive("/service-name") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Service Name</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/service-add"
                  className={`${isActive("/service-add") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Service</span>
                </Link>
              </li>
              
            </ul>
          </li> */}
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/package") ? "active" : "collapsed"
              }`}
              to="/package"
            >
            <i class="bi bi-box-seam"></i>
              <span>Package</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/bus-layout") ? "active" : "collapsed"
              }`}
              to="/bus-layout"
            >
         <i class="bi bi-layout-text-window"></i>
              <span>Layout change</span>
            </Link>
          </li>


  <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/info") ? "active" : "collapsed"
              }`}
              to="/info"
            >
            <i class="bi bi-bell-fill"></i>
              <span>Festival Information</span>
            </Link>
          </li>
            <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/offer") ? "active" : "collapsed"
              }`}
              to="/offer"
            >
           <i class="bi bi-gift-fill"></i>
              <span>Offer Information</span>
            </Link>
          </li>

          <li className="nav-heading">Manage</li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/package") ? "active" : "collapsed"
              }`}
              to="/manage/package"
            >
             <i class="bi bi-box-seam"></i>
              <span>Manage Package</span>
            </Link>
          </li>

            <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/booking") || isActive("/manage/cancel-booking") ? "active" : "collapsed"
              }`}
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
         <i class="bi bi-calendar-check"></i>
              <span>Booking</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >

<li>
                <Link
                  to="/manage/booking"
                  className={`${isActive("/manage/booking") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Booking By Date</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/manage/cancel-booking"
                  className={`${isActive("/manage/cancel-booking") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Cancel Booking</span>
                </Link>
              </li>
             
              
            </ul>
          </li>

            <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/info") ? "active" : "collapsed"
              }`}
              to="/manage/info"
            >
            <i class="bi bi-bell-fill"></i>
              <span>Festival Information</span>
            </Link>
          </li>

             <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/offer") ? "active" : "collapsed"
              }`}
              to="/manage/offer"
            >
           <i class="bi bi-gift-fill"></i>
              <span>Offer Information</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/user-contact") ? "active" : "collapsed"
              }`}
              to="/manage/user-contact"
            >
              <i class="bi bi-person-circle"></i>
              <span>User Contact</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/contact") ? "active" : "collapsed"
              }`}
              to="/manage/contact"
            >
              <i class="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <Button
          variant="contained"
          color="error"
          style={{
            marginTop: "20px",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span
            style={{
              marginLeft: "5px",
            }}
          >
            Logout
          </span>
        </Button>
      </aside>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
