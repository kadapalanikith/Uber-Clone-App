import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
        <div className="bg-white py-4 pb-7 px-3">
          <h2 className="text-2xl font-bold">Get Started With Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full rounded py-3 bg-black text-white mt-2">Continue</Link>
        </div>
      </div>      
    </div>
  );
};

export default Home;
