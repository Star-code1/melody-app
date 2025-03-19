import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PasswordResetModal from "./PasswordResetModal";
import ProfileModal from "./ProfileModal";
import { useState, useEffect } from "react";

function AccountMenuButton({ onProfileClick }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    useEffect(() => {
        const checkUserData = () => {
            const token = localStorage.getItem("token");
            setUserData(token ? JSON.parse(token) : null);
        };
        
        checkUserData();
        window.addEventListener("storage", checkUserData);
        window.addEventListener("userAuthChanged", checkUserData);
        
        return () => {
            window.removeEventListener("storage", checkUserData);
            window.removeEventListener("userAuthChanged", checkUserData);
        };
    }, []);

    const avatar = userData?.avatar || "";
    const username = userData?.name ? userData.name.charAt(0).toUpperCase() : "S";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userAuthChanged"));
        navigate("/login");
    };

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-avatar"
                    className="p-0 border-0 bg-transparent"
                    style={{ boxShadow: 'none' }}
                >
                    <div className="d-flex align-items-center justify-content-center" 
                         style={{
                             width: "2.5rem",
                             height: "2.5rem",
                             borderRadius: "50%",
                             overflow: "hidden",
                             backgroundColor: avatar ? "transparent" : "#ff4081",
                             boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                         }}>
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Avatar"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <span
                                className="d-flex justify-content-center align-items-center text-white"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem"
                                }}
                            >
                                {username}
                            </span>
                        )}
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu 
                    align="end" 
                    className="dropdown-menu-dark"
                    style={{ 
                        fontSize: "1rem", 
                        padding: "0.5rem",
                        marginTop: "0.5rem",
                        borderRadius: "0.5rem"
                    }}
                >
                    <Dropdown.Item onClick={() => setShowProfileModal(true)}>Tài khoản</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowPasswordModal(true)}>Đổi mật khẩu</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <PasswordResetModal showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
            <ProfileModal showModal={showProfileModal} setShowModal={setShowProfileModal} />
        </>
    );
}

export default AccountMenuButton;