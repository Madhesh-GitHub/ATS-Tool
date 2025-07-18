import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icon package (install with: npm install lucide-react)

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="	bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] border-b-[3px] border-[#6366F1]">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl ">
          ATS Tool
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-white">
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => navigate('/')}>
            Home
          </li>
          <li className="text-sm cursor-pointer font-medium hover:underline">
            Features
          </li>
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => navigate('/login')}>
            Login
          </li>
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => navigate('/signup')}>
            Sign Up
          </li>
        </ul>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden text-white ">
          {isOpen ? (
            <X size={24} onClick={() => setIsOpen(false)} className="cursor-pointer" />
          ) : (
            <Menu size={24} onClick={() => setIsOpen(true)} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 px-6 pb-4 md:hidden bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] border-b-[3px] border-[#6366F1] text-white ">
          <li className="text-sm cursor-pointer font-medium hover:underline" onClick={() => { navigate('/'); setIsOpen(false); }}>
            Home
          </li>
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => setIsOpen(false)}>
            Features
          </li>
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => { navigate('/login'); setIsOpen(false); }}>
            Login
          </li>
          <li className="text-sm  cursor-pointer font-medium hover:underline" onClick={() => { navigate('/signup'); setIsOpen(false); }}>
            Sign Up
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;

