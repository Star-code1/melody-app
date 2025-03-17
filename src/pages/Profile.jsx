import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  // Giả sử token được lưu trong localStorage
  const token = localStorage.getItem("token");
  const userData = token ? JSON.parse(token) : null; // Giả sử token là JSON
  
  // State cho form
  const [username, setUsername] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(userData?.gender || "Nam");
  const [day, setDay] = useState(userData?.birthDate?.day || "1");
  const [month, setMonth] = useState(userData?.birthDate?.month || "1");
  const [year, setYear] = useState(userData?.birthDate?.year || "2001");
  const [country, setCountry] = useState("Việt Nam");
  const [shareData, setShareData] = useState(userData?.agreeMarketing || true);
  const [error, setError] = useState("");

  const isValidDate = (day, month, year) => {
    const monthDays = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > monthDays[month - 1]) return false;
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) return false;
  
    return true;
  };
  const isLeapYear = (year) => {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  };
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Nếu không có token, điều hướng về trang đăng nhập
    }
  }, [token, navigate]);

  const handleSave = async () => {
    if (!isValidDate(day, month, year)) {
      setError("Ngày tháng năm không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    setError("");
    const updatedProfile = {
      name: username,
      email,
      gender,
      birthDate: { day, month, year },
      agreeMarketing: shareData,
    };
  
    console.log("Dữ liệu gửi lên backend:", updatedProfile);
  
    try {
      if (userData) {
        // Modify the userData object as needed
        userData.name = username;
        userData.email = email;
        userData.gender = gender;
        userData.birthDate = { day, month, year };
        userData.agreeMarketing = shareData;
  
        // Save the updated token back to localStorage
        localStorage.setItem("token", JSON.stringify(userData));
      }
      const response = await axios.put("http://localhost:3000/api/users/update-profile", updatedProfile, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        alert("Cập nhật hồ sơ thành công!");
        console.log("Dữ liệu phản hồi:", response.data);
      } else {
        alert("Cập nhật thất bại: " + response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu cập nhật:", error);
      alert("Đã xảy ra lỗi khi cập nhật hồ sơ.");
    }
  };

  return (
    <Container className="text-white" style={{ maxWidth: "600px" }}>
      <h2 className="fw-bold mb-4">Thông tin cá nhân</h2>
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label>Tên người dùng</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-dark text-white border-0 p-3"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            disabled
            className="bg-dark text-white border-0 p-3"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="••••••••••"
            disabled
            className="bg-dark text-white border-0 p-3"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select
            className="bg-dark text-white border-0 p-3"
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Phi nhị giới">Phi nhị giới</option>
            <option value="Giới tính khác">Giới tính khác</option>
            <option value="Không muốn nêu cụ thể">Không muốn nêu cụ thể</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 text-start" >
          <Form.Label>Ngày sinh</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                min="1"
                max="31"
                value={day}
                className="bg-dark text-white border-0 p-3"
                onChange={(e) => setDay(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                min="1"
                max="12"
                value={month}
                className="bg-dark text-white border-0 p-3"
                onChange={(e) => setMonth(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                min="1900"
                max="2025"
                value={year}
                className="bg-dark text-white border-0 p-3"
                onChange={(e) => setYear(e.target.value)}
              />
            </Col>
          </Row>
          {error && <div className="error-message text-start" style={{ color: 'red' }}>{error}</div>}
        </Form.Group>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Quốc gia hoặc khu vực</Form.Label>
          <Form.Select
            className="bg-dark text-white border-0 p-3"
            value={country}
          >
            <option>Việt Nam</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung cho mục đích tiếp thị."
            checked={shareData}
            onChange={(e) => setShareData(e.target.checked)}
            className="text-secondary text-start"
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="outline-light" className="p-3 ms-auto me-3 border-0" onClick={() => navigate("/")}>
            Hủy
          </Button>
          <Button
            style={{ backgroundColor: "#1DB954", border: "none" }}
            className="p-3"
            onClick={handleSave}
          >
            Lưu hồ sơ
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;
