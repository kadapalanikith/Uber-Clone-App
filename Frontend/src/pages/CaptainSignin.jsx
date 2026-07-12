import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptainData(data.captain);
        localStorage.setItem("captain_token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Invalid email or password."
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[550px] border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-8">
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
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5 font-sans">What's your email?</h3>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-full text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-zinc-300 mb-1.5 font-sans">Enter Password</h3>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-zinc-800 text-white placeholder:text-zinc-500 rounded-lg px-4 py-2.5 border border-zinc-700 w-full text-base focus:outline-none focus:ring-2 focus:ring-[#10b461] focus:border-transparent transition duration-200"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-red-400 text-sm mt-1 text-center font-medium font-sans">{error}</p>}
            <button className="bg-white text-zinc-950 font-bold rounded-lg px-4 py-3 w-full text-base hover:bg-zinc-100 transition duration-200 cursor-pointer shadow-md mt-4 font-sans">
              Login as Captain
            </button>
          </form>
          <p className="text-center text-sm text-zinc-400 mt-6 font-sans">
            Want to join?{" "}
            <Link to="/captainsignup" className="text-emerald-400 font-semibold hover:underline">
              Register as a Captain
            </Link>
          </p>
        </div>
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <Link
            to="/login"
            className="bg-zinc-800 text-white flex items-center justify-center font-bold rounded-lg px-4 py-3 w-full text-base hover:bg-zinc-750 transition duration-200 shadow-sm border border-zinc-700 font-sans"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignin;
