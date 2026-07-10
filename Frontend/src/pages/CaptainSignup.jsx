import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { captainData, setCaptainData } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);

      if (response.status === 201) {
        const data = response.data;
        setCaptainData(data.captain);
        localStorage.setItem("captain_token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors.map(e => e.msg).join(", ");
        setError(errorMsg);
      } else {
        setError(err.response?.data?.message || "Registration failed. Try again.");
      }
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 flex flex-col justify-between min-h-[600px] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img
              className="w-16 filter invert"
              src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
              alt="Uber Logo"
            />
            <span className="bg-[#10b461] text-[10px] font-bold text-white px-2 py-0.5 rounded">
              CAPTAIN
            </span>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5">What's your name?</h3>
              <div className="flex gap-3">
                <input
                  required
                  className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5">What's your email?</h3>
              <input
                required
                className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-full text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5">Enter Password</h3>
              <input
                required
                className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-full text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5">Vehicle Information</h3>
              <div className="flex gap-3">
                <input
                  required
                  className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="Vehicle Color"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  required
                  className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="Vehicle Plate"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <input
                required
                className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                type="number"
                min="1"
                placeholder="Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-zinc-800 text-zinc-300 rounded-lg px-4 py-2.5 border border-zinc-700 w-1/2 text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled className="text-zinc-500">Select Type</option>
                <option value="car" className="text-white">Car</option>
                <option value="auto" className="text-white">Auto</option>
                <option value="motorcycle" className="text-white">Motorcycle</option>
              </select>
            </div>

            {error && <p className="text-red-400 text-sm mt-1 text-center font-medium">{error}</p>}
            <button className="bg-white text-zinc-950 font-bold rounded-lg px-4 py-3 w-full text-base hover:bg-zinc-100 transition duration-200 cursor-pointer shadow-md mt-6">
              Create Captain Account
            </button>
          </form>
          <p className="text-center text-sm text-zinc-400 mt-6">
            Already have a partner account?{" "}
            <Link to="/captainlogin" className="text-emerald-400 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <p className="text-[10px] leading-tight text-zinc-500 text-center font-medium">
            By proceeding, you agree to the Partner Terms and conditions and acknowledge you have read the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
