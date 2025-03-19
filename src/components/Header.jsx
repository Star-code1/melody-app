import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, UserCircle, User, LogOut, Settings, Heart, Clock, Download } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ isLoggedIn = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Custom styles for Bootstrap
  const customStyles = {
    header: {
      background: 'linear-gradient(to right,rgb(71, 57, 70),rgb(6, 24, 98))',
      padding: '16px',
    },
    navButton: {
      backgroundColor: '#fff',
      borderRadius: '50%',
      padding: '8px',
      border: 'none',
      transition: 'background-color 0.2s'
    },
    userMenu: {
      position: 'absolute',
      right: 0,
      marginTop: '8px',
      width: '200px',
      borderRadius: '6px',
      backgroundColor: '#343a40',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px',
      fontSize: '14px',
      color: '#dee2e6',
      textDecoration: 'none',
      transition: 'background-color 0.2s'
    },
    menuItemHover: {
      backgroundColor: '#495057'
    },
    signupButton: {
      padding: '8px 16px',
      borderRadius: '50px',
      backgroundColor: 'transparent',
      border: '1px solid white',
      color: 'white',
      transition: 'background-color 0.2s, transform 0.2s'
    },
    loginButton: {
      padding: '8px 16px',
      borderRadius: '50px',
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      fontWeight: '500',
      transition: 'transform 0.2s'
    }
  };

  return (
    <div style={customStyles.header} className="d-flex align-items-center justify-content-between">
      {/* Left side - Navigation arrows */}
      <div className="d-flex gap-2">
        <button style={customStyles.navButton} className="btn">
          <ChevronLeft size={20} />
        </button>
        <button style={customStyles.navButton} className="btn">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Middle section - could be a search bar or title */}
      <div className="flex-grow-1"></div>

      {/* Right side - Authentication */}
      <div>
        {isLoggedIn ? (
          <div className="position-relative">
            <button 
              onClick={toggleUserMenu}
              style={customStyles.navButton}
              className="btn"
            >
              <UserCircle size={20} />
            </button>

            {/* User dropdown menu */}
            {isUserMenuOpen && (
              <div style={customStyles.userMenu}>
                <div className="py-1">
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <User className="me-2" size={16} />
                    Hồ sơ cá nhân
                  </a>
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <Heart className="me-2" size={16} />
                    Bài hát yêu thích
                  </a>
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <Clock className="me-2" size={16} />
                    Nghe gần đây
                  </a>
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <Download className="me-2" size={16} />
                    Tải xuống
                  </a>
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <Settings className="me-2" size={16} />
                    Cài đặt
                  </a>
                  <a
                    href="#"
                    style={customStyles.menuItem}
                    className="d-flex align-items-center"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = customStyles.menuItemHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    <LogOut className="me-2" size={16} />
                    Đăng xuất
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="d-flex gap-3">
            <button 
              style={customStyles.signupButton}
              className="btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Đăng ký
            </button>
            <button 
              style={customStyles.loginButton}
              className="btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;