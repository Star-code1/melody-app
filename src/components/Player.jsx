import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Player = () => {
  // Get everything from context
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    volume,
    liked,
    isMuted,
    isRepeat,
    isShuffle,
    togglePlay,
    playNextSong,
    playPreviousSong,
    handleProgressChange,
    handleVolumeChange,
    toggleMute,
    toggleLike,
    toggleRepeat,
    toggleShuffle,
    formatTime
  } = useMusicPlayer();
  
  // Custom styles for Bootstrap
  const customStyles = {
    playerContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#212529',
      borderTop: '1px solid #343a40',
      padding: '15px',
      zIndex: 1000
    },
    coverImage: {
      width: '56px',
      height: '56px',
      borderRadius: '4px',
      marginRight: '12px',
      objectFit: 'cover',
      backgroundColor: '#343a40'
    },
    songTitle: {
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      margin: 0
    },
    songArtist: {
      color: '#adb5bd',
      fontSize: '12px',
      margin: 0
    },
    playButton: {
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      transition: 'transform 0.2s'
    },
    controlButton: {
      background: 'none',
      border: 'none',
      color: '#adb5bd',
      padding: '4px',
      margin: '0 8px'
    },
    activeButton: {
      color: '#198754' // Bootstrap green
    },
    likedButton: {
      fill: '#dc3545', // Bootstrap red
      color: '#dc3545'
    },
    timeText: {
      color: '#adb5bd',
      fontSize: '12px',
      width: '40px'
    }
  };
  
  // Handle progress change internally before updating context
  const onProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    handleProgressChange(newTime);
  };
  
  // Handle volume change internally before updating context
  const onVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    handleVolumeChange(newVolume);
  };
  
  if (!currentSong) return null;
  
  return (
    <div style={customStyles.playerContainer}>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Song information */}
          <div className="col-md-3 d-flex align-items-center">
            <img 
              src={currentSong.coverUrl || "/placeholder-cover.jpg"} 
              alt={`${currentSong.title} cover`} 
              style={customStyles.coverImage}
            />
            <div>
              <p style={customStyles.songTitle}>{currentSong.title}</p>
              <p style={customStyles.songArtist}>{currentSong.artist}</p>
            </div>
            <button 
              className="ms-3" 
              onClick={toggleLike}
              style={{...customStyles.controlButton, ...(liked ? customStyles.likedButton : {})}}
            >
              <Heart size={20} />
            </button>
          </div>
          
          {/* Player controls */}
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center mb-2">
              {/* Shuffle button */}
              <button 
                style={{
                  ...customStyles.controlButton,
                  ...(isShuffle ? customStyles.activeButton : {})
                }}
                onClick={toggleShuffle}
              >
                <Shuffle size={16} />
              </button>

              {/* Previous song button */}
              <button 
                style={customStyles.controlButton}
                onClick={playPreviousSong}
              >
                <SkipBack size={20} />
              </button>

              {/* Play/pause button */}
              <button 
                style={customStyles.playButton}
                onClick={togglePlay}
                className="mx-2"
              >
                {isPlaying ? 
                  <Pause size={20} color="black" /> : 
                  <Play size={20} color="black" />
                }
              </button>

              {/* Next song button */}
              <button 
                style={customStyles.controlButton}
                onClick={playNextSong}
              >
                <SkipForward size={20} />
              </button>

              {/* Repeat button */}
              <button 
                style={{
                  ...customStyles.controlButton,
                  ...(isRepeat ? customStyles.activeButton : {})
                }}
                onClick={toggleRepeat}
              >
                <Repeat size={16} />
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="d-flex align-items-center">
              <span style={{...customStyles.timeText, textAlign: 'right'}} className="me-2">
                {formatTime(currentTime)}
              </span>
              <div className="flex-grow-1">
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={onProgressChange}
                />
              </div>
              <span style={{...customStyles.timeText, textAlign: 'left'}} className="ms-2">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Volume controls */}
          <div className="col-md-3 d-flex justify-content-end align-items-center">
            <button onClick={toggleMute} style={customStyles.controlButton} className="me-2">
              {isMuted || volume === 0 ? 
                <VolumeX size={20} /> : 
                volume < 50 ? 
                  <Volume1 size={20} /> : 
                  <Volume2 size={20} />
              }
            </button>
            <div style={{ width: '100px' }}>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={onVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;