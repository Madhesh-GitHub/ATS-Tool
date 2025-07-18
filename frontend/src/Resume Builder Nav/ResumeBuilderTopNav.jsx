import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, ChevronDown } from "lucide-react";

const ResumeBuilderTopNav = ({ isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({ name: "Alagu", profileImage: "/default-avatar.png" });

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
    alert("Logged out (dummy)");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-white text-white flex items-center justify-end px-4 md:px-8 shadow"
      style={{ paddingLeft: isSidebarOpen ? "220px" : "60px" }}
    >
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-[400px]">
        <input
          type="text"
          placeholder="Search for resume templates, tips, or keywords..."
          className="bg-white border border-[#dcdcdc] placeholder-[#888] text-black px-4 py-2 rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#a18ae6]"
        />
      </div> */}

      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <Mail size={20} className="text-white cursor-pointer" />
        <Bell size={20} className="text-white cursor-pointer" />

        {user && (
          <div className="flex items-center cursor-pointer space-x-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src='profile.png' alt="avatar" className="h-8 w-8 rounded-full object-cover border border-[#ccc]" />
            <ChevronDown size={16} className="text-white" />
          </div>
        )}

        {dropdownOpen && user && (
          <div className="absolute right-0 mt-12 w-40 bg-white rounded-lg shadow text-black py-2 z-50 border border-[#e4e4e4]">
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-[#f5f5f5]">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResumeBuilderTopNav;

