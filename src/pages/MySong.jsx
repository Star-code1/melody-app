import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import "./MySong.scss"; // You'll need to create this SCSS file

function MySong() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("token"));
        
        // Redirect to login if not authenticated
        if (!user) {
            navigate("/login");
            return;
        }
        
        // Fetch user's songs
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/songs/user/${user._id}`);
                setSongs(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching songs:", err);
                setError("Không thể tải bài hát. Vui lòng thử lại sau.");
                setLoading(false);
            }
        };
        
        fetchSongs();
    }, [navigate]);
    
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <Spinner animation="border" variant="success" />
            </Container>
        );
    }
    
    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }
    
    return (
        <Container className="my-4">
            <h2 className="mb-4 text-white">Nhạc của tôi</h2>
            
            {songs.length === 0 ? (
                <div className="text-center text-white p-5">
                    <h4>Bạn chưa thêm bài hát nào</h4>
                    <Button 
                        variant="success" 
                        className="mt-3"
                        onClick={() => navigate("/")}
                    >
                        Thêm bài hát mới
                    </Button>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {songs.map((song) => (
                        <Col key={song._id}>
                            <Card className="h-100 song-card bg-dark text-white">
                                <div className="position-relative">
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://localhost:5000/${song.imagePath}`} 
                                        alt={song.title}
                                        className="song-img"
                                    />
                                    <div className="play-overlay">
                                        <Button variant="success" className="play-btn">
                                            <BsFillPlayFill size={24} />
                                        </Button>
                                    </div>
                                </div>
                                <Card.Body>
                                    <Card.Title>{song.title}</Card.Title>
                                    <Card.Text className="text-secondary">
                                        {song.artist}
                                    </Card.Text>
                                    {song.description && (
                                        <Card.Text className="song-description">
                                            {song.description}
                                        </Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default MySong;