import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!userData.email) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUserData(res.data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate, userData, setUserData]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.removeItem("token");
      setUserData({});
      navigate("/login");
    }
  };

  const calculateFare = (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;
    setIsSearching(true);
    
    setTimeout(() => {
      const baseDistance = Math.max(5, (pickup.length + destination.length) % 20);
      const fares = {
        car: (baseDistance * 12 + 50).toFixed(2),
        auto: (baseDistance * 8 + 30).toFixed(2),
        motorcycle: (baseDistance * 5 + 20).toFixed(2),
      };
      setEstimatedFare(fares);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative bg-zinc-50 overflow-hidden font-sans">
      <div className="w-full md:w-[420px] h-full bg-white shadow-2xl z-10 flex flex-col justify-between border-r border-gray-100">
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <img
              className="w-16"
              src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
              alt="Uber Logo"
            />
            <button
              onClick={handleLogout}
              className="text-sm font-semibold px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-black transition duration-200 cursor-pointer"
            >
              Log out
            </button>
          </div>

          {userData?.fullName?.firstName && (
            <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <h2 className="text-xl font-bold text-gray-900">
                {userData.fullName.firstName} {userData.fullName.lastName}
              </h2>
            </div>
          )}

          <form onSubmit={calculateFare} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Pickup Location
              </label>
              <input
                required
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Drop Location
              </label>
              <input
                required
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition duration-200 disabled:bg-gray-400 cursor-pointer"
            >
              {isSearching ? "Finding rides..." : "Search Fare"}
            </button>
          </form>

          {estimatedFare && (
            <div className="mt-8 space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-800">Select Ride Option</h3>
              
              <div
                onClick={() => setSelectedVehicle("car")}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition duration-200 cursor-pointer ${
                  selectedVehicle === "car"
                    ? "border-black bg-zinc-50"
                    : "border-gray-150 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-100 p-2 rounded-lg">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z"/>
                      <circle cx="7.5" cy="14.5" r="1.5"/>
                      <circle cx="16.5" cy="14.5" r="1.5"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      UberGo <span className="text-xs font-normal text-gray-500">4 min away</span>
                    </h4>
                    <p className="text-xs text-gray-500">Affordable compact cars</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-950">${estimatedFare.car}</p>
                </div>
              </div>

              <div
                onClick={() => setSelectedVehicle("auto")}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition duration-200 cursor-pointer ${
                  selectedVehicle === "auto"
                    ? "border-black bg-zinc-50"
                    : "border-gray-150 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-100 p-2 rounded-lg">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 8h-1V5h-3v3H9V5H6v3H5c-1.1 0-2 .9-2 2v9c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-9c0-1.1-.9-2-2-2zM5 10h14v2H5v-2zm14 5H5v-1h14v1z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      UberAuto <span className="text-xs font-normal text-gray-500">2 min away</span>
                    </h4>
                    <p className="text-xs text-gray-500">Auto rickshaw rides</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-950">${estimatedFare.auto}</p>
                </div>
              </div>

              <div
                onClick={() => setSelectedVehicle("motorcycle")}
                className={`flex justify-between items-center p-4 rounded-xl border-2 transition duration-200 cursor-pointer ${
                  selectedVehicle === "motorcycle"
                    ? "border-black bg-zinc-50"
                    : "border-gray-150 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-100 p-2 rounded-lg">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 15c0-1.1-.9-2-2-2h-3v-2c0-.55-.45-1-1-1h-2V7c0-.55-.45-1-1-1H7v2h2v2H6c-2.21 0-4 1.79-4 4s1.79 4 4 4h11c1.1 0 2-.9 2-2zm-13 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      Moto <span className="text-xs font-normal text-gray-500">1 min away</span>
                    </h4>
                    <p className="text-xs text-gray-500">Quick motorcycle rides</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-950">${estimatedFare.motorcycle}</p>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 shadow-lg cursor-pointer">
                Confirm {selectedVehicle.toUpperCase()} Booking
              </button>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-100 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Uber Clone App Inc.
        </div>
      </div>

      <div 
        className="flex-1 h-full min-h-[300px] relative bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')`,
          filter: "brightness(0.95)"
        }}
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
        
        {estimatedFare && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 text-white backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm font-semibold">Simulating route from {pickup} to {destination}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
