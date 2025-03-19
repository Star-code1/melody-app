import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

const MusicCard = ({ imageUrl, title, description, buttonText, truncateTitle = false, truncateDescription = false }) => {
  return (
    <Card className="music-card h-100 shadow-sm">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className={truncateTitle ? "music-card-title" : ""}>
          {title}
        </Card.Title>
        <Card.Text className={truncateDescription ? "music-card-artist text-muted" : "text-muted"}>
          {description}
        </Card.Text>
        <Button 
          variant="dark" 
          className="mt-auto rounded-pill d-flex align-items-center justify-content-center"
          size="sm"
        >
          <FaPlay className="me-1" size={10} /> {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MusicCard;