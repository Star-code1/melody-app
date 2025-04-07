import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, UserCircle, User, LogOut, Settings, Heart, Clock, Download } from 'lucide-react';
import AccountMenu from "../components/AccountMenuButton"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Left from '../assets/Left.png';
import Right from '../assets/Right.png';

const Header = ({ isLoggedIn = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedUser = JSON.parse(token) || {};
      setUser(storedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Check auth status when component mounts
    checkAuthStatus();
    
    // Set up event listener for storage changes
    window.addEventListener("storage", checkAuthStatus);
    
    // Set up event listener for custom auth events
    window.addEventListener("userAuthChanged", checkAuthStatus);
    
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("userAuthChanged", checkAuthStatus);
    };
  }, []);

  // Custom styles for Bootstrap
  const customStyles = {
    header: {
      padding: '16px',
      background: '#181414',
      borderRadius: '2rem',
      margin: '0.5rem 1rem',
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
      <button 
  onClick={() => navigate(-1)} 
  style={{ 
    backgroundImage: `url(${Left})`,
    backgroundSize: "contain",  // Điều chỉnh ảnh theo kích thước nút
    backgroundRepeat: "no-repeat", // Không lặp lại ảnh nền
    backgroundPosition: "center", // Căn giữa ảnh trong nút
    width: "40px", // Đặt kích thước nút tùy ý
    height: "40px",
    transform: "rotate(-45deg)"
  }} 
  className="btn rounded img-fluid me-3"
>
  <ChevronLeft size={20} />
</button>

<button 
  onClick={() => navigate(+1)} 
  style={{ 
    backgroundImage: `url(${Right})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "40px",
    height: "40px",
    transform: "rotate(45deg)"
  }} 
  className="btn rounded img-fluid"
>
  <ChevronRight size={20} />
</button>


      </div>

      {/* Middle section - could be a search bar or title */}
      <div className="flex-grow-1"></div>

      {/* Right side - Authentication */}
      <div>
        {user ? (
          <AccountMenu />
        ) : (
          <div className="d-flex gap-3">
            <button 
              style={customStyles.loginButton}
              className="btn"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={() => navigate("/login")}
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