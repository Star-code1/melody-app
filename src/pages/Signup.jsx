import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Modal, ProgressBar } from "react-bootstrap";
import { useState } from "react";
import { FaGoogle, FaApple, FaFacebook, FaEyeSlash, FaEye } from "react-icons/fa";
import google_icon from "../assets/icons8-google.svg";
import facebook_icon from "../assets/icons8-facebook-logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function GoogleSignupButton({ onSuccess }) {
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
                width="20"
                height="20"
                className="me-2"
            />
            Đăng ký bằng Google
        </Button>
    );
}

function Signup() {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const CLIENT_ID = "817444295318-ek6nn4sbashgmsb7ikdf6h8lea1i69lh.apps.googleusercontent.com";

  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    agreeMarketing: false,
    agreeSharing: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidateEmail = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 0;
    }
    
    try {
        const response = await axios.get(`http://localhost:5000/api/users/check-email?email=${email}`);
        if (response.data.exists) {
            return 1;
        }
        return 2;
    } catch (error) {
        console.error("Lỗi khi kiểm tra email:", error);
        return -1;
    }
  };
  
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
          const checkEmailResponse = await axios.get(`http://localhost:5000/api/users/check-email?email=${email}`);

          if (checkEmailResponse.data.exists) {
              // Email đã tồn tại => Đăng nhập bình thường
              const loginResponse = await axios.post("http://localhost:5000/api/users/google-login", { email });

              if (loginResponse.status === 200) {
                  localStorage.setItem("token", JSON.stringify(loginResponse.data.user));
                  alert("Tài khoản đã tồn tại ! Đang đăng nhập...");
                  navigate("/");
              } else {
                  console.error("Server login error:", loginResponse.data);
                  alert("Đăng nhập không thành công. Vui lòng thử lại.");
              }
          } else {
              // Email chưa tồn tại => Tiến hành đăng ký
              const registerResponse = await axios.post("http://localhost:5000/api/users/", {
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


  const handleShow = async () => {
    const result = await isValidateEmail(formData.email);
    if (result < 2) {
        if (result === 0) {
            setEmailError("Email không hợp lệ.");
        } else if (result === 1) {
            setEmailError("Email đã được sử dụng.");
        }
    } else {
        setEmailError("");
        setShow(true);
    }
  };
  const handleClose = () => {
    setShow(false);
    setStep(1);
    setFormData({
      password: "",
      email: "",
      name: "",
      day: "",
      month: "",
      year: "",
      gender: "",
      agreeMarketing: false,
      agreeSharing: false,
    });
    setErrors({});
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  const progressPercentage = (step / 3) * 100;

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day;
  };
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (formData.password.length < 8 || !/[0-9!@#$%^&*]/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự, 1 số/ký tự đặc biệt và 1 chữ cái in hoa.";
      }
    } else if (step === 2) {
      if (!formData.name.trim()) {
        newErrors.name = "Tên không được để trống.";
      }
      if (!formData.day || !formData.month || !formData.year || !isValidDate(formData.day, formData.month, formData.year)) {
        newErrors.birthdate = "Vui lòng nhập đầy đủ ngày, tháng, năm sinh.";
      }
      if (!formData.gender) {
        newErrors.gender = "Vui lòng chọn giới tính.";
      }
    } else if (step === 3) {
      if (!formData.agreeMarketing || !formData.agreeSharing) {
        newErrors.terms = "Bạn phải đồng ý với các điều khoản trước khi tiếp tục.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
        try {
            // Định dạng dữ liệu đúng với MongoDB schema
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                birthDate: {
                    day: parseInt(formData.day),
                    month: parseInt(formData.month),
                    year: parseInt(formData.year)
                },
                gender: formData.gender,
                agreeMarketing: Boolean(formData.agreeMarketing),
                agreeSharing: Boolean(formData.agreeSharing),
                songs: [],
                favoriteSongs: [],
                  
            };

            console.log("Dữ liệu gửi lên server:", userData);

            // Gửi dữ liệu lên backend
            const response = await axios.post("http://localhost:5000/api/users", userData);

            if (response.status === 201) {
                const token = response.data;
                localStorage.setItem("token", JSON.stringify(token));
                console.log("Đăng ký thành công", response.data);
                alert("Đăng ký thành công!");
                setFormData({
                  password: "",
                  email: "",
                  name: "",
                  day: "",
                  month: "",
                  year: "",
                  gender: "",
                  agreeMarketing: false,
                  agreeSharing: false,
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu lên server:", error.response?.data || error.message);
            if (error.response) {
                console.error("Phản hồi từ server:", error.response.data);
                alert("Lỗi từ server: " + JSON.stringify(error.response.data));
            } else if (error.request) {
                console.error("Không nhận được phản hồi từ server:", error.request);
                alert("Không thể kết nối đến server.");
            } else {
                console.error("Lỗi không xác định:", error.message);
                alert("Lỗi: " + error.message);
            }
        }
    } else {
        console.error("Có lỗi trong biểu mẫu");
    }
  };

  

  return (
    <Container className="d-flex align-items-center justify-content-center bg-dark text-white mt-3" 
      style={{ height: "29.17rem", width: "20.83rem", borderRadius: "0.67rem" }}>
      <div className="w-100 text-center" style={{ maxWidth: "16.67rem" }}>
        <h2 className="text-center fw-bold mb-2" style={{ fontSize: "1.5rem" }}>Đăng ký để</h2>
        <h3 className="text-center fw-bold" style={{ marginBottom: "3.33rem", fontSize: "1.25rem" }}>bắt đầu nghe</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-start w-100 fw-bold" style={{ fontSize: "1rem" }}>Địa chỉ email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@domain.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-dark text-white"
            />
            {emailError && <span className="text-danger d-block text-start mt-2">{emailError}</span>}
          </Form.Group>
          <Button
            variant="success"
            className="w-100 mb-3"
            onClick={handleShow}
            style={{ height: "3.33rem", borderRadius: "2rem", color: "black", backgroundColor: "#1ed760", fontWeight: "bold" }}
          >
            Tiếp theo
          </Button>
          <div className="position-relative my-3">
            <hr />
            <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-white" style={{ fontSize: "1rem" }}>
              Hoặc
            </span>
          </div>
          <Form.Group className="mb-3">
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <div className="d-flex justify-content-center mt-4">
                <GoogleSignupButton onSuccess={handleGoogleLogin} />
              </div>
            </GoogleOAuthProvider>
          </Form.Group>
          <p className="text-white-50 text-center mt-3" style={{ fontSize: "0.9rem" }}>
            Bạn đã có tài khoản?{" "}
            <span
              style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
              onMouseOver={(e) => (e.target.style.color = "#1ed760")}
              onMouseOut={(e) => (e.target.style.color = "white")}
              onClick={() => navigate("/Login")}
            >
              Đăng nhập tại đây
            </span>
          </p>
        </Form>
      </div>
    </Container>
  );
  
}

export default Signup;