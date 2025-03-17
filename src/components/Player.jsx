import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Example duration in seconds
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Example song data
  const song = {
    title: "Tên bài hát",
    artist: "Tên nghệ sĩ",
    album: "Tên album",
    coverUrl: "", // đường dẫn ảnh bìa
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (e) => {
    setCurrentTime(e.target.value);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (e.target.value > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Song Info */}
        <div className="flex items-center w-1/4">
          <img 
            src={song.coverUrl} 
            alt={`${song.title} cover`} 
            className="w-14 h-14 rounded mr-3"
          />
          <div>
            <div className="text-white text-sm font-medium">{song.title}</div>
            <div className="text-gray-400 text-xs">{song.artist}</div>
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
        
        {/* Player Controls */}
        <div className="flex flex-col items-center justify-center w-2/4">
          <div className="flex items-center justify-center mb-2">

            {/* Nút shuffle bài hát */}
            <button className="mx-2 text-white-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </button>

            {/* Nút quay lại bài trước */}
            <button className="mx-2 text-white-400 hover:text-white">
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
            <button className="mx-2 text-white-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </button>

            {/* Nút lặp lại bài hát */}
            <button className="mx-2 text-white-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full flex items-center">
            <span className="text-xs text-gray-400 w-10 text-right mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-grow h-1 rounded-lg appearance-none bg-gray-600"
            />
            <span className="text-xs text-gray-400 w-10 text-left ml-2">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* Volume Control */}
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