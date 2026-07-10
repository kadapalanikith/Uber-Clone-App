import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";

const Home = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  
  // Input states
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [estimatedFare, setEstimatedFare] = useState(null);
  
  // UI Panels states
  const [isSearching, setIsSearching] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination'
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [rideStarted, setRideStarted] = useState(false);
  const [rideCompleted, setRideCompleted] = useState(false);
  
  // Simulated Captain details
  const [assignedCaptain, setAssignedCaptain] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
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
          localStorage.removeItem("user_token");
          navigate("/login");
        });
    }
  }, [navigate, userData, setUserData]);

  const handleLogout = async () => {
    const token = localStorage.getItem("user_token");
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
      localStorage.removeItem("user_token");
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
      setPanelOpen(false);
      setVehiclePanelOpen(true);
    }, 800);
  };

  const handleConfirmBooking = () => {
    setVehiclePanelOpen(false);
    setConfirmRidePanelOpen(true);

    // Simulate finding a captain in 3 seconds
    setTimeout(() => {
      setConfirmRidePanelOpen(false);
      setWaitingForDriver(true);
      setAssignedCaptain({
        name: "Vikram Singh",
        vehicle: "Suzuki Swift",
        plate: "MP-04-CD-5678",
        color: "White Metallic",
        rating: "4.9",
        phone: "+91 98765 43210"
      });
    }, 3000);
  };

  const handleStartRide = () => {
    setWaitingForDriver(false);
    setRideStarted(true);
  };

  const handleCompleteRide = () => {
    setRideStarted(false);
    setRideCompleted(true);
  };

  const handleReset = () => {
    setPickup("");
    setDestination("");
    setEstimatedFare(null);
    setVehiclePanelOpen(false);
    setConfirmRidePanelOpen(false);
    setWaitingForDriver(false);
    setRideStarted(false);
    setRideCompleted(false);
    setAssignedCaptain(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row relative bg-zinc-50 overflow-hidden font-sans">
      
      {/* Sidebar Dashboard */}
      <div className="absolute bottom-0 left-0 right-0 w-full max-h-[75vh] md:relative md:w-[420px] md:h-full md:max-h-none bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.15)] md:shadow-2xl z-10 flex flex-col justify-between border-t md:border-t-0 md:border-r border-gray-100 rounded-t-3xl md:rounded-t-none transition-all duration-300">
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <img
              className="w-16"
              src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
              alt="Uber Logo"
            />
            {!rideStarted && !rideCompleted && (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 hover:text-black transition duration-200 cursor-pointer"
              >
                Log out
              </button>
            )}
          </div>

          {/* Initial Search Panel */}
          {!vehiclePanelOpen && !confirmRidePanelOpen && !waitingForDriver && !rideStarted && !rideCompleted && (
            <div className="space-y-6">
              {userData?.fullName?.firstName && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium">Welcome back,</p>
                  <h2 className="text-xl font-bold text-gray-900">
                    {userData.fullName.firstName} {userData.fullName.lastName}
                  </h2>
                </div>
              )}

              <form onSubmit={calculateFare} className="space-y-4 relative">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Pickup Location
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onFocus={() => {
                      setPanelOpen(true);
                      setActiveField("pickup");
                    }}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Drop Location
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onFocus={() => {
                      setPanelOpen(true);
                      setActiveField("destination");
                    }}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black transition"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition duration-200 disabled:bg-gray-400 cursor-pointer"
                  >
                    {isSearching ? "Finding rides..." : "Search Fare"}
                  </button>
                  {panelOpen && (
                    <button
                      type="button"
                      onClick={() => setPanelOpen(false)}
                      className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 font-semibold cursor-pointer"
                    >
                      Close
                    </button>
                  )}
                </div>
              </form>

              {/* Suggestions Panel */}
              {panelOpen && (
                <div className="border-t border-gray-100 pt-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Suggestions</h3>
                  <LocationSearchPanel
                    activeField={activeField}
                    setPickup={setPickup}
                    setDestination={setDestination}
                  />
                </div>
              )}
            </div>
          )}

          {/* Vehicle Selection Panel */}
          {vehiclePanelOpen && (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setVehiclePanelOpen(false);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-black mb-4 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Search
              </button>
              <VehiclePanel
                estimatedFare={estimatedFare}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                onConfirm={handleConfirmBooking}
              />
            </div>
          )}

          {/* Confirm Ride Panel (Looking for driver loader) */}
          {confirmRidePanelOpen && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center animate-fadeIn">
              <div className="relative flex items-center justify-center w-24 h-24">
                <div className="absolute w-full h-full bg-black rounded-full opacity-10 animate-ping"></div>
                <div className="absolute w-16 h-16 bg-black rounded-full opacity-20 animate-ping delay-75"></div>
                <div className="z-10 w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Looking for nearby drivers</h3>
                <p className="text-sm text-gray-500 mt-1">Matching you with the best ride partner...</p>
              </div>
              <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-left space-y-2 text-sm text-gray-700">
                <p><strong>From:</strong> {pickup}</p>
                <p><strong>To:</strong> {destination}</p>
                <p><strong>Estimated:</strong> ₹{estimatedFare ? estimatedFare[selectedVehicle] : ""}</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-semibold text-gray-700 transition cursor-pointer"
              >
                Cancel Search
              </button>
            </div>
          )}

          {/* Waiting For Driver Panel */}
          {waitingForDriver && assignedCaptain && (
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
                      {assignedCaptain.name ? assignedCaptain.name.split(" ").map(n => n[0]).join("").toUpperCase() : "VS"}
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
                    <span className="text-xs text-gray-400 block font-medium">OTP Code</span>
                    <span className="font-bold text-emerald-600 text-base tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 inline-block">
                      4821
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleStartRide}
                  className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 shadow-md cursor-pointer"
                >
                  Start Trip (Simulation)
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 font-semibold text-gray-700 transition cursor-pointer"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          )}

          {/* Ride Started / Active Trip Panel */}
          {rideStarted && assignedCaptain && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-black text-white text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                    On Trip
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">Heading to destination</h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="bg-zinc-900 text-white rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="space-y-1">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Estimated Arrival</p>
                  <p className="text-2xl font-black text-white">12 mins</p>
                </div>

                <div className="border-t border-zinc-800 pt-3 space-y-2 text-sm text-zinc-300">
                  <p><strong>To:</strong> {destination}</p>
                  <p><strong>Captain:</strong> {assignedCaptain.name} ({assignedCaptain.plate})</p>
                  <p><strong>Fare:</strong> ₹{estimatedFare ? estimatedFare[selectedVehicle] : ""}</p>
                </div>
              </div>

              <button
                onClick={handleCompleteRide}
                className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-600 transition duration-200 shadow-md cursor-pointer"
              >
                Complete Ride (Simulation)
              </button>
            </div>
          )}

          {/* Ride Completed Splash Panel */}
          {rideCompleted && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500 text-emerald-600 shadow-lg">
                <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900">You have arrived!</h3>
                <p className="text-sm text-gray-500 mt-1">Hope you enjoyed your ride with {assignedCaptain?.name || "your captain"}.</p>
              </div>

              <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-semibold text-sm">Ride Fare Paid</span>
                  <span className="font-extrabold text-gray-900 text-lg">₹{estimatedFare ? estimatedFare[selectedVehicle] : ""}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                  <span>Payment Method</span>
                  <span>Uber Cash / Wallet</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition duration-200 cursor-pointer shadow-lg"
              >
                Book another Ride
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 text-xs text-gray-400 text-center bg-white">
          © {new Date().getFullYear()} Uber Clone App Inc.
        </div>
      </div>

      {/* Simulated Map / Right Screen Area */}
      <div 
        className="absolute inset-0 w-full h-full md:relative md:flex-1 md:h-full bg-cover bg-center transition-all duration-700 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')`,
          filter: rideStarted ? "brightness(0.85) contrast(1.1)" : "brightness(0.95)"
        }}
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px] pointer-events-none" />
        
        {/* Floating simulation indicators */}
        {isSearching && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 text-white backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm font-bold">Estimating fares and distances...</p>
            </div>
          </div>
        )}

        {confirmRidePanelOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 text-white backdrop-blur-md px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-pulse border border-zinc-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm font-bold">Broadcasting request to captains MH-04-CD-...</p>
            </div>
          </div>
        )}

        {waitingForDriver && assignedCaptain && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-zinc-900/90 text-white border border-zinc-800 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2 max-w-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-sm font-bold">{assignedCaptain.name} is on the way!</p>
              </div>
              <p className="text-xs text-zinc-400 font-semibold uppercase">Pickup: {pickup}</p>
            </div>
          </div>
        )}

        {rideStarted && assignedCaptain && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-zinc-950/95 text-white border border-zinc-800 backdrop-blur-md px-8 py-5 rounded-3xl shadow-2xl flex flex-col items-center gap-2 max-w-md animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-base font-black tracking-wide">ACTIVE TRIP NAVIGATION</p>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-emerald-500 animate-pulse w-3/4"></div>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-semibold text-center uppercase">
                Driving from {pickup} to {destination}
              </p>
            </div>
          </div>
        )}

        {rideCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10 backdrop-blur-[1px]">
            <div className="bg-white/95 text-zinc-900 border border-gray-200 px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3 max-w-sm text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg font-black text-gray-900">Trip Completed!</p>
              <p className="text-xs text-gray-500 font-medium">Successfully reached {destination}.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
