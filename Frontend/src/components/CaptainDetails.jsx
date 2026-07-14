import React from "react";

const CaptainDetails = ({ captainData }) => {
  if (!captainData || !captainData.fullName) return null;

  const { firstName, lastName } = captainData.fullName;
  const initial = firstName ? firstName.charAt(0).toUpperCase() : "C";

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex justify-between items-center p-4 rounded-2xl bg-zinc-800/60 border border-zinc-800 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-inner shadow-emerald-400">
            {initial}
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">Driver Partner</p>
            <h2 className="text-lg font-bold text-white leading-tight">
              {firstName} {lastName}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-500 block font-medium">Rating</span>
          <span className="text-sm font-black text-amber-400 flex items-center gap-1">
            ★ 4.95
          </span>
        </div>
      </div>

      {/* Driver Performance Stats Card */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Earnings</span>
          <h4 className="text-sm font-black text-white">$142.50</h4>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Trips</span>
          <h4 className="text-sm font-black text-white">9 Rides</h4>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-850 p-3 rounded-xl text-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider block">Hours</span>
          <h4 className="text-sm font-black text-white">4.8h</h4>
        </div>
      </div>

      {/* Vehicle Info */}
      {captainData.vehicle && (
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80 space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16v-4a1 1 0 00-1-1h-3m-4 5h4" />
            </svg>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Vehicle Details</p>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-zinc-300">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wide">Vehicle Type</span>
              <span className="font-semibold uppercase text-zinc-200">{captainData.vehicle.vehicleType}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wide">License Plate</span>
              <span className="font-bold uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs inline-block">
                {captainData.vehicle.plate}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wide">Color</span>
              <span className="font-semibold capitalize text-zinc-200">{captainData.vehicle.color}</span>
            </div>
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wide">Capacity</span>
              <span className="font-semibold text-zinc-200">{captainData.vehicle.capacity} Passengers</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainDetails;
