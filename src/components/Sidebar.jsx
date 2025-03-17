import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
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
    <div className="container bg-dark w-100 rounded mt-2">
      <div className="mb-1 fs-5 mt-1 me-3" onClick={handleShow} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", padding: "10px", color: "white" }}>
        <AiFillHome />
        <span>Home</span>
      </div>
      <div className="mb-1 fs-5 mt-3 me-3" onClick={handleShow} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", padding: "10px", color: "white" }}>
        <FaSearch/>
        <span>Search</span>
      </div>
      <div className="mb-1 fs-5 mt-3 me-3" onClick={handleShow} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", padding: "10px", color: "white" }}>
        <FaMusic/>
        <span>Add Song</span>
      </div>
      <div className="mb-1 fs-5 mt-3 me-3" onClick={handleShow} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", padding: "10px", color: "white" }}>
        <FaList/>
        <span>My Song</span>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bài Hát</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên bài hát</Form.Label>
              <Form.Control type="text" name="title" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control as="textarea" name="description" rows={3} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control type="text" name="author" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File nhạc</Form.Label>
              <Form.Control type="file" name="musicFile" accept="audio/*" onChange={handleFileChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh bìa</Form.Label>
              <Form.Control type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>Hủy</Button>
            <Button variant="primary" type="submit">Thêm bài hát</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Sidebar;
