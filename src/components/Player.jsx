import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';

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
      title: "đuawd",
      artist: "dưad",
      album: "đawdf",
      coverUrl: "", // Ảnh placeholder
      audioUrl: "" // Nhạc mẫu
    }
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
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      {/* Audio element ẩn */}
      <audio ref={audioRef} preload="metadata" />
      
      <div className="flex items-center justify-between">
        {/* Thông tin bài hát */}
        <div className="flex items-center w-1/4">
          <img 
            src={currentSong.coverUrl} 
            alt={`${currentSong.title} cover`} 
            className="w-14 h-14 rounded mr-3"
          />
          <div>
            <div className="text-white text-sm font-medium">{currentSong.title}</div>
            <div className="text-gray-400 text-xs">{currentSong.artist}</div>
          </div>
          <button 
            className="ml-4" 
            onClick={toggleLike}
          >
            <Heart 
              className={`h-5 w-5 ${liked ? 'text-black-500 fill-red-500' : 'text-white-400'}`} 
            />
          </button>
        </div>
        
        {/* Điều khiển phát nhạc */}
        <div className="flex flex-col items-center justify-center w-2/4">
          <div className="flex items-center justify-center mb-2">
            {/* Nút shuffle bài hát */}
            <button 
              className={`mx-2 ${isShuffle ? 'text-green-500' : 'text-white-400'} hover:text-white`}
              onClick={toggleShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </button>

            {/* Nút quay lại bài trước */}
            <button 
              className="mx-2 text-white-400 hover:text-white"
              onClick={playPreviousSong}
            >
              <SkipBack className="h-5 w-5" />
            </button>

            {/* Nút play/pause */}
            <button 
              className="mx-2 bg-white rounded-full p-2 hover:scale-105 transition"
              onClick={togglePlay}
            >
              {isPlaying ? 
                <Pause className="h-5 w-5 text-black fill-black" /> : 
                <Play className="h-5 w-5 text-black fill-black" />
              }
            </button>

            {/* Nút chuyển bài tiếp theo */}
            <button 
              className="mx-2 text-white-400 hover:text-white"
              onClick={playNextSong}
            >
              <SkipForward className="h-5 w-5" />
            </button>

            {/* Nút lặp lại bài hát */}
            <button 
              className={`mx-2 ${isRepeat ? 'text-green-500' : 'text-white-400'} hover:text-white`}
              onClick={toggleRepeat}
            >
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          
          {/* Thanh tiến trình */}
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10 text-right mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-grow h-1 rounded-lg appearance-none bg-gray-600"
            />
            <span className="text-xs text-gray-400 w-10 text-left ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Điều khiển âm lượng */}
        <div className="flex items-center justify-end w-1/4">
          <button onClick={toggleMute} className="mr-2 text-gray-400 hover:text-white">
            {isMuted || volume === 0 ? 
              <VolumeX className="h-5 w-5" /> : 
              volume < 50 ? 
                <Volume1 className="h-5 w-5" /> : 
                <Volume2 className="h-5 w-5" />
            }
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 rounded-lg appearance-none bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;