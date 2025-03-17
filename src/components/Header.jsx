import React, { useState } from "react";
import {
  Search,
  User,
  Settings,
  LogOut,
  Heart,
  Clock,
  Download,
  Sliders,
} from "lucide-react"; // import logo

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
      {/* Logo */}
      <div className="flex items-center">
        <div className="text-2xl font-bold text-green-500">Logo</div>
        <img src="" alt="" />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* User Icon */}
      <div className="relative">
        <button
          className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700"
          onClick={toggleUserMenu}
        >
          <Sliders className="h-5 w-5 text-white fill-white" />
        </button>
        {/* List menu */}
        {showUserMenu && (
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
    </header>
  );
};

export default Header;
