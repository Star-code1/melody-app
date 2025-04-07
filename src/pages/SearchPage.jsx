import React, { useState, useEffect } from 'react';
import { Heart, Search, Disc, Play, Clock, Ellipsis } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useMusicPlayer } from "../contexts/MusicPlayerContext";
import axios from 'axios';
import { notifyFavoritesChanged } from '../utils/favoritesManager';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [musicItems, setMusicItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  
  const { playSong, currentSong } = useMusicPlayer();

  useEffect(() => {
    if (currentSong && currentSong._id) {
      setCurrentPlayingId(currentSong._id);
    } else {
      setCurrentPlayingId(null);
    }
  }, [currentSong]);

  const handlePlaySong = (song) => {
    playSong(song, musicItems);
    setCurrentPlayingId(song._id);
  }
    
  const handlePlayClick = (item) => {
    const song = {
      id: item.id || Date.now().toString(),  // Dùng item.id thay vì id
      title: item.title,
      artist: item.artist,
      coverUrl: item.imagePath,
      audioUrl: item.audioPath,
    };
  
    // Store current song in localStorage for persistence
    localStorage.setItem("currentSong", JSON.stringify(song));
  
    // Play the song using context
    playSong(song);
  };
  
  useEffect(() => {
    const fetchLikedSongs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      let userId;
      try {
        userId = JSON.parse(token)._id;
      } catch (err) {
        console.error('Error parsing token:', err);
        return;
      }
  
      try {
        const response = await fetch(`https://melody-t9y4.onrender.com/api/songs/liked?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log("Fetched liked songs:", data);
        const likedSongIds = data.map(song => song._id);
        console.log("Liked song IDs:", likedSongIds);
        setLikedSongs(likedSongIds);
        setFavorites(likedSongIds);
      } catch (err) {
        console.error('Error fetching liked songs:', err);
      }
    };
  
    fetchLikedSongs();
  }, [refreshTrigger]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchSongs(searchTerm);
      } else {
        const fetchAllSongs = async () => {
          try {
            const response = await axios.get('https://melody-t9y4.onrender.com/api/songs');
            setMusicItems(response.data);
          } catch (err) {
            console.error(err);
          }
        };
        fetchAllSongs();
      }
    }, 500);
  
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const toggleFavorite = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to manage favorite songs.');
      return;
    }
    
    let userId;
    try {
      userId = JSON.parse(token)._id;
    } catch (err) {
      console.error('Error parsing token:', err);
      return;
    }
    
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      try {
        const response = await fetch('https://melody-t9y4.onrender.com/api/songs/liked', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ songId: id, userId })
        });
        
        if (!response.ok) {
          throw new Error('Failed to remove from favorites');
        }
        
        const data = await response.json();
        console.log(data.message);
        
        setLikedSongs(likedSongs.filter(songId => songId !== id));
        notifyFavoritesChanged();
      } catch (err) {
        console.error('Error removing liked song:', err);
        setFavorites([...favorites]);
      }
    } else {
      setFavorites([...favorites, id]);
      try {
        const response = await fetch('https://melody-t9y4.onrender.com/api/songs/liked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ songId: id, userId })
        });
        
        if (!response.ok) {
          throw new Error('Failed to add to favorites');
        }
        
        const data = await response.json();
        console.log(data.message);
        
        setLikedSongs([...likedSongs, id]);
        notifyFavoritesChanged();
      } catch (err) {
        console.error('Error adding liked song:', err);
        setFavorites(favorites.filter(favId => favId !== id));
      }
    }
  };

  const searchSongs = async (query) => {
    setIsSearching(true);
    try {
      const response = await axios.get(`https://melody-t9y4.onrender.com/api/songs/search?query=${query}`);
      setMusicItems(response.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const customStyles = {
    gradientText: {
      background: 'linear-gradient(135deg, #dc3545, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 4px rgba(220, 53, 69, 0.2)'
    },
    searchInput: {
      backgroundColor: '#343a40',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: '#ffffff'
    },
    searchInputHover: {
      backgroundColor: '#3f474e',
      border: '1px solid rgba(220, 53, 69, 0.3)',
      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.15)'
    },
    searchInputFocus: {
      backgroundColor: '#3f474e',
      border: '1px solid rgba(220, 53, 69, 0.5)',
      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.2)'
    },
    searchResult: {
      transition: 'all 0.3s ease',
      borderLeft: '4px solid transparent',
      boxShadow: 'none'
    },
    searchResultHover: {
      background: 'linear-gradient(to right, rgba(33, 37, 41, 0.8), rgba(220, 53, 69, 0.1))',
      borderLeft: '4px solid #dc3545',
      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.1)'
    },
    coverArt: {
      transition: 'all 0.3s ease'
    },
    coverArtHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.2)'
    }
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white">
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <Disc size={28} className="text-danger me-2" />
          <h1 className="display-6 fw-bold mb-0" style={customStyles.gradientText}>
            Search
          </h1>
        </div>
        
        <div className="mb-5 position-relative">
          <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
            <Search size={20} className="text-secondary" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ..."
            className="form-control form-control-lg text-white border-0 ps-5 rounded-pill"
            style={customStyles.searchInput}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = customStyles.searchInputHover.backgroundColor;
              e.currentTarget.style.border = customStyles.searchInputHover.border;
              e.currentTarget.style.boxShadow = customStyles.searchInputHover.boxShadow;
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.matches(':focus')) {
                e.currentTarget.style.backgroundColor = customStyles.searchInput.backgroundColor;
                e.currentTarget.style.border = customStyles.searchInput.border;
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = customStyles.searchInputFocus.backgroundColor;
              e.currentTarget.style.border = customStyles.searchInputFocus.border;
              e.currentTarget.style.boxShadow = customStyles.searchInputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = customStyles.searchInput.backgroundColor;
              e.currentTarget.style.border = customStyles.searchInput.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-grow-1 overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <h2 className="fs-2 fw-bold mb-4">Kết quả tìm kiếm</h2>
          {isSearching && <div className="spinner-border text-danger" role="status"></div>}
          
          {musicItems.length === 0 && !isSearching ? (
            <div className="text-center my-5 py-5">
              <p className="text-secondary fs-5">Không tìm thấy bài hát nào phù hợp</p>
            </div>
          ) : (
          <table className="table table-dark table-borderless" style={{marginBottom: '10rem'}}>
            <thead>
              <tr className="border-bottom border-secondary border-opacity-25 text-white-50">
                <th className="ps-3 fw-bold fs-5 text-center">#</th>
                <th className="fw-bold fs-5 text-start">Tiêu đề</th>
                <th className="text-end pe-2 w-auto"></th>
              </tr>
            </thead>
            <tbody>
              {musicItems.map((item, index) => {
                const isFavorite = favorites.includes(item._id);
                const isPlaying = currentPlayingId === item._id;
                
                return (
                  <tr
onClick={() => handlePlayClick(item)}  // Truyền item vào hàm handlePlayClick
key={item._id}
className="border-bottom border-secondary border-opacity-10"
style={{
...customStyles.searchResult,
transition: 'all 0.3s ease'
}}
onMouseOver={(e) => {
e.currentTarget.style.background = 'linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(220, 38, 38, 0.2))';
e.currentTarget.style.borderLeft = '4px solid #dc2626';
e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.15)';
}}
onMouseOut={(e) => {
e.currentTarget.style.background = '';
e.currentTarget.style.borderLeft = '';
e.currentTarget.style.boxShadow = 'none';
}}
>
<td className="ps-3 py-4 text-center position-relative">
<span className="text-white-50 song-number">{index + 1}</span>
</td>
<td className="py-3">
<div className="d-flex align-items-center">
  <div className="position-relative me-3">
    <div className={`position-absolute top-0 bottom-0 start-0 end-0 rounded-3 ${isFavorite ? 'shadow-danger' : ''}`}></div>
    <img 
      src={item.imagePath} 
      alt={item.title} 
      className="rounded-3 object-fit-cover border border-secondary" 
      style={{
        width: '64px',
        height: '64px',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
        e.currentTarget.style.border = '1px solid rgba(220, 38, 38, 0.5)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.border = '1px solid #343a40';
      }}
    />
    <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center rounded-3 cover-overlay"
          style={{opacity: 0, transition: 'all 0.3s ease'}}>
      <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center play-button-mini"
            style={{
              width: '32px',
              height: '32px',
              transform: 'scale(0.9)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
            }}>
        <Play size={16} fill="white" style={{marginLeft: '2px'}} />
      </div>
    </div>
  </div>
  <div>
    <div className="fs-5 fw-semibold text-white song-title mb-0" style={{transition: 'all 0.3s ease'}}>{item.title}</div>
    <div className="text-secondary">{item.artist}</div>
  </div>
</div>
</td>
<td className="py-3 text-end position-relative pe-5" style={{ width: '50px' }}>
<button 
  className="btn btn-link p-2"
  style={{ 
    opacity: 0.75,
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.opacity = 1;
    e.currentTarget.style.transform = 'scale(1.1)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.opacity = 0.75;
    e.currentTarget.style.transform = 'scale(1)';
  }}
  onClick={() => {
    toggleFavorite(item._id);
  }}
>
  <Heart 
    size={24} 
    fill={isFavorite ? "#dc3545" : "none"} 
    color={isFavorite ? "#dc3545" : "white"} 
    className={isFavorite ? "animate-pulse" : ""}
  />
</button>
</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .song-number {
          transition: all 0.3s ease;
        }
        tr:hover .song-number {
          opacity: 0;
        }
        tr.active-song .song-title {
          color: #f87171 !important;
          text-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        }
        tr:hover .song-title {
          color: #f87171 !important;
          text-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        }
        tr:hover .cover-overlay {
          opacity: 1 !important;
        }
        tr:hover .play-button-mini {
          transform: scale(1) !important;
          transition: all 0.3s ease;
        }
        .cover-overlay {
          opacity: 0;
          transition: all 0.3s ease;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(220, 53, 69, 0.5);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 53, 69, 0.7);
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(220, 53, 69, 0.5) rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SearchPage;