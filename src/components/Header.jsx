import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const Header = ({ isLoggedIn = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="w-full p-4 flex items-center bg-gradient-to-b from-blue-900 to-teal-900 text-white">
      {/* Left side - Navigation arrows */}
      <div className="flex gap-2">
        <button className="bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition">
          <ChevronLeft size={20} />
        </button>
        <button className="bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition">
          <ChevronRight size={20} />
        </button>
      </div>


      {/* Right side - Authentication */}
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="relative">
            <button 
              onClick={toggleUserMenu}
              className="bg-black bg-opacity-30 rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <User size={20} />
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded shadow-lg py-1 z-10">
                <a href="#profile" className="block px-4 py-2 hover:bg-zinc-700">Hồ sơ</a>
                <a href="#settings" className="block px-4 py-2 hover:bg-zinc-700">Cài đặt</a>
                <hr className="border-zinc-700 my-1" />
                <a href="#logout" className="block px-4 py-2 hover:bg-zinc-700">Đăng xuất</a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-10 transition">
              Đăng ký
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition">
              Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;