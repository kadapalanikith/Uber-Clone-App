import React from "react";

const VehiclePanel = ({
  estimatedFare,
  selectedVehicle,
  setSelectedVehicle,
  onConfirm
}) => {
  if (!estimatedFare) return null;

  return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-lg font-bold text-gray-800">Choose a Vehicle</h3>

      {/* UberGo Card */}
      <div
        onClick={() => setSelectedVehicle("car")}
        className={`flex justify-between items-center p-3 rounded-xl border-2 transition duration-200 cursor-pointer ${
          selectedVehicle === "car"
            ? "border-black bg-zinc-50"
            : "border-zinc-200 hover:bg-zinc-50/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-12 object-contain"
            src="https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/UberGo_v1.png"
            alt="UberGo"
          />
          <div>
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-base">
              UberGo
              <span className="flex items-center gap-0.5 text-xs text-black font-semibold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                4
              </span>
            </h4>
            <p className="text-xs font-semibold text-gray-900">2 mins away</p>
            <p className="text-xs text-gray-500 font-medium">Affordable, compact rides</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-extrabold text-gray-950 text-lg">₹{estimatedFare.car}</p>
        </div>
      </div>

      {/* Moto Card */}
      <div
        onClick={() => setSelectedVehicle("motorcycle")}
        className={`flex justify-between items-center p-3 rounded-xl border-2 transition duration-200 cursor-pointer ${
          selectedVehicle === "motorcycle"
            ? "border-black bg-zinc-50"
            : "border-zinc-200 hover:bg-zinc-50/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-12 object-contain"
            src="https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Moto_Orange_312x208_pixels_v1.png"
            alt="Moto"
          />
          <div>
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-base">
              Moto
              <span className="flex items-center gap-0.5 text-xs text-black font-semibold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                1
              </span>
            </h4>
            <p className="text-xs font-semibold text-gray-900">3 mins away</p>
            <p className="text-xs text-gray-500 font-medium">Affordable motorcycle rides</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-extrabold text-gray-950 text-lg">₹{estimatedFare.motorcycle}</p>
        </div>
      </div>

      {/* UberAuto Card */}
      <div
        onClick={() => setSelectedVehicle("auto")}
        className={`flex justify-between items-center p-3 rounded-xl border-2 transition duration-200 cursor-pointer ${
          selectedVehicle === "auto"
            ? "border-black bg-zinc-50"
            : "border-zinc-200 hover:bg-zinc-50/50"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            className="w-16 h-12 object-contain"
            src="https://www.uber-assets.com/image-resources/content/dam/images/universal/navigation/Uber_Auto_312x208_pixels_v1.png"
            alt="UberAuto"
          />
          <div>
            <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-base">
              UberAuto
              <span className="flex items-center gap-0.5 text-xs text-black font-semibold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                3
              </span>
            </h4>
            <p className="text-xs font-semibold text-gray-900">3 mins away</p>
            <p className="text-xs text-gray-500 font-medium">Affordable Auto rides</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-extrabold text-gray-950 text-lg">₹{estimatedFare.auto}</p>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 shadow-lg cursor-pointer mt-4"
      >
        Confirm {selectedVehicle === "car" ? "UberGo" : selectedVehicle === "auto" ? "UberAuto" : "Moto"} Booking
      </button>
    </div>
  );
};

export default VehiclePanel;
