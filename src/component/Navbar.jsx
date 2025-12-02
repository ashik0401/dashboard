import React from "react";
import { RxExit } from "react-icons/rx";
import Logo from "../assets/Rectangle432.png";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex gap-3 items-center">
        <img src={Logo} alt="Logo" />
        <div className="hidden sm:block">
          <h3 className="bg-linear-to-r from-[#F576D6] to-[#6DA5FF] bg-clip-text text-transparent font-semibold text-lg">
            StreamDoing
          </h3>

          <p className="text-[#4473FF] text-lg font-semibold">Admin Panel</p>
        </div>
      </div>
      <div className="text-[#BE8283] text-lg flex items-center gap-1">
        <RxExit />
        <button className="text-xl font-medium ">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
