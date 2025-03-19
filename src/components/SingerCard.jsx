import React from 'react';
import '../stylecomponent/SingerCard.css';

const SingerCard = ({ imageUrl ,title,label,description}) => {
    return (
        <div className="singer-card">
            <img className="singer-image" src={imageUrl} alt={name} />
            <div className="singer-info">
                <h3 className="singer-name">{title}</h3>
                <p className="singer-label">{description}</p>
            </div>
            <div className="singer-actions">
                <button className="play-button"></button>
            </div>
        </div>
    );
};

export default SingerCard;