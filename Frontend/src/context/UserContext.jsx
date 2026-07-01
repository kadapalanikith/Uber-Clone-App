import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    }
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
