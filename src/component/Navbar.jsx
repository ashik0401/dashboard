import React from "react";
import { RxExit } from "react-icons/rx";
import Logo from "../assets/Rectangle432.png";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between  mb-10 shadow-lg shadow-gray-100 lg:pl-12 lg:pt-15 lg:pb-4 lg:pr-4 z-100 py-3 px-2">
      <div className="flex gap-3 items-center ">
        <img src={Logo} alt="Logo" />
        <div className="hidden sm:block">
          <h3 className="bg-linear-to-r from-[#F576D6] to-[#6DA5FF] bg-clip-text text-transparent font-semibold text-xl">
            StreamDoing
          </h3>

          <p className="text-[#4473FF] font-semibold">Admin Panel</p>
        </div>
      </div>
      <div className="text-[#BE8283] text-lg flex items-center gap-2">
        <RxExit />
        <button className="text-xl font-medium py-1 px-2.5">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
