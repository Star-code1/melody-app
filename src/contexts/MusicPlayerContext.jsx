import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";

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
  const [playbackError, setPlaybackError] = useState(null);

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
        audio.play().catch((e) => console.error("Replay failed:", e));
      } else {
        // Play next song
        playNextSong();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Cleanup event listeners
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, currentSongIndex, playlist]);

  // Update audio source when current song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      // Handle different possible audio source property names
      const audioSource =
        currentSong.audioUrl ||
        currentSong.audioPath ||
        currentSong.url ||
        currentSong.src;

      if (!audioSource) {
        console.error(
          "No valid audio source found in song object:",
          currentSong
        );
        setIsPlaying(false);
        return;
      }

      console.log("Setting audio source:", audioSource);

      // Check if the URL is relative and needs a base URL
      const fullAudioUrl = audioSource.startsWith("http")
        ? audioSource
        : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${
            audioSource.startsWith("/") ? "" : "/"
          }${audioSource}`;

      audioRef.current.src = fullAudioUrl;
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Autoplay prevented:", error);
          console.error("Failed audio source:", fullAudioUrl);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
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
      // Reset error state when attempting to play a new song
      setPlaybackError(null);

      if (!song) {
        console.error("Attempted to play undefined song");
        setPlaybackError({
          type: "invalid_song",
          message: "Cannot play undefined song",
        });
        return;
      }

      // Handle case where song might be missing id or using different property name
      const songId = song._id || song.id; // Handle both _id and id formats

      // Create a normalized version of the song with consistent properties
      const normalizedSong = { ...song };

      // Ensure song has required properties
      const audioSource =
        song.audioUrl || song.audioPath || song.url || song.src;

      if (!audioSource) {
        console.error("No valid audio source found in song object:", song);
        setPlaybackError({
          type: "missing_audio",
          message: `Cannot play "${song.title}" - No audio source found`,
          song: song,
        });
        return;
      }

      // Make sure audioUrl is set to a valid source
      normalizedSong.audioUrl = audioSource;

      // Log the song being played for debugging
      console.log(
        "Playing song with audio source:",
        audioSource,
        normalizedSong
      );

      setCurrentSong(normalizedSong);

      // Update playlist
      if (allSongs && allSongs.length > 0) {
        // Find index of the song in the new playlist
        const index = allSongs.findIndex(
          (item) =>
            (item._id && item._id === songId) ||
            (item.id && item.id === songId) ||
            item.audioUrl === normalizedSong.audioUrl
        );
        setPlaylist(allSongs);
        setCurrentSongIndex(index !== -1 ? index : 0);
      } else {
        // Add the current song to playlist if not already included
        const songExists = playlist.some(
          (item) =>
            (item._id && item._id === songId) ||
            (item.id && item.id === songId) ||
            item.audioUrl === normalizedSong.audioUrl
        );

        if (normalizedSong && !songExists) {
          setPlaylist((prev) => [...prev, normalizedSong]);
          setCurrentSongIndex(playlist.length);
        } else if (normalizedSong) {
          // Find and set the current index if song already exists in playlist
          const index = playlist.findIndex(
            (item) =>
              (item._id && item._id === songId) ||
              (item.id && item.id === songId) ||
              item.audioUrl === normalizedSong.audioUrl
          );
          setCurrentSongIndex(index !== -1 ? index : 0);
        }
      }

      setShowPlayer(true);
      setIsPlaying(true);
      setLiked(false); // Reset liked state for new song

      console.log("Playing song:", {
        title: normalizedSong.title,
        artist: normalizedSong.artist,
        id: songId,
        audioUrl: normalizedSong.audioUrl,
        index: currentSongIndex,
      });
    } catch (err) {
      console.error("Error playing song:", err);
      setPlaybackError({
        type: "playback_error",
        message: `Error playing "${song?.title || "Unknown song"}": ${
          err.message
        }`,
        error: err,
      });
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
    });

    if (playlist.length <= 1) {
      console.warn("Playlist is empty or has only one song");
      return;
    }

    let nextIndex;
    if (isShuffle) {
      // Play random song
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (nextIndex === currentSongIndex && playlist.length > 1);
    } else {
      // Play next song in sequence with proper wrap-around
      nextIndex = (currentSongIndex + 1) % playlist.length;
    }

    console.log("Playing next song:", {
      nextIndex,
      nextSong: playlist[nextIndex]?.title,
    });

    if (playlist[nextIndex]) {
      setCurrentSongIndex(nextIndex);
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
      setLiked(false); // Reset liked state for new song
    } else {
      console.warn("Next song not found in playlist");
    }
  };

  // Play previous song
  const playPreviousSong = () => {
    if (playlist.length <= 1) return;

    const prevIndex =
      currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
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

  // Clear current playback error
  const clearPlaybackError = () => {
    setPlaybackError(null);
  };

  // Format time helper
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Add helper function to check audio availability
  const checkAudioAvailability = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.error("Error checking audio availability:", error);
      return false;
    }
  };

  // Add additional debug info for audio element
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleError = (e) => {
        console.error("Audio error:", e);
        console.error("Audio element state:", {
          src: audio.src,
          readyState: audio.readyState,
          networkState: audio.networkState,
          error: audio.error ? audio.error.code : null,
        });
      };

      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("error", handleError);
      };
    }
  }, []);

  // Add debug useEffect hooks
  useEffect(() => {
    console.log("Playlist updated:", {
      total: playlist.length,
      songs: playlist.map((song) => ({
        title: song.title,
        artist: song.artist,
        id: song._id || song.id,
      })),
    });
  }, [playlist]);

  useEffect(() => {
    console.log("Current song/index changed:", {
      currentIndex: currentSongIndex,
      playlistLength: playlist.length,
      currentSong: currentSong?.title,
      nextSong: playlist[(currentSongIndex + 1) % playlist.length]?.title,
    });
  }, [currentSongIndex, currentSong, playlist]);

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
        playbackError,

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
        formatTime,
        clearPlaybackError,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook for using this context
export const useMusicPlayer = () => useContext(MusicPlayerContext);

export default MusicPlayerContext;
