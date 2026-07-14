import React from "react";

const RidePopUp = ({
  rideRequest,
  handleAcceptRide,
  handleDeclineRide
}) => {
  if (!rideRequest) return null;

  const { passenger, pickup, destination, fare, distance } = rideRequest;
  const passengerInitial = passenger ? passenger.charAt(0).toUpperCase() : "P";

  return (
    <div className="p-5 rounded-2xl bg-zinc-900 border-2 border-emerald-500/80 shadow-2xl space-y-5 animate-pulse-slow backdrop-blur-md bg-zinc-900/95 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            New Request
          </span>
          <h4 className="font-extrabold text-xl mt-2 text-white tracking-wide">Incoming Ride</h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Est. Fare</span>
          <span className="text-2xl font-black text-emerald-400">${fare}</span>
        </div>
      </div>

      {/* Passenger mini-card */}
      <div className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-850 rounded-xl">
        <div className="w-10 h-10 bg-zinc-700 text-white rounded-full flex items-center justify-center font-bold text-base shadow">
          {passengerInitial}
        </div>
        <div>
          <h5 className="font-bold text-sm text-white">{passenger}</h5>
          <p className="text-xs text-zinc-400 font-medium">Distance: {distance}</p>
        </div>
      </div>

      {/* Route Info Connector UI */}
      <div className="space-y-4 relative border-l-2 border-zinc-800 pl-4 ml-3 my-2">
        {/* Pickup Marker */}
        <div className="relative">
          <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
          <div className="text-sm">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Pickup</span>
            <p className="font-semibold text-zinc-200 text-xs sm:text-sm">{pickup}</p>
          </div>
        </div>

        {/* Dropoff Marker */}
        <div className="relative pt-1">
          <span className="absolute -left-[21px] top-2.5 w-2 h-2 rounded bg-red-500 ring-4 ring-red-500/20" />
          <div className="text-sm">
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Destination</span>
            <p className="font-semibold text-zinc-200 text-xs sm:text-sm">{destination}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleDeclineRide}
          className="w-1/3 bg-zinc-800 text-zinc-400 font-bold py-3 rounded-xl text-xs hover:bg-zinc-750 hover:text-white transition duration-200 cursor-pointer border border-zinc-850"
        >
          Decline
        </button>
        <button
          onClick={handleAcceptRide}
          className="flex-1 bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-emerald-600 active:scale-[0.98] transition duration-200 cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
