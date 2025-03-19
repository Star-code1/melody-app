import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Player = () => {
  // State cho trình phát nhạc
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  
  // Tạo reference cho audio element
  const audioRef = useRef(null);
  
  // Danh sách bài hát mẫu
  const playlist = [
    {
      id: 1,
      title: "Tên bài hát",
      artist: "Ca sĩ",
      album: "Album",
      coverUrl: "", // Ảnh placeholder
      audioUrl: "src/assets/bài hát" // Nhạc mẫu
    },
  ];
  
  const currentSong = playlist[currentSongIndex];
  
  // Khởi tạo và cập nhật audio
  useEffect(() => {
    // Cập nhật audio source khi thay đổi bài hát
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      
      // Tự động phát nếu đang trong trạng thái phát
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, currentSong.audioUrl]);
  
  // Cập nhật trạng thái phát/tạm dừng
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Play prevented:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Xử lý âm lượng và tắt tiếng
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  // Xử lý phát/tạm dừng
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Xử lý định dạng thời gian
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Xử lý thanh tiến trình
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  // Xử lý âm lượng
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  // Xử lý tắt tiếng
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Xử lý yêu thích
  const toggleLike = () => {
    setLiked(!liked);
  };
  
  // Xử lý chuyển bài kế tiếp
  const playNextSong = () => {
    if (isShuffle) {
      // Phát ngẫu nhiên
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * playlist.length);
      } while (randomIndex === currentSongIndex && playlist.length > 1);
      setCurrentSongIndex(randomIndex);
    } else {
      // Phát tuần tự
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }
  };
  
  // Xử lý chuyển bài trước đó
  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
  };
  
  // Xử lý lặp lại
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };
  
  // Xử lý phát ngẫu nhiên
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };
  
  // Xử lý sự kiện audio
  useEffect(() => {
    const audio = audioRef.current;
    
    // Cập nhật duration khi metadata được load
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    // Cập nhật currentTime khi phát
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    // Xử lý khi bài hát kết thúc
    const handleEnded = () => {
      if (isRepeat) {
        // Phát lại bài hiện tại
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Replay failed:", e));
      } else {
        // Chuyển bài kế tiếp
        playNextSong();
      }
    };
    
    // Thêm event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    // Cleanup event listeners
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat]);

  // Custom styles for Bootstrap
  const customStyles = {
    playerContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#212529',
      borderTop: '1px solid #343a40',
      padding: '15px'
    },
    coverImage: {
      width: '56px',
      height: '56px',
      borderRadius: '4px',
      marginRight: '12px'
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
  
  return (
    <div style={customStyles.playerContainer}>
      {/* Audio element ẩn */}
      <audio ref={audioRef} preload="metadata" />
      
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Thông tin bài hát */}
          <div className="col-md-3 d-flex align-items-center">
            <img 
              src={currentSong.coverUrl} 
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
          
          {/* Điều khiển phát nhạc */}
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center mb-2">
              {/* Nút shuffle bài hát */}
              <button 
                style={{
                  ...customStyles.controlButton,
                  ...(isShuffle ? customStyles.activeButton : {})
                }}
                onClick={toggleShuffle}
              >
                <Shuffle size={16} />
              </button>

              {/* Nút quay lại bài trước */}
              <button 
                style={customStyles.controlButton}
                onClick={playPreviousSong}
              >
                <SkipBack size={20} />
              </button>

              {/* Nút play/pause */}
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

              {/* Nút chuyển bài tiếp theo */}
              <button 
                style={customStyles.controlButton}
                onClick={playNextSong}
              >
                <SkipForward size={20} />
              </button>

              {/* Nút lặp lại bài hát */}
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
            
            {/* Thanh tiến trình */}
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
                  onChange={handleProgressChange}
                />
              </div>
              <span style={{...customStyles.timeText, textAlign: 'left'}} className="ms-2">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          
          {/* Điều khiển âm lượng */}
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
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;