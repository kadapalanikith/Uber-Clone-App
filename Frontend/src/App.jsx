import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignin from "./pages/CaptainSignin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import CaptainHome from "./pages/CaptainHome";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captainlogin" element={<CaptainSignin />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/captain-home" element={<CaptainHome />} />
      </Routes>
    </div>
  );
};

export default App;
