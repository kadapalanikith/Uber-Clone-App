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
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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

              <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 shadow-lg cursor-pointer">
                Confirm {selectedVehicle === "car" ? "UberGo" : selectedVehicle === "auto" ? "UberAuto" : "Moto"} Booking
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
