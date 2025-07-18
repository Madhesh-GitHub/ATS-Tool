import React from "react";
import {
  Home,
  User,
  ChevronLeft,
  ChevronRight,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  FileCheck,
  Eye,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ResumeBuilderSideNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className={`fixed top-0 left-0 h-full bg-[#0EA5E9] text-[#fff] border-r border-[#eee] transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[220px]" : "w-[60px]"}`}>
      <div className="relative flex items-center h-16 px-4 border-b border-[#eee] shadow">
        <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
        {isSidebarOpen && <span className="ml-3 font-bold text-md tracking-wide text-gray-200">Resume Builder</span>}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-blue-100 border border-blue-300 text-blue-700 rounded-full p-1 hover:bg-blue-200"
        >
          {isSidebarOpen
            ? <ChevronLeft size={14} className="text-blue-700" />
            : <ChevronRight size={14} className="text-blue-700" />
          }
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavItem icon={<Home size={18} />} label="Dashboard" path="/builder" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<User size={18} />} label="Personal Info" path="/builder/personal" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Briefcase size={18} />} label="Work Experience" path="/builder/experience" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<GraduationCap size={18} />} label="Education" path="/builder/education" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<FileText size={18} />} label="Skills" path="/builder/skills" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Award size={18} />} label="Achievements" path="/builder/achievements" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Languages size={18} />} label="Languages" path="/builder/languages" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<FileCheck size={18} />} label="Certificates" path="/builder/CertificatePage" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Eye size={18} />} label="Preview Resume" path="/builder/resume-preview" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<Settings size={18} />} label="Settings" path="/builder/settings" isOpen={isSidebarOpen} activePath={activePath} />
        <NavItem icon={<HelpCircle size={18} />} label="Help" path="/builder/help" isOpen={isSidebarOpen} activePath={activePath} />
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, path, isOpen, activePath }) => {
  const navigate = useNavigate();
  const isActive = activePath === path;

  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition 
    ${isActive
          ? "bg-white text-[#1274b1] font-semibold"
          : "hover:bg-white hover:text-[#1274b1] text-white"
        }`}
      onClick={() => navigate(path)}
    >
      {icon}
      {isOpen && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default ResumeBuilderSideNav;
