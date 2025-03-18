import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PasswordResetModal from "./PasswordResetModal";
import ProfileModal from "./ProfileModal";
import { useState } from "react";

function AccountMenuButton({ onProfileClick }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userData = token ? JSON.parse(token) : null;
    
    const avatar = userData.avatar || "";
    const username = userData.name ? userData.name.charAt(0).toUpperCase() : "t"; // Nếu không có avatar, hiển thị chữ cái đầu

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
                <Dropdown>
                <Dropdown.Toggle
                    variant="dark"
                    className="rounded-circle p-2 d-flex align-items-center"
                    style={{ background: "#1c1c1c", border: "none" }}
                >
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: "35px", height: "35px", objectFit: "cover" }}
                        />
                    ) : (
                        <span
                            className="text-white d-flex justify-content-center align-items-center"
                            style={{
                                width: "35px",
                                height: "35px",
                                background: "#ff4081",
                                borderRadius: "50%",
                                fontWeight: "bold",
                            }}
                        >
                            {username.charAt(0).toUpperCase()}
                        </span>
                    )}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark">
                    <Dropdown.Item onClick={() => setShowProfileModal(true)}>Tài khoản</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowPasswordModal(true)}>Đổi mật khẩu</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <PasswordResetModal showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
            <ProfileModal showModal={showProfileModal} setShowModal={ setShowProfileModal} />
        </>
    );
}

export default AccountMenuButton;
