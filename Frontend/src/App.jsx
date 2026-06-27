import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignin from "./pages/CaptainSignin";
import CaptainSignup from "./pages/CaptainSignup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captainlogin" element={<CaptainSignin />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;
