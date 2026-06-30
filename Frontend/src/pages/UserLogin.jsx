import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen max-w-md mx-auto">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg hover:bg-black transition-all duration-200">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create new Account
          </Link>
        </p>
      </div>
      <div className="mb-4">
        <Link
          to="/captainlogin"
          className="bg-[#10b461] text-white flex items-center justify-center font-semibold mb-5 rounded-lg px-4 py-3 w-full text-lg hover:bg-[#0d944f] transition-all duration-200"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

