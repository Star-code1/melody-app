import { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const userData = token ? JSON.parse(token) : null;

  const [username, setUsername] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [gender, setGender] = useState(userData?.gender || "Nam");
  const [day, setDay] = useState(userData?.birthDate?.day || "9");
  const [month, setMonth] = useState(userData?.birthDate?.month || "11");
  const [year, setYear] = useState(userData?.birthDate?.year || "2000");
  const [country, setCountry] = useState("Việt Nam");
  const [shareData, setShareData] = useState(
    userData?.agreeMarketing !== undefined ? userData.agreeMarketing : false
  );

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSave = async () => {
    const validDay = day === "" ? 1 : day;
    const validMonth = month === "" ? 1 : month;
    const validYear = year === "" || year < 1900 ? 1900 : year;

    setDay(validDay);
    setMonth(validMonth);
    setYear(validYear);

    const updatedProfile = {
      name: username,
      email,
      gender,
      birthDate: { 
        day: validDay, 
        month: validMonth, 
        year: validYear 
      },
      agreeMarketing: shareData,
    };

    console.log("Dữ liệu gửi lên backend:", updatedProfile);
  
    try {
      if (userData) {
        // Modify the userData object as needed
        userData.name = username;
        userData.email = email;
        userData.gender = gender;
        userData.birthDate = { 
          day: validDay, 
          month: validMonth, 
          year: validYear 
        };
        userData.agreeMarketing = shareData;
  
        // Save the updated token back to localStorage
        localStorage.setItem("token", JSON.stringify(userData));
      }
      const response = await axios.put("https://melody-t9y4.onrender.com/api/users/update-profile", updatedProfile, {
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
    <Modal show={showModal} onHide={() => setShowModal(false)} centered  size="lg">
      <Modal.Header closeButton className=" text-white p-5 " style={{ backgroundColor: "#121212" }}>
        
        <Modal.Title className="fw-bold">Thông tin cá nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-white p-5" style={{ backgroundColor: "#121212" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Tên người dùng</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-dark text-white border-0 p-3 rounded-3"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              disabled
              className="bg-dark text-white border-0 p-3 rounded-3"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Giới tính</Form.Label>
            <Form.Select 
              className="bg-dark text-white border-0 p-3 rounded-3"
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Ngày sinh</Form.Label>
            <Row>
              <Col>
                <Form.Control 
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "") {
                      setDay(""); // Đặt lại giá trị thành 1 nếu người dùng xóa hết
                    } else {
                      const parsedValue = parseInt(newValue, 10);
                      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 31) {
                        setDay(parsedValue);
                      }
                    }
                  }}
                  className="bg-dark text-white border-0 p-3 rounded-3"
                />
              </Col>
              <Col>
                <Form.Control 
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "") {
                      setMonth(""); // Nếu trống, đặt lại 1 ngay lập tức
                    } else {
                      const parsedValue = parseInt(newValue, 10);
                      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 12) {
                        setMonth(parsedValue);
                      }
                    }
                  }}
                  className="bg-dark text-white border-0 p-3 rounded-3"
                />
              </Col>
              <Col>
                <Form.Control 
                  type="number"
                  min="1900"
                  max="2025"
                  value={year}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === "") {
                      setYear(""); // Cho phép xóa nhưng không đặt ngay 1900
                    } else {
                      const parsedValue = parseInt(newValue, 10);
                      if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 2025) {
                        setYear(parsedValue);
                      }
                    }
                  }}
                  className="bg-dark text-white border-0 p-3 rounded-3"
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Quốc gia */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Quốc gia hoặc khu vực</Form.Label>
            <Form.Select 
              className="bg-dark text-white border-0 p-3 rounded-3"
              value={country} 
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="Việt Nam">Việt Nam</option>
            </Form.Select>
          </Form.Group>

          {/* Chia sẻ dữ liệu */}
          <Form.Group className="mb-3 d-flex align-items-center">
            <Form.Check 
              type="checkbox"
              checked={shareData}
              onChange={(e) => setShareData(e.target.checked)}
            />
            <Form.Label className="ms-2">Chia sẻ dữ liệu đăng ký của tôi với các nhà cung cấp nội dung cho mục đích tiếp thị.</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-black border-1 " style={{ backgroundColor: "#121212" }}>
        <Button variant="secondary" onClick={() => setShowModal(false)} className="fw-bold">
          Hủy
        </Button>
        <Button style={{ backgroundColor: "#1DB954", border: "none" }} onClick={handleSave} className="fw-bold">
          Lưu hồ sơ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
