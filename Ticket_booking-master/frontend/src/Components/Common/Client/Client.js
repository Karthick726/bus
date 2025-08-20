import axios from "axios";

//client

const client = axios.create({
 baseURL: "http://localhost:8000",
  // baseURL: "https://ticket-booking-backend-eight.vercel.app",

});

export default client;











