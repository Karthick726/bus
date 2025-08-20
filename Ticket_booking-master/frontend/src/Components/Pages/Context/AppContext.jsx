import React, { createContext, useState, useEffect } from "react";
import client from "../../Common/Client/Client";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [travel, setTravel] = useState([]);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await client.get("/contact/get-contact");
        const data = response.data;
        setTravel(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTravel();
  }, []);

  return (
    <AppContext.Provider value={{ travel }}>{children}</AppContext.Provider>
  );
};
