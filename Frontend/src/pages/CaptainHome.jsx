import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";

const CaptainHome = () => {
  const navigate = useNavigate();
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const [isOnline, setIsOnline] = useState(true);
  const [rideRequest, setRideRequest] = useState(null);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("captain_token");
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
          localStorage.removeItem("captain_token");
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
    const token = localStorage.getItem("captain_token");
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("captain_token");
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
      <div className="absolute bottom-0 left-0 right-0 w-full max-h-[75vh] md:relative md:w-[420px] md:h-full md:max-h-none bg-zinc-900 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] md:shadow-2xl z-10 flex flex-col justify-between border-t md:border-t-0 md:border-r border-zinc-800 rounded-t-3xl md:rounded-t-none transition-all duration-300">
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
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

          {/* Captain Details (Profile & Vehicle Info) */}
          <div className="mb-6">
            <CaptainDetails captainData={captainData} />
          </div>

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
            <div className="mb-6">
              <RidePopUp
                rideRequest={rideRequest}
                handleAcceptRide={handleAcceptRide}
                handleDeclineRide={handleDeclineRide}
              />
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
        <div className="p-4 sm:p-6 border-t border-zinc-800 text-xs text-zinc-500 text-center bg-zinc-900">
          © {new Date().getFullYear()} Uber Clone App Inc.
        </div>
      </div>

      {/* Map Simulated Background */}
      <div
        className="absolute inset-0 w-full h-full md:relative md:flex-1 md:h-full bg-cover bg-center z-0"
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
          <div className="absolute inset-0 flex items-start md:items-center justify-center pt-24 md:pt-0 pointer-events-none">
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
