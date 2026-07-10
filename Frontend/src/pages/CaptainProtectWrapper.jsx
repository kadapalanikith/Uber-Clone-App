import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("captain_token");

  useEffect(() => {
    if (!token) {
      navigate("/captainlogin");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptainData(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("captain_token");
        navigate("/captainlogin");
      });
  }, [token, navigate, setCaptainData]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-zinc-300">Loading Captain Dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
