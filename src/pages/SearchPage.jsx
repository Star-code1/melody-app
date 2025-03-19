import React, { useState } from 'react';
import { Heart, Search, Disc, Play, Clock, Ellipsis } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'
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
    <div className="min-vh-100 bg-dark text-white p-4">
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

        <div className="mt-5">
          <h2 className="fs-2 fw-bold mb-4">Kết quả tìm kiếm</h2>
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

      {/* CSS for hover effects */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default SearchPage;