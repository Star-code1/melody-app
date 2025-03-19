import React, { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaMusic } from "react-icons/fa6";
import { BsFillMusicPlayerFill, BsMusicNote } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import "./Sidebar.scss"; // Make sure to create this SCSS file

function Sidebar() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const [songData, setSongData] = useState({
    title: "",
    description: "",
    artist: "",
    audioFile: null,
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
    if (files && files[0]) {
      setSongData({ ...songData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("title", songData.title);
    formData.append("description", songData.description);
    formData.append("artist", songData.artist);
    formData.append("audioFile", songData.audioFile);
    formData.append("imageFile", songData.imageFile);

    try {
      await axios.post("http://localhost:5000/api/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setToastMessage("Bài hát đã được thêm thành công!");
      setShowToast(true);
      handleClose();
      // Reset form
      setSongData({
        title: "",
        description: "",
        artist: "",
        audioFile: null,
        imageFile: null,
      });
    } catch (error) {
      console.error("Lỗi khi thêm bài hát", error);
      setToastMessage("Có lỗi xảy ra khi thêm bài hát!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <SidebarItem to="/" icon={<AiFillHome />} text="Trang chủ" />
        <SidebarItem to="/SearchPage" icon={<FaSearch />} text="Tìm kiếm" />
      </div>
      
      <div className="sidebar-section">
        <SidebarItem icon={<FaMusic />} text="Thêm bài hát" onClick={handleShow} />
        <SidebarItem to="/LikedSongsPage" icon={<FaHeart />} text="Nhạc yêu thích" />
        <SidebarItem to="/MySong" icon={<FaList />} text="Nhạc của tôi" />
      </div>

      {/* Music Upload Modal */}
      <Modal show={show} onHide={handleClose} centered className="music-upload-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <BsFillMusicPlayerFill className="me-2" />
            Thêm bài hát
            <BsFillMusicPlayerFill className="ms-2" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="title"
                placeholder="Tên bài hát"
                value={songData.title}
                onChange={handleChange}
                required
                className="form-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Mô tả"
                value={songData.description}
                rows={3}
                onChange={handleChange}
                className="form-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="artist"
                placeholder="Tác giả"
                value={songData.artist}
                onChange={handleChange}
                required
                className="form-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="form-label">
                <BsMusicNote className="me-2" />
                Chọn file nhạc
              </Form.Label>
              <Form.Control
                type="file"
                name="audioFile"
                accept="audio/*"
                onChange={handleFileChange}
                required
                className="form-file-input"
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="form-label">
                <BiImage className="me-2" />
                Chọn ảnh bìa
              </Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="form-file-input"
              />
            </Form.Group>
            
            <div className="modal-actions">
              <Button
                variant="outline-light"
                onClick={handleClose}
                className="btn-cancel"
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xử lý...
                  </>
                ) : (
                  "Thêm bài hát"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* Toast notification */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1070 }}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide
          bg={toastMessage.includes("lỗi") ? "danger" : "success"}
        >
          <Toast.Header>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

// Helper component for sidebar items
function SidebarItem({ to, icon, text, onClick }) {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <Link className="sidebar-link" to={to || "#"}>
        <span className="sidebar-icon">{icon}</span>
        <span>{text}</span>
      </Link>
    </div>
  );
}

export default Sidebar;