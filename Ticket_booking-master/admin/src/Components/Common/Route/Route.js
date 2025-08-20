import Bus from "../../Pages/Bus/Bus";
import Home from "../../Pages/Home/Home";
import Info from "../../Pages/Info/Info";
import ManageBooking from "../../Pages/Manage/Booking/ManageBooking";
import CancelBooking from "../../Pages/Manage/CancelBooking/CancelBooking";
import Contact from "../../Pages/Manage/Contact/Contact";
import InfoManage from "../../Pages/Manage/InfoManage/InfoManage";
import OfferManage from "../../Pages/Manage/Offer/OfferManage";
import ManagePackage from "../../Pages/Manage/Package/ManagePackage";
import UserContact from "../../Pages/Manage/UserContact/UserContact";
import Offer from "../../Pages/offer/Offer";
import Vacation from "../../Pages/Package/Package";
import NotFound from "../NotFound/NotFound";


const route = [
  { path: "/", element: <Home /> },
  {path:"/manage/contact",element:<Contact/>},
  {path:"/manage/package",element:<ManagePackage/>},
  {path:"/manage/booking",element:<ManageBooking/>},
  {path:"/manage/cancel-booking",element:<CancelBooking/>},
  {path:"/manage/user-contact",element:<UserContact/>},
  {path:"/manage/offer",element:<OfferManage/>},
  {path:"/manage/info",element:<InfoManage/>},
  {path:"/package",element:<Vacation/>},
  {path:"/info",element:<Info/>},
  {path:"/offer",element:<Offer/>},
  {path:"/bus-layout",element:<Bus/>},

  { path: "*", element: <NotFound /> },
];

export default route;
