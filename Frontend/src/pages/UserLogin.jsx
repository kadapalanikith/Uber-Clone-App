import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("user_token", data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Invalid email or password.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[550px] border border-gray-100">
        <div>
          <img
            className="w-16 mb-8"
            src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
            alt="Uber Logo"
          />
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1.5">What's your email?</h3>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1.5 font-sans">Enter Password</h3>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-1 text-center font-medium">{error}</p>}
            <button className="bg-black text-white font-semibold rounded-lg px-4 py-3 w-full text-base hover:bg-zinc-800 transition duration-200 cursor-pointer shadow-sm mt-4">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            New here?{" "}
            <Link to="/signup" className="text-black font-semibold hover:underline">
              Create new Account
            </Link>
          </p>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <Link
            to="/captainlogin"
            className="bg-[#10b461] text-white flex items-center justify-center font-bold rounded-lg px-4 py-3 w-full text-base hover:bg-[#0d944f] transition duration-200 shadow-sm"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

