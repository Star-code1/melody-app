import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenuButton"; 
import ProfileModal from "../components/ProfileModal";

function Home() {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            setUser(storedUser);
        }
    }, []);

    const handleSaveProfile = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white" >
            <h1>Home</h1>
            {user ? (
                <AccountMenu />
            ) : (
                <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
            )}
        </div>
    );
}

export default Home;
