import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-50 font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-zinc-800">Logging out...</p>
      </div>
    </div>
  );
};

export default UserLogout;
