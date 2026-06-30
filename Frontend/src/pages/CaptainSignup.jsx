import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
      }
    });
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
    <div className="p-7 flex flex-col justify-between h-screen max-w-md mx-auto overflow-y-auto">
      <div>
        <img
          className="w-20 mb-6"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt="Uber Captain Logo"
          style={{ filter: "brightness(0) saturate(100%)" }}
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-5">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              type="number"
              min="1"
              placeholder="Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-[#10b461]"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg hover:bg-black transition-all duration-200">
            Create Captain Account
          </button>
        </form>
        <p className="text-center mb-8">
          Already have a partner account?{" "}
          <Link to="/captainlogin" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-[10px] leading-tight text-gray-500 text-center">
          By proceeding, you agree to the Partner Terms and conditions and acknowledge you have read the Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
