import React, { useState, useContext } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("user_token", data.token);
        navigate("/home");
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
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-8 flex flex-col justify-between min-h-[500px] sm:min-h-[580px] border border-gray-100">
        <div>
          <img
            className="w-16 mb-8"
            src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
            alt="Uber Logo"
          />
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1.5 font-sans">What's your name?</h3>
              <div className="flex gap-3">
                <input
                  required
                  className="bg-gray-50 w-1/2 rounded-lg px-4 py-2.5 border border-gray-200 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="bg-gray-50 w-1/2 rounded-lg px-4 py-2.5 border border-gray-200 text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1.5 font-sans">What's your email?</h3>
              <input
                required
                className="bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-1.5 font-sans">Enter Password</h3>
              <input
                required
                className="bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200 w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-1 text-center font-medium">{error}</p>}
            <button className="bg-black text-white font-semibold rounded-lg px-4 py-3 w-full text-base hover:bg-zinc-800 transition duration-200 cursor-pointer shadow-sm mt-4">
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-[10px] leading-tight text-gray-400 text-center font-medium">
            By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
