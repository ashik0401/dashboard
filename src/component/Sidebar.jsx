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
    { name: "Dashboard", icon: <GoHome />, path: "/Dashboard" },
    { name: "Host", icon: <IoMicCircleOutline />, path: "/host" },
    { name: "Users", icon: <FiUsers />, path: "/" },
    { name: "Agencies", icon: <BsBuildings />, path: "/agencies" },
    { name: "Coin Management", icon: <IoWalletOutline />, path: "/coins" },
    { name: "Transaction History", icon: <MdHistory />, path: "/transactions" },
    { name: "Live Streams", icon: <VscDeviceCameraVideo />, path: "/live" },
    { name: "Moderation", icon: <RiShieldLine />, path: "/moderation" },
    { name: "Analytics", icon: <IoBarChartOutline />, path: "/analytics" },
    { name: "Finance", icon: <CiBank />, path: "/finance" },
    { name: "PK Masters", icon: <PiOfficeChairDuotone />, path: "/pk-masters" },
    { name: "KYC Centre", icon: <BsIncognito />, path: "/kyc" },
    { name: "Salary Target", icon: <LiaCoinsSolid />, path: "/salary" },
    { name: "Gifts & Assets", icon: <IoGiftOutline />, path: "/gifts-assets" },
    { name: "Settings", icon: <IoSettingsOutline />, path: "/settings" },
  ];

  const dataStore = { name: "Data Store", icon: <GoChevronRight />, path: "/data-store" };

  return (
    <>
     
      <button
        className="md:block lg:hidden fixed top-20 right-4 z-50 p-2 rounded bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-64 p-5 flex flex-col justify-between bg-white z-40 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="space-y-3">
          {mainLinks.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  isActive ? "text-[#EE4096] font-semibold" : "hover:bg-gray-200"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-5">
          <NavLink
            to={dataStore.path}
            className={({ isActive }) =>
              `flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span className="text-sm">{dataStore.name}</span>
            <span className="text-xl">{dataStore.icon}</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
