import React, { useState } from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans ">
      <TopNav isSidebarOpen={isSidebarOpen} />
      <SideNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="pt-16  " style={{ marginLeft: isSidebarOpen ? "220px" : "60px", padding: "24px" }}>
      
          <Outlet />
       
      </main>
    </div>
  );
};

export default Navbar;



