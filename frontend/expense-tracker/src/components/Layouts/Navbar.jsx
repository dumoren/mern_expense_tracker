import React, { useContext } from "react";
import { BiDollar } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleNavClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex items-center justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-3 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="rotating-icon">
          <BiDollar className="text-2xl text-[#FFD166]" />
        </div>
        <h2 className="text-lg font-medium text-gray-800">D.E.M Finance</h2>
      </div>

      <div className="flex items-center justify-center gap-1 flex-1 max-w-2xl mx-4">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`flex items-center gap-1.5 text-[14px] ${
              activeMenu === item.label 
                ? "text-gray-800 bg-[#FFD166] bg-opacity-20 border border-[#FFD166]" 
                : "text-gray-600 hover:bg-[#FFE5B4] hover:bg-opacity-50 hover:text-gray-800"
            } py-1.5 px-3 rounded-lg transition-all duration-300`}
            onClick={() => handleNavClick(item.path)}
          >
            <item.icon className={`text-lg ${activeMenu === item.label ? "text-gray-800" : "text-gray-600"}`} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-10"
              height="h-10"
              style="text-sm"
            />
          )}
          <span className="text-gray-800 font-medium hidden sm:block">
            {user?.fullName}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LuLogOut className="text-lg" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
