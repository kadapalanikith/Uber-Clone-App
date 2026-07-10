import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const token = localStorage.getItem("captain_token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("captain_token");
          navigate("/captainlogin");
        }
      })
      .catch((err) => {
        console.error("Captain logout error:", err);
        localStorage.removeItem("captain_token");
        navigate("/captainlogin");
      });
  }, [token, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-zinc-300">Logging out Captain...</p>
      </div>
    </div>
  );
};

export default CaptainLogout;
