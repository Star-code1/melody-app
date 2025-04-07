import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PasswordResetModal({ showModal, setShowModal }){
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    const userData = token ? JSON.parse(token) : null;

    const [email, setEmail] = useState(userData?.email || "");



    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    
    const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const handleResetPassword = async () => {
        setError(""); // Xóa lỗi trước khi kiểm tra

        if (!oldPassword || !password || !confirmPassword) {
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
            const response = await axios.post("https://melody-t9y4.onrender.com/api/users/change-password", {
                email: email,
                oldPassword,
                newPassword: password
            });

            if (response.status === 200) {
                alert("Mật khẩu đã được đổi thành công!");
                setShowModal(false);
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
    return(
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                      <Modal.Body className="p-4 text-white" style={{ backgroundColor: "#121212" }}>
                      <div className="text-center">
                          <h3 className="fw-bold">Tạo mật khẩu mới</h3>
                          <p>Nhập mật khẩu mới ở dưới</p>
                      </div>
          
                      <Form>
                          <Form.Group className="mb-3 position-relative">
                              <Form.Label>Mật khẩu cũ</Form.Label>
                              <div className="position-relative">
                                  <Form.Control
                                      type={showOldPassword ? "text" : "password"}
                                      placeholder="Nhập mật khẩu cũ"
                                      value={oldPassword}
                                      onChange={(e) => setOldPassword(e.target.value)}
                                      className="p-3 bg-dark text-white border-0"
                                  />
                                  <span
                                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                                      style={{ cursor: "pointer" }}
                                      onClick={toggleOldPasswordVisibility}
                                  >
                                      {showOldPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                                  </span>
                              </div>
                          </Form.Group>
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
  );

}
export default PasswordResetModal;