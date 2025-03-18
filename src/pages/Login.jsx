import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FaGoogle, FaApple, FaFacebook, FaPhone,FaEye, FaEyeSlash } from "react-icons/fa";
import google_icon from "../assets/icons8-google.svg";
import facebook_icon from "../assets/icons8-facebook-logo.svg";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const CLIENT_ID = "817444295318-ek6nn4sbashgmsb7ikdf6h8lea1i69lh.apps.googleusercontent.com";


    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/users/login", {
                email: username, // Giả sử username chứa email hoặc tên người dùng
                password: password,
            });
    
            if (response.status === 200) {
                alert("Đăng nhập thành công!");
                localStorage.setItem("token", JSON.stringify(response.data.user)); // Lưu token để xác thực sau này
                navigate("/");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.response?.data || error.message);
            setError("Tên người dùng hoặc mật khẩu không đúng.");
        }
    }
    return (
            <Container className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: "700px",width: "500px",borderRadius: "10px" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <Form onSubmit={handleLogin}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-start  w-100" style={{fontWeight: "bold"}}>Email hoặc tên người dùng</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Nhập email hoặc tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    
                    className="bg-dark text-white"
                    />
                </Form.Group>
                <Form.Group className="mb-3 bg-dark position-relative" controlId="formBasicPassword">
                    <Form.Label className="text-start  w-100 mt-3" style={{fontWeight: "bold"}}>Mật Khẩu</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật Khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-dark text-white"
                        />
                        <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                        </span>
                    </div>
                    
                </Form.Group>
                {error && <p className="text-danger small text-center mb-2">{error}</p>}
                <span
                    style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
                    onMouseOver={(e) => (e.target.style.color = "#1ed760")}
                    onMouseOut={(e) => (e.target.style.color = "white")}
                    onClick={() => navigate("/PasswordReset")}
                    className="float-end"
                >Quên mật khẩu</span>
                <Button variant="success" className="w-100 mb-5 mt-2" type="submit" style={{ height:"50px",borderRadius: "30px",color: "black",backgroundColor: "#1ed760",fontWeight: "bold"}}>
                    Tiếp tục
                </Button>
                </Form>
                <p className="mt-3 text-center">
                Bạn chưa có tài khoản? <span
                    style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
                    onMouseOver={(e) => (e.target.style.color = "#1ed760")}
                    onMouseOut={(e) => (e.target.style.color = "white")}
                    onClick={() => navigate("/Signup")}
                >Đăng ký</span>
                </p>
                </div>
            </Container>
            
        );
}
export default Login;
