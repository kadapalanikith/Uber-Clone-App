import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-0 sm:p-6 md:p-8 font-sans">
      <div 
        className="w-full sm:max-w-md h-[100dvh] sm:h-[800px] flex justify-between flex-col relative overflow-hidden sm:shadow-2xl sm:rounded-2xl bg-cover bg-center border border-gray-100"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1000&auto=format&fit=crop')" }}
      >
        <div className="pt-8 pl-8">
          <img 
            className="w-16 filter invert" 
            src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" 
            alt="Uber Logo" 
          />
        </div>
        <div className="bg-white py-6 pb-8 px-6 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.15)] z-10">
          <h2 className="text-[26px] font-bold text-gray-900 leading-tight">
            Get Started with Uber
          </h2>
          <Link 
            to="/login" 
            className="flex items-center justify-center w-full rounded-lg py-4 bg-black text-white text-lg font-semibold mt-5 hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
          >
            Continue
          </Link>
        </div>
      </div>      
    </div>
  );
};

export default Start;

