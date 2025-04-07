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
      console.log("Song ended, playlist state:", {
        currentIndex: currentSongIndex,
        playlistLength: playlist.length,
        currentSong: currentSong?.title,
      });

      if (isRepeat) {
        // Replay current song
        audio.currentTime = 0;
        audio.play().catch(e => console.error("Replay failed:", e));
      } else {
        const nextIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1;

        console.log("Calculating next song:", {
          nextIndex,
          nextSong: playlist[nextIndex]?.title,
        });

        if (playlist[nextIndex]) {
          setCurrentSongIndex(nextIndex);
          setCurrentSong(playlist[nextIndex]);
          setIsPlaying(true);
        } else {
          console.warn("No next song available in playlist");
        }
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
  }, [isRepeat, playlist, currentSongIndex, currentSong]);
  
  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl || currentSong.audioPath || currentSong.url;
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
  const playSong = async (song, allSongs = []) => {
    try {
      if (!song._id && song.title) {
        const response = await fetch(
          `https://melody-t9y4.onrender.com/api/songs/search?query=${encodeURIComponent(song.title)}`
        );
        const data = await response.json();
        const matchingSong = data.find(
          (item) =>
            item.title.toLowerCase() === song.title.toLowerCase() &&
            item.artist.toLowerCase() === song.artist.toLowerCase()
        );

        if (matchingSong) {
          song._id = matchingSong._id;

          if (!song.imagePath && matchingSong.imagePath) {
            song.imagePath = matchingSong.imagePath;
          }
        }
      }

      setCurrentSong(song);
      
      if (allSongs && allSongs.length > 0) {
        setPlaylist(allSongs);
        const index = allSongs.findIndex(item => 
          item.audioUrl === song.audioUrl || item.id === song.id || item._id === song._id
        );
        setCurrentSongIndex(index !== -1 ? index : 0);
      } else {
        if (song && !playlist.some(item => 
          item.audioUrl === song.audioUrl || item.id === song.id || item._id === song._id)) {
          setPlaylist(prev => [...prev, song]);
          setCurrentSongIndex(playlist.length);
        } else if (song) {
          const index = playlist.findIndex(item => 
            item.audioUrl === song.audioUrl || item.id === song.id || item._id === song._id
          );
          setCurrentSongIndex(index !== -1 ? index : 0);
        }
      }
      
      setShowPlayer(true);
      setIsPlaying(true);
      setLiked(false);
    } catch (err) {
      console.error("Error playing song:", err);
    }
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
    console.log("playNextSong called, playlist state:", {
      length: playlist.length,
      currentIndex: currentSongIndex,
      playlist: playlist,
    });

    if (playlist.length <= 1) {
      console.warn("Playlist is empty or has only one song");
      return;
    }
    
    let nextIndex;
    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentSongIndex && playlist.length > 1);
    } else {
      nextIndex = currentSongIndex === playlist.length - 1 ? 0 : currentSongIndex + 1;
    }
    
    console.log("Playing next song:", {
      nextIndex,
      nextSong: playlist[nextIndex],
    });
    setCurrentSongIndex(nextIndex);
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
    setLiked(false);
  };
  
  // Play previous song
  const playPreviousSong = () => {
    if (playlist.length <= 1) return;
    
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
    setLiked(false);
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
  
  // Debug useEffects
  useEffect(() => {
    console.log("Playlist updated:", {
      total: playlist.length,
      songs: playlist.map((song) => ({
        title: song.title,
        artist: song.artist,
        id: song.id,
      })),
    });
  }, [playlist]);

  useEffect(() => {
    console.log("Playlist/Index state changed:", {
      currentIndex: currentSongIndex,
      playlistLength: playlist.length,
      currentSong: currentSong?.title,
      nextSong: playlist[currentSongIndex + 1]?.title,
    });
  }, [playlist, currentSongIndex, currentSong]);
  
  return (
    <MusicPlayerContext.Provider 
      value={{ 
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