import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="max-w-md mx-auto relative overflow-hidden shadow-2xl rounded-2xl">
      <div 
        className="h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1000&auto=format&fit=crop')" }}
      >
        <img 
          className="w-16 ml-8 filter invert" 
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" 
          alt="Uber Logo" 
        />
        <div className="bg-white py-5 pb-8 px-5 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
          <h2 className="text-[26px] font-bold text-gray-900 leading-tight">
            Get Started with Uber
          </h2>
          <Link 
            to="/login" 
            className="flex items-center justify-center w-full rounded-lg py-4 bg-black text-white text-lg font-semibold mt-5 hover:bg-zinc-800 transition-all duration-200"
          >
            Continue
          </Link>
        </div>
      </div>      
    </div>
  );
};

export default Start;

