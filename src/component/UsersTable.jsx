
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

  const getLevelStyle = (level) => {
    const colors = [
      "#F87171","#FB923C","#FACC15","#4ADE80","#2DD4BF","#60A5FA",
      "#818CF8","#A78BFA","#F472B6","#A3A3A3","#84CC16","#F43F5E"
    ];
    const color = colors[(level - 1) % colors.length];
    if (level > 12) {
      return {
        background: `linear-gradient(135deg, ${color}, ${shadeColor(color, -20)})`,
        color: "white",
        fontWeight: "bold",
        borderRadius: "9999px",
        padding: "0.35rem 0.9rem",
        display: "inline-block",
        textAlign: "center",
        boxShadow: "0 2px 2px rgba(0,0,0,0.3)",
      };
    }
    return {
      backgroundColor: color,
      color: "white",
      fontWeight: "600",
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      display: "inline-block",
      textAlign: "center",
    };
  };

  function shadeColor(color, percent) {
    let f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = Math.abs(percent) / 100,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      "#" +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  }

  const getTypeStyle = (type) => {
    if (type === "Normal")
      return "px-2 py-1 rounded-full bg-green-200 text-green-600 text-xs sm:text-sm";
    if (type === "Host")
      return "px-2 py-1 rounded-full bg-gradient-to-r from-[#EB57FF] to-[#3325C9] text-white text-xs sm:text-sm";
  };

  const formatTime = (timeStr) => {
    let hours = parseInt(timeStr);
    let minutes = 0;
    let seconds = 0;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="w-full">
      <div className="flex  sm:flex-row items-center justify-between mb-3 sm:mb-6 gap-2 sm:gap-3">
        <div className="flex items-center bg-white px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow w-full sm:w-8/12">
          <FaSearch className="text-gray-500 text-sm sm:text-base" />
          <input
            type="text"
            className="ml-2 w-full focus:outline-none text-xs sm:text-base"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center  w-full sm:w-auto">
          <button className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-base w-full sm:w-auto justify-center">
            <CiFilter /> Filter
          </button>
          <button className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 rounded-md text-white bg-linear-to-r from-[#6DA5FF] to-[#F576D6] text-xs sm:text-base w-full sm:w-auto justify-center">
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-2 px-2">User ID</th>
              <th className="pb-2 px-2">Name</th>
              <th className="pb-2 px-2">Type</th>
              <th className="pb-2 px-2">Level</th>
              <th className="pb-2 px-2">Diamonds</th>
              <th className="pb-2 px-2">Beans</th>
              <th className="pb-2 px-2">Location</th>
              <th className="pb-2 px-2">Status</th>
              <th className="pb-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-gray-100">
                <td className="py-2 px-2">{u.id}</td>
                <td className="flex items-center gap-2 px-2">{u.name}</td>
                <td className="px-2">
                  <span className={getTypeStyle(u.type)}>{u.type}</span>
                </td>
                <td className="px-2">
                  <span style={getLevelStyle(u.level)}>Lv-{u.level}</span>
                </td>
                <td className="px-2">{u.diamonds}</td>
                <td className="px-2">{u.beans}</td>
                <td className="px-2">{u.country}</td>
                <td className="px-2">
                  {u.status === "active" ? (
                    <span className="px-2 py-1 rounded-full bg-green-200 text-green-600 text-xs sm:text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-200 text-red-600 text-xs sm:text-sm">
                      Suspended
                    </span>
                  )}
                </td>
                <td className="flex items-center gap-2 text-xl py-2 px-2">
                  <button
                    className="text-black cursor-pointer"
                    onClick={() => setSelectedUser(u)}
                  >
                    <GoEye />
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
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative overflow-y-auto max-h-[90vh] ">
            <button
              className="absolute top-2 right-2 text-gray-500 font-bold text-sm sm:text-base"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-center w-full">
                {selectedUser.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <span>ID :</span>
              <span>{selectedUser.id}</span>
              <span className="flex items-center">User :</span>
              <span className="flex items-center gap-2">
                {selectedUser.image && (
                  <img
                    src={selectedUser.image}
                    alt={selectedUser.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
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
