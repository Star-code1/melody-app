import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

// Create context
const MusicPlayerContext = createContext();

// Provider component
export const MusicPlayerProvider = ({ children }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const audioRef = useRef(null);
  
  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    // Set up event listeners
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      if (isRepeat) {
        // Replay current song
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Replay failed:", e));
      } else {
        // Play next song
        playNextSong();
      }
    };
    
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
  
  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong]);
  
  // Handle play/pause state changes
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
  
  // Handle volume and mute changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  // Play a specific song
  const playSong = (song, allSongs = []) => {
    setCurrentSong(song);
    
    // Update playlist
    if (allSongs && allSongs.length > 0) {
      setPlaylist(allSongs);
      // Find index of the song in the new playlist
      const index = allSongs.findIndex(item => 
        item.audioUrl === song.audioUrl || item.id === song.id
      );
      setCurrentSongIndex(index !== -1 ? index : 0);
    } else {
      // Add the current song to playlist if not already included
      if (song && !playlist.some(item => item.audioUrl === song.audioUrl || item.id === song.id)) {
        setPlaylist(prev => [...prev, song]);
        setCurrentSongIndex(playlist.length);
      } else if (song) {
        // Find and set the current index if song already exists in playlist
        const index = playlist.findIndex(item => 
          item.audioUrl === song.audioUrl || item.id === song.id
        );
        setCurrentSongIndex(index !== -1 ? index : 0);
      }
    }
    
    setShowPlayer(true);
    setIsPlaying(true);
    setLiked(false); // Reset liked state for new song
  };
  
  // Close the player
  const closePlayer = () => {
    setIsPlaying(false);
    setShowPlayer(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Play next song
  const playNextSong = () => {
    if (playlist.length <= 1) return;
    
    let nextIndex;
    if (isShuffle) {
      // Play random song
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentSongIndex && playlist.length > 1);
    } else {
      // Play next song in sequence
      nextIndex = (currentSongIndex + 1) % playlist.length;
    }
    
    setCurrentSongIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
    setLiked(false); // Reset liked state for new song
  };
  
  // Play previous song
  const playPreviousSong = () => {
    if (playlist.length <= 1) return;
    
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
    setLiked(false); // Reset liked state for new song
  };
  
  // Handle progress change
  const handleProgressChange = (newTime) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Toggle like
  const toggleLike = () => {
    setLiked(!liked);
  };
  
  // Toggle repeat
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };
  
  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };
  
  // Format time helper
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <MusicPlayerContext.Provider 
      value={{ 
        // Player state
        showPlayer,
        isPlaying,
        currentSong,
        playlist,
        currentSongIndex,
        duration,
        currentTime,
        volume,
        isMuted,
        isRepeat, 
        isShuffle,
        liked,
        
        // Player actions
        playSong,
        closePlayer,
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
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook for using this context
export const useMusicPlayer = () => useContext(MusicPlayerContext);

export default MusicPlayerContext;