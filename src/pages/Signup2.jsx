import React, { useState } from "react";
import { Container, Card, Form, Button, ProgressBar, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup2() {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    city: "",
    country: "",
    confirmation: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep(step - 1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>Đăng ký</Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Bước {step} của 3 <br />
            <h3>Tạo mật khẩu</h3>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar now={progressPercentage} className="mb-3" variant="success" />
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Form.Group controlId="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <ul className="small mt-2">
                  <li>Ít nhất 8 ký tự</li>
                  <li>1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)</li>
                  <li>1 chữ cái in hoa</li>
                </ul>
                <Button variant="success" className="w-100 mt-3" onClick={nextStep}>
                  Tiếp theo
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
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
                <Form.Group controlId="address">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="secondary" onClick={prevStep}>
                    Quay lại
                  </Button>
                  <Button variant="success" type="submit">
                    Hoàn tất
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Signup2;
