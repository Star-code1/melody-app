import React from 'react';
import "../stylecomponent/homestyle.css";

const MusicCard = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="feature-card text-center">
      <div 
        className="feature-icon mx-auto mb-4"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maxWidth: '100%',
          height: '200px'
        }}
      >
      </div>
      
      <h3 className="text-white mb-3">{title}</h3>
      
      <p className="text-light mb-4">
        {description}
      </p>
      <button className="btn btn-outline-light btn-sm">
         Play
      </button>
    </div>
  );
};

export default MusicCard;