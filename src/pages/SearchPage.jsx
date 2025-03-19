import React, { useState } from 'react';
import { Heart, Search, Disc, TrendingUp, Play, Clock } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([3]);
  
  const musicItems = [
    { id: 1, title: "daylight", artist: "taylor swift", album: "Lover", duration: "4:53", coverArt: "https://picsum.photos/200" },
    { id: 2, title: "Lavender Haze", artist: "taylor swift", album: "Midnights", duration: "3:22", coverArt: "https://picsum.photos/200" },
    { id: 3, title: "august", artist: "taylor swift", album: "folklore", duration: "4:21", coverArt: "https://picsum.photos/200" },
    { id: 4, title: "Anti-Hero", artist: "taylor swift", album: "Midnights", duration: "3:20", coverArt: "https://picsum.photos/200" },
    { id: 5, title: "Love Story", artist: "taylor swift", album: "Fearless", duration: "3:55", coverArt: "https://picsum.photos/200" },
    { id: 6, title: "Cruel Summer", artist: "taylor swift", album: "Lover", duration: "2:58", coverArt: "https://picsum.photos/200" },
    { id: 7, title: "Blank Space", artist: "taylor swift", album: "1989", duration: "3:51", coverArt: "https://picsum.photos/200" },
    { id: 8, title: "All Too Well", artist: "taylor swift", album: "Red", duration: "5:29", coverArt: "https://picsum.photos/200" },
    { id: 9, title: "Wildest Dreams", artist: "taylor swift", album: "1989", duration: "3:40", coverArt: "https://picsum.photos/200" },
    { id: 10, title: "Enchanted", artist: "taylor swift", album: "Speak Now", duration: "5:52", coverArt: "https://picsum.photos/200" },
  ];

  const topTrendingSongs = [
    { id: 101, title: "Fortnight", artist: "Taylor Swift ft. Post Malone", plays: "10.5M", coverArt: "https://picsum.photos/id/237/200" },
    { id: 102, title: "Texas Hold 'Em", artist: "Beyoncé", plays: "9.8M", coverArt: "https://picsum.photos/id/238/200" },
    { id: 103, title: "Espresso", artist: "Sabrina Carpenter", plays: "8.7M", coverArt: "https://picsum.photos/id/239/200" },
    { id: 104, title: "Houdini", artist: "Dua Lipa", plays: "7.9M", coverArt: "https://picsum.photos/id/240/200" },
    { id: 105, title: "Paint The Town Red", artist: "Doja Cat", plays: "7.5M", coverArt: "https://picsum.photos/id/241/200" },
    { id: 106, title: "Snooze", artist: "SZA", plays: "7.2M", coverArt: "https://picsum.photos/id/242/200" },
    { id: 107, title: "Greedy", artist: "Tate McRae", plays: "6.8M", coverArt: "https://picsum.photos/id/243/200" },
    { id: 108, title: "Lovin On Me", artist: "Jack Harlow", plays: "6.5M", coverArt: "https://picsum.photos/id/244/200" },
    { id: 109, title: "Agora Hills", artist: "Doja Cat", plays: "6.2M", coverArt: "https://picsum.photos/id/245/200" },
    { id: 110, title: "Not Like Us", artist: "Kendrick Lamar", plays: "5.9M", coverArt: "https://picsum.photos/id/246/200" },
  ];

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Custom styles
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
    trendingItem: {
      transition: 'all 0.3s ease',
      border: '1px solid transparent',
      backgroundColor: 'transparent'
    },
    trendingItemHover: {
      transform: 'translateY(-2px)',
      backgroundColor: 'rgba(33, 37, 41, 0.8)',
      border: '1px solid rgba(220, 53, 69, 0.2)',
      boxShadow: '0 4px 12px rgba(220, 53, 69, 0.1)'
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
    <div className="search-page-root">
      <div className="search-page-container">
        <div className="d-flex align-items-center mb-4">
          <Disc size={36} className="text-danger me-3" />
          <h1 className="display-5 fw-bold" style={customStyles.gradientText}>
            Search
          </h1>
        </div>
        
        <div className="mb-5 position-relative">
          <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
            <Search size={20} className="text-secondary" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
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

        <div className="mb-5">
          <div className="d-flex align-items-center mb-3">
            <TrendingUp size={24} className="text-danger me-2" />
            <h2 className="fs-2 fw-bold mb-0">Top Trending</h2>
          </div>
          
          <div className="row g-3">
            {topTrendingSongs.map((song, index) => (
              <div key={song.id} className="col-md-6">
                <div className="d-flex align-items-center p-3 rounded-3 position-relative trending-item"
                  style={customStyles.trendingItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = customStyles.trendingItemHover.transform;
                    e.currentTarget.style.backgroundColor = customStyles.trendingItemHover.backgroundColor;
                    e.currentTarget.style.border = customStyles.trendingItemHover.border;
                    e.currentTarget.style.boxShadow = customStyles.trendingItemHover.boxShadow;
                    const overlay = e.currentTarget.querySelector('.cover-overlay');
                    const playButton = e.currentTarget.querySelector('.play-button-mini');
                    if (overlay) overlay.style.opacity = '1';
                    if (playButton) playButton.style.transform = 'scale(1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.border = '1px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    const overlay = e.currentTarget.querySelector('.cover-overlay');
                    const playButton = e.currentTarget.querySelector('.play-button-mini');
                    if (overlay) overlay.style.opacity = '0';
                    if (playButton) playButton.style.transform = 'scale(0.9)';
                  }}>
                  <div className="me-3 fs-4 fw-bold text-secondary" style={{ width: '24px' }}>
                    {index + 1}
                  </div>
                  <div className="position-relative me-3">
                    <img 
                      src={song.coverArt} 
                      alt={song.title} 
                      className="rounded-3" 
                      style={{
                        ...customStyles.coverArt,
                        width: '56px',
                        height: '56px',
                        objectFit: 'cover',
                        border: '1px solid #343a40'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = customStyles.coverArtHover.transform;
                        e.currentTarget.style.boxShadow = customStyles.coverArtHover.boxShadow;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center rounded-3 cover-overlay"
                      style={{ 
                        opacity: 0, 
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                      <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center play-button-mini"
                        style={{ 
                          width: '28px', 
                          height: '28px',
                          transition: 'all 0.3s ease',
                          transform: 'scale(0.9)',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
                        }}>
                        <Play size={14} fill="white" style={{ marginLeft: '2px' }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className="fs-6 fw-semibold text-white text-truncate mb-0">{song.title}</h3>
                    <p className="small text-secondary text-truncate mb-0">{song.artist}</p>
                  </div>
                  <div className="ms-2 small text-secondary">
                    {song.plays}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-5 search-results-section">
          <h2 className="fs-2 fw-bold mb-4">Kết quả tìm kiếm</h2>
          <div className="table-responsive">
            <table className="table table-dark table-borderless">
              <thead>
                <tr className="border-bottom border-secondary border-opacity-25 text-white-50">
                  <th className="ps-3 fw-bold fs-5 text-start">#</th>
                  <th className="fw-bold fs-5 text-start">Tiêu đề</th>
                  <th className="fw-bold fs-5 text-start">Album</th>
                  <th className="text-end pe-4">
                    <Clock size={24} />
                  </th>
                  <th className="text-end pe-2 w-auto"></th>
                </tr>
              </thead>
              <tbody>
                {musicItems.map((item, index) => {
                  const isFavorite = favorites.includes(item.id);
                  
                  return (
                    <tr
                      key={item.id}
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
                              src={item.coverArt} 
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
                      <td className="py-4 text-secondary fs-6">{item.album}</td>
                      <td className="py-4 text-end text-secondary fs-6 pe-4">{item.duration}</td>
                      <td className="py-3 text-end position-relative pe-2" style={{ width: '50px' }}>
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
                          onClick={() => toggleFavorite(item.id)}
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
          </div>
        </div>
      </div>

      {/* CSS for hover and scrollbar effects */}
      <style jsx>{`
        .search-page-root {
          height: 100%;
          width: 100%;
          overflow: hidden;
          background-color: #121212;
          color: white;
          display: flex;
          flex-direction: column;
        }
        
        .search-page-container {
          height: 100%;
          overflow-y: auto;
          padding: 2rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(220, 53, 69, 0.5) rgba(33, 37, 41, 0.2);
        }
        
        /* Custom scrollbar styling for Chrome, Edge, and Safari */
        .search-page-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .search-page-container::-webkit-scrollbar-track {
          background: rgba(33, 37, 41, 0.2);
          border-radius: 4px;
        }
        
        .search-page-container::-webkit-scrollbar-thumb {
          background: rgba(220, 53, 69, 0.5);
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        .search-page-container::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 53, 69, 0.8);
        }
        
        .search-results-section {
          margin-bottom: 2rem;
        }
        
        .song-number {
          transition: all 0.3s ease;
        }
        
        tr:hover .song-number {
          opacity: 0;
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
        
        .trending-item:hover .cover-overlay {
          opacity: 1 !important;
        }
        
        .trending-item:hover .play-button-mini {
          transform: scale(1) !important;
        }
        
        .table-responsive {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(220, 53, 69, 0.5) rgba(33, 37, 41, 0.2);
        }
        
        .table-responsive::-webkit-scrollbar {
          height: 6px;
        }
        
        .table-responsive::-webkit-scrollbar-track {
          background: rgba(33, 37, 41, 0.2);
          border-radius: 3px;
        }
        
        .table-responsive::-webkit-scrollbar-thumb {
          background: rgba(220, 53, 69, 0.5);
          border-radius: 3px;
        }
        
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 53, 69, 0.8);
        }
      `}</style>
    </div>
  );
};

export default SearchPage;