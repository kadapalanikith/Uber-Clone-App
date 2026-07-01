import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const navigate = useNavigate();
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequest, setRideRequest] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captainlogin");
      return;
    }

    if (!captainData.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setCaptainData(res.data.captain);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/captainlogin");
        });
    }

    // Simulate incoming ride request after 3 seconds
    const timer = setTimeout(() => {
      setRideRequest({
        id: "ride_101",
        passenger: "Sarah Connor",
        pickup: "Central Tech Park",
        destination: "General Hospital",
        fare: 18.75,
        distance: "3.4 mi",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, captainData, setCaptainData]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("token");
      setCaptainData({});
      navigate("/captainlogin");
    }
  };

  const handleAcceptRide = () => {
    setActiveRide(rideRequest);
    setRideRequest(null);
  };

  const handleDeclineRide = () => {
    setRideRequest(null);
  };

  const handleCompleteRide = () => {
    setActiveRide(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative bg-zinc-950 text-white overflow-hidden font-sans">
      {/* Sidebar / Status Dashboard */}
      <div className="w-full md:w-[420px] h-full bg-zinc-900 shadow-2xl z-10 flex flex-col justify-between border-r border-zinc-800">
        <div className="p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <img
                className="w-16 filter invert"
                src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
                alt="Uber Logo"
              />
              <span className="bg-[#10b461] text-xs font-bold text-white px-2 py-0.5 rounded">
                CAPTAIN
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold px-3 py-1.5 rounded-full border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white transition duration-200 cursor-pointer"
            >
              Log out
            </button>
          </div>

          {/* Captain Info */}
          {captainData?.fullName?.firstName && (
            <div className="mb-6 p-4 rounded-xl bg-zinc-800 border border-zinc-700 flex justify-between items-center">
              <div>
                <p className="text-xs text-zinc-400">Driver Partner</p>
                <h2 className="text-lg font-bold text-white">
                  {captainData.fullName.firstName} {captainData.fullName.lastName}
                </h2>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-zinc-400">Rating</span>
                <span className="text-sm font-bold text-amber-400">★ 4.95</span>
              </div>
            </div>
          )}

          {/* Vehicle Info */}
          {captainData?.vehicle?.plate && (
            <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold">Vehicle Details</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                <div>
                  <span className="text-zinc-500 block text-xs">Vehicle Type</span>
                  <span className="font-semibold uppercase">{captainData.vehicle.vehicleType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">License Plate</span>
                  <span className="font-semibold uppercase">{captainData.vehicle.plate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Color</span>
                  <span className="font-semibold capitalize">{captainData.vehicle.color}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-xs">Capacity</span>
                  <span className="font-semibold">{captainData.vehicle.capacity} Passengers</span>
                </div>
              </div>
            </div>
          )}

          {/* Status Toggle Card */}
          <div className="p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700 flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-base">Your Status</h3>
              <p className="text-xs text-zinc-400">
                {isOnline ? "Online and accepting rides" : "Offline / Not accepting rides"}
              </p>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                isOnline ? "bg-[#10b461]" : "bg-zinc-600"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isOnline ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Incoming Ride Request Alert */}
          {isOnline && rideRequest && (
            <div className="p-5 rounded-2xl bg-zinc-800 border-2 border-[#10b461] space-y-4 animate-pulse shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#10b461]/25 text-[#10b461] text-xs font-bold px-2 py-0.5 rounded">
                    NEW REQUEST
                  </span>
                  <h4 className="font-bold text-lg mt-2 text-white">Ride Request</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Est. Fare</span>
                  <span className="text-xl font-black text-[#10b461]">${rideRequest.fare}</span>
                </div>
              </div>

              <div className="space-y-2 border-y border-zinc-700 py-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-emerald-400">●</span>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 text-xs block">Pickup</span>
                    {rideRequest.pickup}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-400">■</span>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 text-xs block">Drop</span>
                    {rideRequest.destination}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDeclineRide}
                  className="w-1/3 bg-zinc-700 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-600 transition cursor-pointer"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptRide}
                  className="flex-1 bg-[#10b461] text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#0d944f] transition cursor-pointer shadow-lg"
                >
                  Accept Ride
                </button>
              </div>
            </div>
          )}

          {/* Active Ride Card */}
          {activeRide && (
            <div className="p-5 rounded-2xl bg-[#111] border border-zinc-800 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-zinc-800 text-zinc-400 text-xs font-bold px-2 py-0.5 rounded">
                    ACTIVE RIDE
                  </span>
                  <h4 className="font-bold text-lg mt-2 text-white">{activeRide.passenger}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400 block">Fare</span>
                  <span className="text-lg font-bold text-[#10b461]">${activeRide.fare}</span>
                </div>
              </div>

              <div className="space-y-2 border-y border-zinc-800 py-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-emerald-400">●</span>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 text-xs block">Pickup</span>
                    {activeRide.pickup}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-400">■</span>
                  <p className="text-zinc-300">
                    <span className="text-zinc-500 text-xs block">Drop</span>
                    {activeRide.destination}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCompleteRide}
                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg text-sm hover:bg-emerald-600 transition cursor-pointer shadow-md"
              >
                Complete Ride
              </button>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-zinc-800 text-xs text-zinc-500 text-center">
          © {new Date().getFullYear()} Uber Clone App Inc.
        </div>
      </div>

      {/* Map Simulated Background */}
      <div
        className="flex-1 h-full min-h-[300px] relative bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')`,
          filter: "brightness(0.2) contrast(1.2)", // Dark theme map for captains
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Status Indicators */}
        <div className="absolute top-6 right-6 flex items-center gap-3 bg-zinc-900/90 backdrop-blur border border-zinc-800 px-4 py-2.5 rounded-full shadow-2xl">
          <span
            className={`w-3.5 h-3.5 rounded-full ${
              isOnline ? "bg-[#10b461] animate-pulse" : "bg-zinc-600"
            }`}
          />
          <span className="text-sm font-bold text-zinc-100">
            {isOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        {/* Simulated Route Markers for Active Ride */}
        {activeRide && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-zinc-900/90 text-white backdrop-blur-md px-6 py-4 rounded-2xl border border-zinc-800 shadow-2xl space-y-1">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Navigation Route</p>
              <p className="text-sm font-bold">Driving to passenger destination: {activeRide.destination}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptainHome;
