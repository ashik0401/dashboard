import { useState } from "react";
import { BsBuildings, BsIncognito } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GoChevronRight, GoHome } from "react-icons/go";
import { IoBarChartOutline, IoGiftOutline, IoMicCircleOutline, IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { LiaCoinsSolid } from "react-icons/lia";
import { MdHistory } from "react-icons/md";
import { PiOfficeChairDuotone } from "react-icons/pi";
import { RiShieldLine } from "react-icons/ri";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { NavLink } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks = [
    { name: "Dashboard", icon: <GoHome size={29}  />, path: "/Dashboard" },
    { name: "Host", icon: <IoMicCircleOutline size={29} />, path: "/host" },
    { name: "Users", icon: <FiUsers size={29} />, path: "/" },
    { name: "Agencies", icon: <BsBuildings size={29} />, path: "/agencies" },
    { name: "Coin Management", icon: <IoWalletOutline size={29} />, path: "/coins" },
    { name: "Transaction History", icon: <MdHistory size={29} />, path: "/transactions" },
    { name: "Live Streams", icon: <VscDeviceCameraVideo size={29} />, path: "/live" },
    { name: "Moderation", icon: <RiShieldLine size={29} />, path: "/moderation" },
    { name: "Analytics", icon: <IoBarChartOutline size={29} />, path: "/analytics" },
    { name: "Finance", icon: <CiBank size={29} />, path: "/finance" },
    { name: "PK Masters", icon: <PiOfficeChairDuotone size={29} />, path: "/pk-masters" },
    { name: "KYC Centre", icon: <BsIncognito size={29} />, path: "/kyc" },
    { name: "Salary Target", icon: <LiaCoinsSolid size={29} />, path: "/salary" },
    { name: "Gifts & Assets", icon: <IoGiftOutline size={29} />, path: "/gifts-assets" },
    { name: "Settings", icon: <IoSettingsOutline size={29} />, path: "/settings" },
  ];

  const dataStore = { name: "Data Store", icon: <GoChevronRight size={29} />, path: "/data-store" };

  return (
    <>
     
      <button
        className="md:block lg:hidden fixed top-30 right-4 z-50 p-2 rounded bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 mr-[39px] shadow-lg px-3 pt-5 border border-white/35  w-[260px] lg:h-full h-screen mb-20 flex flex-col justify-between bg-white z-40 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="lg:space-y-7.5 font-medium lg:text-xl mt-30 lg:mt-0" >
          {mainLinks.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center py-2 gap-2.5  rounded-lg cursor-pointer ${
                  isActive ? "text-[#EE4096] font-semibold" : "hover:bg-gray-200"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span >{item.icon }</span>
              <span >{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className=" pb-5">
          <NavLink
            to={dataStore.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl font-medium text-[#868686]">{dataStore.name}</span>
            <span className="text-[#868686]">{dataStore.icon}</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
