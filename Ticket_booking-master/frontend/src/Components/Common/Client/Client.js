import axios from "axios";




//client

const client = axios.create({
 baseURL: "https://bus-backend-bice.vercel.app",
  // baseURL: "http://localhost:8000",

});

export default client;











