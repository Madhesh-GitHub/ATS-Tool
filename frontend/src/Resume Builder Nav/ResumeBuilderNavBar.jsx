import React, { useState } from "react";
import ResumeBuilderSideNav from "./ResumeBuilderSideNav"
import ResumeBuilderTopNav from "./ResumeBuilderTopNav";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans">
      <ResumeBuilderTopNav isSidebarOpen={isSidebarOpen} />
      <ResumeBuilderSideNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="pt-16" style={{ marginLeft: isSidebarOpen ? "220px" : "60px", padding: "24px" }}>
        <div className="bg-white ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Navbar;



