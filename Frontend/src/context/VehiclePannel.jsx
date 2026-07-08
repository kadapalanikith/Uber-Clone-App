import React, { createContext, useState } from "react";
import VehiclePanel from "../components/VehiclePanel";

// Context in case it is imported or used as a Context Provider
export const VehiclePannelContext = createContext();

export const VehiclePannelProvider = ({ children }) => {
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  return (
    <VehiclePannelContext.Provider value={{ vehiclePanelOpen, setVehiclePanelOpen }}>
      {children}
    </VehiclePannelContext.Provider>
  );
};

// Component that forwards props to the fully implemented VehiclePanel
const VehiclePannel = (props) => {
  return <VehiclePanel {...props} />;
};

export default VehiclePannel;
