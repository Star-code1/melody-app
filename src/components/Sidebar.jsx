import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaSearch, FaMusic, FaList } from "react-icons/fa";
import { BsFillMusicPlayerFill, BsMusicNote } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import "./Sidebar.scss";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const [songData, setSongData] = useState({
    title: "",
    description: "",
    artist: "",
    audioFile: null,
    imageFile: null,
  });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("token"));
      if (storedUser && storedUser._id) {
        setIsLoggedIn(true);
        setUser(storedUser);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {   
      console.error("Lỗi khi đọc localStorage:", error);
      localStorage.removeItem("token");
    }
  }, []);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    if (!isLoggedIn) {
      setToastMessage("Vui lòng đăng nhập để thêm bài hát!");
      setShowToast(true);
      return;
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.length) {
      setSongData({ ...songData, [name]: files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    Object.entries(songData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("userId", user._id);
    
    try {
      await axios.post("http://localhost:5000/api/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setToastMessage("Bài hát đã được thêm thành công!");
      setShowToast(true);
      handleClose();
      setSongData({ title: "", description: "", artist: "", audioFile: null, imageFile: null });
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
        <SidebarItem to="/Search" icon={<FaSearch />} text="Tìm kiếm" />
      </div>
      
      <div className="sidebar-section">
        <SidebarItem icon={<FaMusic />} text="Thêm bài hát" onClick={handleShow} />
        <SidebarItem to="/MySong" icon={<FaList />} text="Nhạc của tôi" />
      </div>

      <Modal show={show} onHide={handleClose} centered className="music-upload-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <BsFillMusicPlayerFill className="me-2" /> Thêm bài hát <BsFillMusicPlayerFill className="ms-2" />
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
                <BsMusicNote className="me-2" /> Chọn file nhạc
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
                <BiImage className="me-2" /> Chọn ảnh bìa
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
      
      <ToastContainer position="top-end" className="p-3">
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
