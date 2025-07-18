import React from "react";
import {
  Home,
  Inbox,
  User,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
  Activity,
  List,
  Settings,
  HelpCircle,GlobeIcon
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SideNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className={`fixed top-0 left-0 h-full bg-[#6366F1] text-white border-r border-[#eee] transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[220px]" : "w-[60px]"}`}>
      <div className="relative flex items-center h-16 px-4 border-b border-[[#fdf2e9] shadow">
        <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
        {isSidebarOpen && <span className="ml-3 font-bold text-md tracking-wide text-white">ATS Tool</span>}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white border border-[#ccc] rounded-full p-1 hover:bg-[#eee]">
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-3">
        <NavItem icon={<Home size={18} />} label="Home" path="/" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Upload size={18} />} label="Upload Resume" path="/app/upload" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Activity size={18} />} label="Resume Score" path="/app/score" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<FileText size={18} />} label="Improve Resume" path="/app/improve" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<List size={18} />} label="Features" path="/app/features" isOpen={isSidebarOpen} activePath={activePath} />
        {/* <NavItem icon={<User size={18} />} label="Sign Up" path="/app/signup" isOpen={isSidebarOpen} activePath={activePath} /> */}
        <NavItem icon={<Settings size={18} />} label="Settings" path="/app/settings" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<HelpCircle size={18} />} label="Help" path="/app/help" isOpen={isSidebarOpen} activePath={activePath} />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, path, isOpen, activePath }) => {
  const navigate = useNavigate();
  const isActive = activePath === path;

  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition  ${isActive ? "bg-white text-[#6366F1] font-semibold " : "hover:bg-white hover:text-[#6366F1] "}`}
      onClick={() => navigate(path)}
    >
      {icon}
      {isOpen && <span className="text-sm ">{label}</span>}
    </div>
  );
};

export default SideNav;