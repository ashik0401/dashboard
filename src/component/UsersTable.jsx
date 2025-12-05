import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import Error from "../assets/mdi_ban.png";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("/usersData.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase())
  );

  const getTypeStyle = (type) => {
    if (type === "Normal")
      return "px-3 py-1 w-[38px] h-[15px] rounded-full bg-green-300 text-green-900 text-[10px]";
    if (type === "Host")
      return "px-5 py-1 w-[38px] h-[15px] rounded-full bg-gradient-to-r from-[#EB57FF] to-[#3325C9] text-white text-[10px]";
  };

  const formatTime = (timeStr) => {
    let hours = parseInt(timeStr);
    let minutes = 0;
    let seconds = 0;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const shadeColor = (color, percent) => {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    R = Math.min(255, Math.floor(R + (255 - R) * (percent / 100)));
    G = Math.min(255, Math.floor(G + (255 - G) * (percent / 100)));
    B = Math.min(255, Math.floor(B + (255 - B) * (percent / 100)));
    return `rgb(${R},${G},${B})`;
  };

  const getLevelStyle = (level) => {
    const colors = [
      "#FFD700","#FFB14F","#FF8C42","#FF7043","#FF4C4C","#FF6F91",
      "#FF85A1","#FF99AC","#FFB6B9","#FFCBD7","#FFC0CB","#DA70D6",
      "#BA55D3","#9932CC","#8A2BE2","#7B68EE","#6A5ACD","#483D8B",
      "#4169E1","#1E90FF",
    ];
    const color = colors[level - 1] || "#AAAAAA";
    if (level >= 12) {
      const lightColor = shadeColor(color, 20);
      return {
        padding: "4px 10px",
        borderRadius: "9999px",
        fontSize: "10px",
        fontWeight: "500",
        color: "white",
        display: "flex",
        width:"60px",
        alignItems: "center",
        gap: "4px",
        background: `linear-gradient(to bottom, ${lightColor}, ${color})`,
        height: "20px",
      };
    } else {
      return {
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "10px",
        fontWeight: "500",
        color: "white",
        display: "inline-block",
        backgroundColor: color,
        height: "17px",
      };
    }
  };

  return (
    <div className="w-full my-6">
      <div className="flex sm:flex-row items-center justify-between sm:mb-6 gap-2 sm:gap-3 pb-6">
        <div className="flex items-center bg-white px-3 py-1.5 sm:px-3 sm:py-2 rounded-md border border-[#BBBBBB] w-full sm:[839px] sm:h-[41px]">
          <FaSearch className="text-gray-500 text-sm sm:text-base" />
          <input
            type="text"
            className="ml-2 w-full focus:outline-none text-xs sm:text-base"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <button className="flex items-center gap-1 px-2 py-1 sm:px-4.5 sm:py-2 rounded-md border border-[#BBBBBB] text-xs sm:text-lg w-full sm:w-[119px] sm:h-10 justify-center sm:font-medium">
            <CiFilter size={24} /> Filter
          </button>
          <button className="flex items-center gap-1 px-2 py-1 sm:px-4.5 sm:py-2 rounded-md text-white bg-linear-to-r from-[#6DA5FF] to-[#F576D6] text-xs sm:text-lg w-full sm:w-[127px] h-10 font-medium justify-center">
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full shadow shadow-[#2B2B2B17] border border-white/35 rounded-xl py-6">
        <table className="min-w-[800px] w-full whitespace-nowrap">
          <thead className="border-b border-[#DFDFDF]">
            <tr className="text-left text-[#535353] text-lg">
              <th className="pb-2 px-9">User ID</th>
              <th className="pb-2 px-2">Name</th>
              <th className="pb-2 px-2">Type</th>
              <th className="pb-2 px-2 ">Level</th>
              <th className="pb-2 px-2">Diamonds</th>
              <th className="pb-2 px-2">Beans</th>
              <th className="pb-2 px-2">Location</th>
              <th className="pb-2 px-2">Status</th>
              <th className="pb-2 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-[#DFDFDF] text-lg">
                <td className="py-4 px-9 font-medium">{u.id}</td>
                <td className="flex text-lg items-center gap-2 px-2 py-4">{u.name}</td>
                <td className="px-2 py-4">
                  <span className={getTypeStyle(u.type)}>{u.type}</span>
                </td>
                <td className="py-4  text-[10px] font-medium">
                  <span style={getLevelStyle(u.level)}>
                    {u.level >= 12 && u.rankImage && (
                      <img src={u.rankImage} alt="rank" className="w-4 h-4 rounded-full" />
                    )}
                    Lv{u.level}
                  </span>
                </td>
                <td className="px-2 py-4 text-lg">{u.diamonds}</td>
                <td className="px-2 py-4 text-lg">{u.beans}</td>
                <td className="px-2 py-4 text-lg">{u.country}</td>
                <td className="px-2 py-4">
                  {u.status === "active" ? (
                    <span className="px-3 py-1 w-[38px] h-[15px] rounded-full bg-green-200 text-green-800 text-[10px]">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 w-[38px] h-[15px] rounded-full bg-red-200 text-red-600 text-[10px]">
                      Suspended
                    </span>
                  )}
                </td>
                <td className="space-x-2.5 text-center">
                  <button className="text-black cursor-pointer" onClick={() => setSelectedUser(u)}>
                    <GoEye size={20} />
                  </button>
                  <button className="text-red-600 cursor-pointer">
                    <img src={Error} alt="" className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 cursor-pointer">
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-2 sm:p-4 ">
          <div className="bg-white rounded-xl p-4 sm:px-14.5 w-[640px] sm:pt-9 relative overflow-y-auto h-[763px] ">
            <button className="absolute top-2 right-2 text-gray-500 font-bold text-sm sm:text-base" onClick={() => setSelectedUser(null)}>✕</button>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg sm:text-3xl font-bold text-center w-full pb-5">{selectedUser.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-xl text-[#181717] font-medium space-y-4">
              <span>ID :</span>
              <span>{selectedUser.id}</span>
              <span className="flex items-center">User :</span>
              <span className="flex items-center gap-2">
                {selectedUser.image && (
                  <img src={selectedUser.image} alt={selectedUser.name} className="w-8 h-8 sm:w-[55px] sm:h-[55px] rounded-full object-cover" />
                )}
                {selectedUser.name}
              </span>
              <span>Country :</span>
              <span>{selectedUser.country}</span>
              <span>Phone Number :</span>
              <span>{selectedUser.phone}</span>
              <span>Coin Balance :</span>
              <span>{selectedUser.coinBalance}</span>
              <span>Coin Spend :</span>
              <span>{selectedUser.coinSpend}</span>
              <span>Earning Balance :</span>
              <span>{selectedUser.earningBalance}</span>
              <span>Grand Total Earning :</span>
              <span>{selectedUser.grandTotalEarning}</span>
              <span>Video Live Time :</span>
              <span>{formatTime(selectedUser.videoLiveTime)}</span>
              <span>Audio Live Time :</span>
              <span>{formatTime(selectedUser.audioLiveTime)}</span>
              <span>Registration Time :</span>
              <span>{selectedUser.registrationTime}</span>
              <span>Last Login Time :</span>
              <span>{selectedUser.lastLoginTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
