import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, UserCircle, User, LogOut, Settings, Heart, Clock, Download } from 'lucide-react';

const Header = ({ isLoggedIn = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="w-full p-4 flex items-center bg-gradient-to-b from-blue-900 to-teal-900 text-white">
      {/* Left side - Navigation arrows */}
      <div className="flex gap-2 mr-20">
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
              <UserCircle size={20} />
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Bài hát yêu thích
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Nghe gần đây
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Cài đặt
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </a>
              </div>
            </div>
          )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-black hover:bg-opacity-10 transition">
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