import axios from "axios";

//client

const client = axios.create({
 baseURL: "https://bus-backend-bice.vercel.app",
  // baseURL: "https://ticket-booking-backend-eight.vercel.app",

});

export default client;











