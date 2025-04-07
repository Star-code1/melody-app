import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [error, setError] = useState("");

    const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://melody-t9y4.onrender.com/api/users/check-email?email=${email}`);
    
            if (response.data.exists) {
                setShowModal(true);
            } else {
                alert("Email không tồn tại");
            }
        } catch (error) {
            console.error("Lỗi kiểm tra email:", error.response?.data || error.message);
            alert("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };
    const handleResetPassword = async () => {
        setError(""); // Xóa lỗi trước khi kiểm tra
    
        if (!password || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }
        
        if (password.length < 8) {
            setError("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }
        
        if (!/[A-Z]/.test(password)) {
            setError("Mật khẩu phải chứa ít nhất 1 chữ cái in hoa.");
            return;
        }
        
        if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError("Mật khẩu phải chứa ít nhất 1 số hoặc ký tự đặc biệt.");
            return;
        }
    
        try {
            const response = await axios.post("https://melody-t9y4.onrender.com/api/users/forgot-password", {
                email,
                newPassword: password
            });
    
            if (response.status === 200) {
                alert("Mật khẩu đã được đổi thành công!");
                setShowModal(false);
                navigate("/Login");
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || "Lỗi đổi mật khẩu";
            if (error.response?.status === 400 && errorMessage === "Mật khẩu cũ không đúng.") {
                setError("Mật khẩu cũ không đúng. Vui lòng nhập lại.");
            } else {
                setError(errorMessage);
            }
            console.error("Lỗi đổi mật khẩu:", error.response?.data || error.message);
        }
    };
    

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center bg-dark text-white" style={{ height: "700px",width: "500px",borderRadius: "10px" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="text-center">
                <h2 className="fw-bold">Đặt lại mật khẩu của bạn</h2>
                <p>Nhập địa chỉ email hoặc tên người dùng</p>
            </div>

            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group className="mb-3" controlId="email">
                <Form.Control
                    type="email"
                    placeholder="Địa chỉ email hoặc tên người dùng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 bg-dark text-white border"
                />
                </Form.Group>
                <span
                            style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
                            onMouseOver={(e) => (e.target.style.color = "#1ed760")}
                            onMouseOut={(e) => (e.target.style.color = "white")}
                            onClick={() => navigate("/Login")}
                            className="float-start"
                        >Quay về đăng nhập</span>
                <Button
                variant="success"
                className="w-100 mb-5 mt-2"
                type="submit"
                style={{ height: "50px", borderRadius: "30px", color: "black", backgroundColor: "#1ed760", fontWeight: "bold" }}
                >
                Tiếp tục
                </Button>
            </Form>
        </div>
        

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Body className="p-4 text-white" style={{ backgroundColor: "#121212" }}>
            <div className="text-center">
                <h3 className="fw-bold">Tạo mật khẩu mới</h3>
                <p>Nhập mật khẩu mới ở dưới</p>
            </div>

            <Form>
                
                <Form.Group className="mb-3 position-relative">
                <Form.Label>Mật khẩu mới</Form.Label>
                <div className="position-relative">
                    <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 bg-dark text-white border-0"
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

                <ul className="text-secondary small">
                <li>10 characters</li>
                <li>1 letter</li>
                <li>1 number or special character (example: # ? ! &)</li>
                </ul>

                <Form.Group className="mb-3 position-relative">
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <div className="position-relative">
                    <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-3 bg-dark text-white border-0"
                    />
                    <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={toggleConfirmPasswordVisibility}
                    >
                    {showConfirmPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                    </span>
                </div>
                </Form.Group>
                {error && <p className="text-danger text-center">{error}</p>}

                <Button className="w-100 p-3" onClick={handleResetPassword} style={{ backgroundColor: "#1DB954", border: "none" }}>
                Create password
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </Container>
    );
};

export default PasswordReset;
