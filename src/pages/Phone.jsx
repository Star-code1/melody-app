import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Phone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  return (
    <Container className="d-flex flex-column align-items-center text-white" style={{ height: "100vh", width: "100vw", paddingTop: "50px" }}>
      <div className="w-100 " style={{ maxWidth: "900px" }}>
        <h2 className="mb-3">Nhập số điện thoại</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <div className="d-flex border rounded p-2 bg-light">
              <Form.Select className="me-2 border-0" style={{ width: "80px" }}>
                <option value="+84">+84</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </Form.Select>
              <Form.Control
                type="text"
                placeholder="Số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border-0 bg-light w-100"
              />
            </div>
          </Form.Group>
          <div className="d-flex justify-content-start" style={{marginTop: "50px"}}>
            <Button
              variant="success"
              className="w-25"
              type="submit"
              style={{ height: "50px", borderRadius: "30px", color: "black", backgroundColor: "#1ed760", fontWeight: "bold" }}
            >
              Tiếp theo
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default Phone;
