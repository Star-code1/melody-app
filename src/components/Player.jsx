import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  X
} from "lucide-react";
import { useMusicPlayer } from "../contexts/MusicPlayerContext"; // Thay đổi import sử dụng file MusicPlayerContext
import { notifyFavoritesChanged } from '../utils/favoritesManager';
import "bootstrap/dist/css/bootstrap.min.css";

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
    showPlayer,
    togglePlay,
    playNextSong,
    playPreviousSong,
    handleProgressChange,
    handleVolumeChange,
    toggleMute,
    toggleLike,
    toggleRepeat,
    toggleShuffle,
    closePlayer,
    formatTime,
    audioRef, // Assuming you have an audioRef in your context
  } = useMusicPlayer();

  const [isFavorite, setIsFavorite] = useState(false);

  // Check if current song is in favorites when it changes
  useEffect(() => {
    if (!currentSong) return;
    
    const checkFavoriteStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const userId = JSON.parse(token)._id;
        const response = await fetch(`https://melody-t9y4.onrender.com/api/songs/liked?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        // Logging for debugging
        console.log("Current song:", currentSong);
        console.log("Liked songs:", data);
        
        // Check if currentSong._id exists, if not try to find the song in the database
        if (!currentSong._id && currentSong.title) {
          // Try to find the song by title and artist
          const searchResponse = await fetch(`https://melody-t9y4.onrender.com/api/songs/search?query=${encodeURIComponent(currentSong.title)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const searchResults = await searchResponse.json();
          // Find a matching song
          const matchingSong = searchResults.find(song => 
            song.title.toLowerCase() === currentSong.title.toLowerCase() && 
            song.artist.toLowerCase() === currentSong.artist.toLowerCase()
          );
          
          if (matchingSong) {
            // Store the found ID to use for checks
            currentSong._id = matchingSong._id;
            console.log("Found matching song ID:", matchingSong._id);
          }
        }
        
        const likedSongIds = data.map(song => song._id);
        const isInFavorites = currentSong._id && likedSongIds.includes(currentSong._id);
        console.log("Is in favorites:", isInFavorites);
        setIsFavorite(isInFavorites);
      } catch (err) {
        console.error('Error checking favorite status:', err);
      }
    };
    
    checkFavoriteStatus();
  }, [currentSong]);

  // Handle toggling favorite status
  const handleToggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to manage favorite songs.');
      return;
    }
    
    try {
      const userId = JSON.parse(token)._id;
      
      if (isFavorite) {
        // Remove from favorites
        setIsFavorite(false);
        await fetch('https://melody-t9y4.onrender.com/api/songs/liked', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ songId: currentSong._id, userId })
        });
        
        // Notify other components about the change
        notifyFavoritesChanged();
      } else {
        // Add to favorites
        setIsFavorite(true);
        await fetch('https://melody-t9y4.onrender.com/api/songs/liked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ songId: currentSong._id, userId })
        });
        
        // Notify other components about the change
        notifyFavoritesChanged();
      }
    } catch (err) {
      console.error('Error toggling favorite status:', err);
      // Revert UI state if API call fails
      setIsFavorite(!isFavorite);
      alert('Failed to update favorites. Please try again.');
    }
  };

  // Add onEnded event listener to the audio element
  React.useEffect(() => {
    if (audioRef?.current) {
      const audioElement = audioRef.current;
  
      // Event listener for when the audio is playing
      const handleSongEnd = () => {
        if (isRepeat) {
          audioElement.currentTime = 0; // Restart the current song
          audioElement.play();
        } else {
          playNextSong(); // Move to the next song
        }
      };
  
      const handleTimeUpdate = () => {
        if (audioElement.currentTime === audioElement.duration) {
          playNextSong(); // Automatically move to the next song when current time is equal to total duration
        }
      };
  
      audioElement.addEventListener("ended", handleSongEnd);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
  
      return () => {
        audioElement.removeEventListener("ended", handleSongEnd);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioRef, isRepeat, playNextSong]);

  // Custom styles for Bootstrap
  const customStyles = {
    playerContainer: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#212529",
      borderTop: "1px solid #343a40",
      padding: "15px",
      zIndex: 1000,
      transition: "transform 0.3s ease-in-out",
      transform: showPlayer && currentSong ? "translateY(0)" : "translateY(100%)"
    },
    coverImage: {
      width: "56px",
      height: "56px",
      borderRadius: "4px",
      marginRight: "12px",
      objectFit: "cover",
      backgroundColor: "#343a40",
    },
    songTitle: {
      color: "white",
      fontSize: "14px",
      fontWeight: "500",
      margin: 0,
    },
    songArtist: {
      color: "#adb5bd",
      fontSize: "12px",
      margin: 0,
    },
    playButton: {
      backgroundColor: "white",
      borderRadius: "50%",
      padding: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
      transition: "transform 0.2s",
    },
    controlButton: {
      background: "none",
      border: "none",
      color: "#adb5bd",
      padding: "4px",
      margin: "0 8px",
    },
    activeButton: {
      color: "#198754", // Bootstrap green
    },
    likedButton: {
      fill: "#dc3545", // Bootstrap red
      color: "#dc3545",
    },
    timeText: {
      color: "#adb5bd",
      fontSize: "12px",
      width: "40px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      color: "#adb5bd",
      padding: "4px",
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

  // Return nothing if there's no current song
  if (!currentSong) return null;

  return (
    <div style={customStyles.playerContainer}>
      <div className="container-fluid">
        <button 
          style={customStyles.closeButton}
          onClick={closePlayer}
        >
          <X size={18} />
        </button>
        <div className="row align-items-center">
          {/* Song information */}
          <div className="col-md-3 d-flex align-items-center">
            <img
              src={currentSong.imagePath || currentSong.coverUrl || "/placeholder-cover.jpg"}
              alt={`${currentSong.title} cover`}
              style={customStyles.coverImage}
            />
            <div>
              <p style={customStyles.songTitle}>{currentSong.title}</p>
              <p style={customStyles.songArtist}>{currentSong.artist}</p>
            </div>
            <button
              className="ms-3"
              onClick={handleToggleFavorite}
              style={{
                ...customStyles.controlButton,
                ...(isFavorite ? customStyles.likedButton : {}),
              }}
            >
              <Heart size={20} fill={isFavorite ? "#dc3545" : "none"} color={isFavorite ? "#dc3545" : "#adb5bd"} />
            </button>
          </div>

          {/* Player controls */}
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center mb-2">
              {/* Shuffle button */}
              <button
                style={{
                  ...customStyles.controlButton,
                  ...(isShuffle ? customStyles.activeButton : {}),
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
                {isPlaying ? (
                  <Pause size={20} color="black" />
                ) : (
                  <Play size={20} color="black" />
                )}
              </button>

              {/* Next song button */}
              <button style={customStyles.controlButton} onClick={playNextSong}>
                <SkipForward size={20} />
              </button>

              {/* Repeat button */}
              <button
                style={{
                  ...customStyles.controlButton,
                  ...(isRepeat ? customStyles.activeButton : {}),
                }}
                onClick={toggleRepeat}
              >
                <Repeat size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="d-flex align-items-center">
              <span
                style={{ ...customStyles.timeText, textAlign: "right" }}
                className="me-2"
              >
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
              <span
                style={{ ...customStyles.timeText, textAlign: "left" }}
                className="ms-2"
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume controls */}
          <div className="col-md-3 d-flex justify-content-end align-items-center">
            <button
              onClick={toggleMute}
              style={customStyles.controlButton}
              className="me-2"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={20} />
              ) : volume < 50 ? (
                <Volume1 size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            <div style={{ width: "100px" }}>
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