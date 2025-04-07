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
                className="me-2"
                style={{width:"25px",height:"25px"}}
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
        const response = await axios.get(`https://melody-t9y4.onrender.com/api/users/check-email?email=${email}`);
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
          const checkEmailResponse = await axios.get(`https://melody-t9y4.onrender.com/api/users/check-email?email=${email}`);

          if (checkEmailResponse.data.exists) {
              // Email đã tồn tại => Đăng nhập bình thường
              const loginResponse = await axios.post("https://melody-t9y4.onrender.com/api/users/google-login", { email });

              if (loginResponse.status === 200) {
                  localStorage.setItem("token", JSON.stringify(loginResponse.data.user));
                  alert("Tài khoản đã tồn tại ! Đang đăng nhập...");
                  window.dispatchEvent(new Event("userAuthChanged"));
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
                  alert("Tạo tài khoản thành công! Đang đăng nhập...");
                  window.dispatchEvent(new Event("userAuthChanged"));
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
      if (formData.password.length < 10 || !/[0-9!@#$%^&*]/.test(formData.password) || !/[A-Z]/.test(formData.password)) {
        newErrors.password = "Mật khẩu phải có ít nhất 10 ký tự, 1 số/ký tự đặc biệt và 1 chữ cái in hoa.";
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
            const response = await axios.post("https://melody-t9y4.onrender.com/api/users", userData);

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
                window.dispatchEvent(new Event("userAuthChanged"));
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
    <Container className="d-flex align-items-center justify-content-center bg-dark text-white" style={{ height: "700px",width: "500px",borderRadius: "10px" }}>
      <div className="w-100 text-center" style={{ maxWidth: "400px" }}>
        <h2 className="text-center  fw-bold mb-2">Đăng ký để</h2>
        <h3 className="text-center fw-bold" style={{marginBottom:"50px"}}>bắt đầu nghe</h3>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-start w-100 fw-bold">Địa chỉ email</Form.Label>
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
            style={{ height: "50px", borderRadius: "30px", color: "black", backgroundColor: "#1ed760", fontWeight: "bold" }}
            
          >
            Tiếp theo
          </Button>


          <div className="position-relative my-4">
                <hr />
                <span className="position-absolute top-50 start-50 translate-middle px-3 bg-dark text-white">
                    Hoặc
                </span>
            </div>
          <Form.Group className="mb-3">
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <div className="d-flex justify-content-center mt-5">
                  <GoogleSignupButton onSuccess={handleGoogleLogin}/>
                </div>
            </GoogleOAuthProvider>
          </Form.Group>
          
          <p className="text-white-50 text-center mt-3">Bạn đã có tài khoản? <span
            style={{ color: "white", textDecoration: "underline", cursor: "pointer" }}
            onMouseOver={(e) => (e.target.style.color = "#1ed760")}
            onMouseOut={(e) => (e.target.style.color = "white")}
            onClick={() => navigate("/Login")}
          >Đăng nhập tại đây</span>
          </p>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton className="p-4 text-white border" style={{ backgroundColor: "#121212" }}>
          <Modal.Title>
            Bước {step} của 3 <br />
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-white border" style={{ backgroundColor: "#121212" }}>
          <ProgressBar now={progressPercentage} className="mb-3" variant="success" />
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Form.Group controlId="password">
                  <h3>Tạo mật khẩu</h3>
                  <Form.Label>Mật khẩu</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="p-3 bg-dark text-white border-0"
                      required
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
                {errors.password && <p className="text-danger small">{errors.password}</p>}
                <ul className="small mt-2">
                  <li>Ít nhất 10 ký tự</li>
                  <li>1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)</li>
                  <li>1 chữ cái in hoa</li>
                </ul>
                <div className="d-flex align-items-start mt-3">
                  <Button variant="primary" onClick={nextStep} className="mt-3 ms-auto" >
                    Tiếp theo
                  </Button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3>Giới thiệu thông tin về bản thân bạn</h3>
                <Form.Group controlId="name">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="p-3 bg-dark text-white border-0"
                  />
                  {errors.name && <p className="text-danger small">{errors.name}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ngày sinh</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      name="day"
                      placeholder="dd"
                      value={formData.day}
                      onChange={handleChange}
                      required
                      className="p-3 bg-dark text-white border-0"
                    />
                    <Form.Control
                      as="select"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      required
                      className="p-3 bg-dark text-white border-0"
                    >
                      <option value="">Tháng</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </Form.Control>
                    <Form.Control
                      type="text"
                      name="year"
                      placeholder="yyyy"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="p-3 bg-dark text-white border-0"
                    />
                  </div>
                  {errors.birthdate && <p className="text-danger small">{errors.birthdate}</p>}
                </Form.Group>
                <Form.Group>
                <Form.Label>Giới tính</Form.Label>
                <div className="d-flex gap-3 flex-wrap">
                  <Form.Check type="radio" label="Nam" name="gender" value="Nam" checked={formData.gender === "Nam"} onChange={handleChange} />
                  <Form.Check type="radio" label="Nữ" name="gender" value="Nữ" checked={formData.gender === "Nữ"} onChange={handleChange} />
                  <Form.Check type="radio" label="Khác" name="gender" value="Khác" checked={formData.gender === "Khác"} onChange={handleChange} />
                  
                </div>
                {errors.gender && <p className="text-danger small">{errors.gender}</p>}
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="secondary" onClick={prevStep}>
                    Quay lại
                  </Button>
                  <Button variant="primary" onClick={nextStep}>
                    Tiếp theo
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3>Điều khoản & Điều kiện</h3>
                <Form.Group controlId="agreeMarketing" className="mb-2">
                  <Form.Check
                    type="checkbox"
                    label="Tôi không muốn nhận tin nhắn tiếp thị từ App"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="agreeSharing" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung cho mục đích tiếp thị."
                    name="agreeSharing"
                    checked={formData.agreeSharing}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <p className="small text-muted">
                  Bằng việc nhấp vào nút Đăng ký, bạn đồng ý với Điều khoản & Điều kiện sử dụng của App.
                  
                </p>
                {errors.terms && <p className="text-danger small">{errors.terms}</p>}
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="success" type="submit" className="px-5">
                    Đăng ký
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>

  );
}

export default Signup;