import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";
import { useMusicPlayer } from "../contexts/MusicPlayerContext";

const MusicCard = ({
  imageUrl,
  title,
  description,
  buttonText,
  audioUrl,
  truncateTitle = false,
  truncateDescription = false,
  id
}) => {
  const { playSong } = useMusicPlayer();
  
  const handlePlayClick = () => {
    const song = {
      id: id || Date.now().toString(),
      title,
      artist: description,
      coverUrl: imageUrl,
      audioUrl: audioUrl,
    };
    
    // Store current song in localStorage for persistence
    localStorage.setItem("currentSong", JSON.stringify(song));
    
    // Play the song using context
    playSong(song);
  };
  
  return (
    <Card className="music-card h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title 
          className={truncateTitle ? "music-card-title" : ""}
          style={truncateTitle ? { 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          } : {}}
        >
          {title}
        </Card.Title>
        <Card.Text
          className={truncateDescription ? "music-card-artist text-muted" : "text-muted"}
          style={truncateDescription ? { 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          } : {}}
        >
          {description}
        </Card.Text>
        <Button
          variant="dark"
          className="mt-auto rounded-pill d-flex align-items-center justify-content-center"
          size="sm"
          onClick={handlePlayClick}
        >
          <FaPlay className="me-1" size={10} /> {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MusicCard;