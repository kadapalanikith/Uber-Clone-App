import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
    vehicle: {
      color: "",
      plate: "",
      capacity: 0,
      vehicleType: "",
    }
  });

  return (
    <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
      {children}
    </CaptainDataContext.Provider>
  );
};
