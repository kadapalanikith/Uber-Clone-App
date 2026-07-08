import React, { createContext, useState } from "react";

// Context definition in case it is imported or used as a Context Provider
export const WaitingForDriverContext = createContext();

export const WaitingForDriverProvider = ({ children }) => {
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  return (
    <WaitingForDriverContext.Provider value={{ waitingForDriver, setWaitingForDriver }}>
      {children}
    </WaitingForDriverContext.Provider>
  );
};

// Component export
const WaitingForDriver = ({
  assignedCaptain,
  selectedVehicle,
  pickup,
  destination,
  estimatedFare,
  onCancel,
  onStartRide
}) => {
  if (!assignedCaptain) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-start">
        <div>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-full">
            Driver Assigned
          </span>
          <h3 className="text-xl font-bold text-gray-900 mt-2">Driver is arriving in 3 mins</h3>
        </div>
        <img
          className="w-16 h-12 object-contain"
          src={
            selectedVehicle === "car"
              ? "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/UberGo_v1.png"
              : selectedVehicle === "auto"
              ? "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Auto_312x208_pixels_v1.png"
              : "https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Moto_Orange_312x208_pixels_v1.png"
          }
          alt="Vehicle Type"
        />
      </div>

      {/* Driver and Vehicle Details */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-4 shadow-sm">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <div>
            <h4 className="font-bold text-gray-900 text-base">{assignedCaptain.name}</h4>
            <p className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
              ★ {assignedCaptain.rating} <span className="text-gray-400 font-medium">(1,420 trips)</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-white shadow">
            <span className="font-extrabold text-zinc-600 text-base">
              {assignedCaptain.name ? assignedCaptain.name.split(" ").map(n => n[0]).join("") : "VS"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Vehicle</span>
            <span className="font-bold text-gray-800">{assignedCaptain.vehicle}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">License Plate</span>
            <span className="font-bold text-gray-800 uppercase bg-gray-200 px-2 py-0.5 rounded text-xs inline-block border border-gray-300">
              {assignedCaptain.plate}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">Color</span>
            <span className="font-bold text-gray-800">{assignedCaptain.color}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">Fare</span>
            <span className="font-bold text-gray-800">
              ₹{estimatedFare && selectedVehicle ? estimatedFare[selectedVehicle] : "0.00"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-semibold text-gray-700 transition cursor-pointer"
          >
            Cancel Ride
          </button>
        )}
        {onStartRide && (
          <button
            onClick={onStartRide}
            className="flex-1 py-3 bg-black text-white rounded-lg font-semibold hover:bg-zinc-800 transition cursor-pointer"
          >
            Start Ride (Demo)
          </button>
        )}
      </div>
    </div>
  );
};

export default WaitingForDriver;
