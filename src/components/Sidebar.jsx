import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
function Sidebar() {
  const [show, setShow] = useState(false);
  const [songData, setSongData] = useState({
    title: "",
    description: "",
    author: "",
    musicFile: null,
    imageFile: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSongData({ ...songData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("description", songData.description);
    formData.append("artist", songData.author);  // Đổi từ author -> artist
    formData.append("audioFile", songData.musicFile);  // Đổi từ musicFile -> audioFile
    formData.append("imageFile", songData.imageFile);

    try {
        await axios.post("http://localhost:5000/api/songs/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Bài hát đã được thêm!");
        handleClose();
    } catch (error) {
        console.error("Lỗi khi thêm bài hát", error);
    }

};


  return (
    <div className="">
      <div className="container bg-dark w-100 rounded mt-2 py-1">
        <div className="my-3 fs-5 py-3 px-3 d-flex align-items-center text-white"  style={{ cursor: "pointer" }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#555"}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#333"}>
          <Link className="w-100 text-decoration-none text-white" to="/">
            <AiFillHome className="me-3" />
            <span>Trang chủ</span>
          </Link>
        </div>
        <div className="my-3 fs-5 py-3 px-3 d-flex align-items-center text-white" style={{ cursor: "pointer" }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#555"}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#333"}>
           <Link className="w-100 text-decoration-none text-white" to="/Search">
            <FaSearch className="me-3" />
            <span>Tìm kiếm</span>
          </Link>
        </div>
      </div>
      <div className="container bg-dark w-100 rounded mt-2 py-1 ">
        <div className="my-3 fs-5 py-3 px-3 d-flex align-items-center text-white" onClick={handleShow}style={{ cursor: "pointer" }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#555"}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#333"}>
          <Link className="w-100 text-decoration-none text-white" >
            <FaMusic className="me-3" />
            <span>Thêm bài hát </span>
          </Link>
        </div>
        <div className="my-3 fs-5 py-3 px-3 d-flex align-items-center text-white" style={{ cursor: "pointer" }} 
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#333"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#555"}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#333"}>
          <Link className="w-100 text-decoration-none text-white" to="/MySong">
            <FaList className="me-3" />
            <span>Nhạc của tôi</span>
          </Link>
        </div>
      </div>

      
      <Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton className="bg-dark text-white border-0">
    <Modal.Title>Thêm Bài Hát</Modal.Title>
  </Modal.Header>
  <Modal.Body className="bg-dark text-white">
    <p className="text-center text-secondary">Upload an mp3 file</p>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="title"
          placeholder="Tên bài hát"
          onChange={handleChange}
          required
          className="bg-secondary text-white border-0"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          name="description"
          placeholder="Mô tả"
          rows={3}
          onChange={handleChange}
          className="bg-secondary text-white border-0"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="author"
          placeholder="Tác giả"
          onChange={handleChange}
          required
          className="bg-secondary text-white border-0"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Chọn file nhạc</Form.Label>
        <Form.Control
          type="file"
          name="musicFile"
          accept="audio/*"
          onChange={handleFileChange}
          required
          className="bg-secondary text-white border-0"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Chọn ảnh bìa</Form.Label>
        <Form.Control
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-secondary text-white border-0"
        />
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="px-4 py-2 border-0"
        >
          Hủy
        </Button>
        <Button
          type="submit"
          className="px-4 py-2"
          style={{
            backgroundColor: "#1DB954",
            border: "none",
            fontSize: "18px",
          }}
        >
          Thêm bài hát
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

    </div>
  );
}

export default Sidebar;
