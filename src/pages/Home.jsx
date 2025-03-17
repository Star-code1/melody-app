import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Kiểm tra token đăng nhập

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login"); // Chuyển hướng về trang đăng nhập
    };

    return (
        <div>
            <h1>Home</h1>
            {token ? (
                <div>
                    <Link to="/profile">Trang cá nhân</Link>
                    <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                        Đăng xuất
                    </button>
                </div>
            ) : (
                <Link to="/login">Đăng nhập</Link>
            )}
        </div>
    );
}

export default Home;
