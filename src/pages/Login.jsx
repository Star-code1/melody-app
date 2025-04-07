import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FaGoogle, FaApple, FaFacebook, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import google_icon from "../assets/icons8-google.svg";
import facebook_icon from "../assets/icons8-facebook-logo.svg";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function GoogleLoginButton({ onSuccess }) {
    const login = useGoogleLogin({
        onSuccess: (response) => {
            console.log("Login Success:", response);
            if (onSuccess) {
                onSuccess(response);
            }
        },
        onError: (error) => {
            console.error("Login Failed:", error);
        },
    });

    return (
        <Button
            variant="light"
            className="w-100 mb-3"
            style={{ borderRadius: "30px" }}
            onClick={() => login()}
        >
            <img
                src={google_icon}
                alt="Google Logo"
                className="me-2"
                style={{width:"25px",height:"25px"}}
            />
            Đăng nhập bằng Google
        </Button>
    );
}

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
            const response = await axios.post("https://melody-t9y4.onrender.com/api/users/login", {
                email: username, // Giả sử username chứa email hoặc tên người dùng
                password: password,
            });
    
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data.user)); // Lưu token để xác thực sau này
                
                // Dispatch custom event to notify components about auth change
                window.dispatchEvent(new Event("userAuthChanged"));
                
                alert("Đăng nhập thành công!");
                navigate("/");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.response?.data || error.message);
            setError("Tên người dùng hoặc mật khẩu không đúng.");
        }
    }

    const handleGoogleLogin = async (response) => {
        try {
            if (!response || !response.access_token) {
                console.error("Google login error: No access token received");
                alert("Không nhận được thông tin đăng nhập từ Google.");
                return;
            }
    
            const { access_token } = response;
    
            // Gửi yêu cầu tới Google API để lấy thông tin người dùng
            const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
    
            const { email, name, gender, birthdate } = userInfoResponse.data;  
    
            if (!email) {
                console.error("Google login error: No email found in the user data");
                alert("Không tìm thấy email trong thông tin đăng nhập.");
                return;
            }
    
            // Kiểm tra email có tồn tại trong hệ thống chưa
            const checkEmailResponse = await axios.get(`https://melody-t9y4.onrender.com/api/users/check-email?email=${email}`);
    
            if (checkEmailResponse.data.exists) {
                // Email đã tồn tại => Đăng nhập bình thường
                const loginResponse = await axios.post("https://melody-t9y4.onrender.com/api/users/google-login", { email });
    
                if (loginResponse.status === 200) {
                    localStorage.setItem("token", JSON.stringify(loginResponse.data.user));
                    
                    // Dispatch custom event
                    window.dispatchEvent(new Event("userAuthChanged"));
                    
                    alert("Đăng nhập thành công!");
                    navigate("/");
                } else {
                    console.error("Server login error:", loginResponse.data);
                    alert("Đăng nhập không thành công. Vui lòng thử lại.");
                }
            } else {
                // Email chưa tồn tại => Tiến hành đăng ký
                const registerResponse = await axios.post("https://melody-t9y4.onrender.com/api/users/", {
                    email,
                    name,
                    gender: "Nam",
                    birthDate: { day: 1, month: 1, year: 2000 },
                    password: "google_oauth", // Đặt mật khẩu mặc định, không sử dụng thực tế
                    agreeMarketing: true,
                    agreeSharing: true,
                    songs: [],
                    favoriteSongs: [],
                });
    
                if (registerResponse.status === 201) {
                    localStorage.setItem("token", JSON.stringify(registerResponse.data));
                    
                    // Dispatch custom event
                    window.dispatchEvent(new Event("userAuthChanged"));
                    
                    alert("Tạo tài khoản thành công! Đang đăng nhập...");
                    navigate("/");
                } else {
                    console.error("Server register error:", registerResponse.data);
                    alert("Đăng ký không thành công. Vui lòng thử lại.");
                }
            }
        } catch (error) {
            console.error("Google login error:", error);
            alert("Đăng nhập bằng Google thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center bg-dark text-white mt-3" 
          style={{ height: "29.17rem", width: "20.83rem", borderRadius: "0.67rem" }}>
          <div className="w-100" style={{ maxWidth: "16.67rem" }}>
            <h2 className="text-center mb-3" style={{ fontSize: "1.5rem" }}>Đăng nhập</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <div className="d-flex justify-content-center mt-4">
                    <GoogleLoginButton onSuccess={handleGoogleLogin} />
                  </div>
                </GoogleOAuthProvider>
              </Form.Group>
              
              <div className="position-relative my-3">
                <hr />
                <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-white" style={{ fontSize: "1rem" }}>
                  Hoặc
                </span>
              </div>
      
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-start w-100 fw-bold" style={{ fontSize: "1rem" }}>Email hoặc tên người dùng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập email hoặc tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-dark text-white"
                />
              </Form.Group>
      
              <Form.Group className="mb-3 bg-dark position-relative" controlId="formBasicPassword">
                <Form.Label className="text-start w-100 mt-2 fw-bold" style={{ fontSize: "1rem" }}>Mật Khẩu</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-dark text-white"
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-2"
                    style={{ cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                  </span>
                </div>
              </Form.Group>
      
              {error && <p className="text-danger small text-center mb-2">{error}</p>}
      
              <span
                style={{ color: "white", textDecoration: "underline", cursor: "pointer", fontSize: "0.9rem" }}
                onMouseOver={(e) => (e.target.style.color = "#1ed760")}
                onMouseOut={(e) => (e.target.style.color = "white")}
                onClick={() => navigate("/PasswordReset")}
                className="float-end"
              >
                Quên mật khẩu?
              </span>
      
              <Button
                variant="success"
                className="w-100 mt-2 mb-4"
                type="submit"
                style={{ height: "2.08rem", borderRadius: "2rem", color: "black", backgroundColor: "#1ed760", fontWeight: "bold" }}
              >
                Tiếp tục
              </Button>
            </Form>
      
            <p className="text-center mt-2" style={{ fontSize: "0.9rem" }}>
              Bạn chưa có tài khoản?{" "}
              <span
                style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
                onMouseOver={(e) => (e.target.style.color = "#1ed760")}
                onMouseOut={(e) => (e.target.style.color = "white")}
                onClick={() => navigate("/Signup")}
              >
                Đăng ký
              </span>
            </p>
          </div>
        </Container>
    );
}

export default Login;