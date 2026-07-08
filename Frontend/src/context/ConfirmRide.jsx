import React, { createContext, useState } from "react";

// Context definition in case this is imported or used as a Context Provider
export const ConfirmRideContext = createContext();

export const ConfirmRideProvider = ({ children }) => {
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  return (
    <ConfirmRideContext.Provider value={{ confirmRidePanelOpen, setConfirmRidePanelOpen }}>
      {children}
    </ConfirmRideContext.Provider>
  );
};

// Component export
const ConfirmRide = ({
  pickup,
  destination,
  estimatedFare,
  selectedVehicle,
  onConfirm,
  onClose
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-900">Confirm your Ride</h3>
        {onClose && (
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-black transition cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center py-4 bg-zinc-50 border border-zinc-100 rounded-2xl mb-4">
        <img
          className="w-28 h-20 object-contain"
          src={
            selectedVehicle === "car"
              ? "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/UberGo_v1.png"
              : selectedVehicle === "auto"
              ? "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Auto_312x208_pixels_v1.png"
              : "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Moto_Orange_312x208_pixels_v1.png"
          }
          alt="Vehicle"
        />
        <h4 className="font-bold text-lg text-gray-900 capitalize mt-2">{selectedVehicle || "Ride"}</h4>
        <p className="text-2xl font-black text-gray-950 mt-1">
          ₹{estimatedFare ? estimatedFare[selectedVehicle] : "0.00"}
        </p>
      </div>

      <div className="space-y-4 border-t border-b border-gray-100 py-4">
        {/* Pickup */}
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="w-2.5 h-2.5 bg-black rounded-full" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">PICKUP</span>
            <p className="font-bold text-gray-800 text-sm">{pickup || "Current Location"}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="w-2.5 h-2.5 bg-zinc-800 rounded-sm" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">DROP-OFF</span>
            <p className="font-bold text-gray-800 text-sm">{destination || "Destination"}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 shadow-lg cursor-pointer"
      >
        Confirm booking
      </button>
    </div>
  );
};

export default ConfirmRide;
