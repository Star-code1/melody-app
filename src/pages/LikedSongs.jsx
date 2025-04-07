import React, { use, useEffect, useState } from 'react';
import { Heart, Play, Clock, Music, MoreHorizontal, Ellipsis, UserPlus, Download, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css'

const LikedSongsPage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    const fetchLikedSongs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to view your liked songs.');
        return;
      }
      let userId;
      try {
        userId = JSON.parse(token)._id;
      } catch (err) {
        console.error('Error parsing token:', err);
        alert('Invalid token format.');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/songs/liked?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setLikedSongs(data);
      } catch (err) {
        console.error('Error fetching liked songs:', err);
        alert('Failed to load liked songs. Please try again.');
      }
    };
  
    fetchLikedSongs();
  }, []);

  const handlePlay = (songId) => {
    setCurrentSong(songId);
  };

  const handleClickOutside = () => {
    if (activeMenu !== null) {
      setActiveMenu(null);
    }
  };

  const customStyles = {
    gradientHeader: {
      background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), rgba(0, 0, 0, 0.8))'
    },
    gradientNavbar: {
      background: 'linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.95))'
    },
    gradientBackground: {
      background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.95), rgba(0, 0, 0, 0.95))'
    },
    gradientText: {
      background: 'linear-gradient(to right, #dc2626, #f87171)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    hoverRow: {
      transition: 'all 0.3s ease'
    },
    currentSongHighlight: {
      borderLeft: '4px solid #dc2626',
      background: 'linear-gradient(to right, rgba(220, 38, 38, 0.1), transparent)'
    },
    playButton: {
      backgroundColor: '#dc2626',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
    },
    playButtonHover: {
      backgroundColor: '#ef4444',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 16px rgba(220, 38, 38, 0.3)'
    }
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white" onClick={handleClickOutside}>
      <div className="d-flex p-4 align-items-end" style={customStyles.gradientHeader}>
        <div className="d-flex align-items-center justify-content-center rounded-3 shadow me-4" 
             style={{
               background: 'linear-gradient(135deg, #dc2626, #f87171)',
               width: '120px',
               height: '120px',
               transition: 'all 0.3s ease'
             }}
             onMouseOver={(e) => {
               e.currentTarget.style.transform = 'scale(1.02)';
               e.currentTarget.style.boxShadow = '0 8px 24px rgba(220, 38, 38, 0.3)';
             }}
             onMouseOut={(e) => {
               e.currentTarget.style.transform = 'scale(1)';
               e.currentTarget.style.boxShadow = 'none';
             }}>
          <Heart size={60} fill="white" color="white" />
        </div>
        <div className="d-flex flex-column">
          <span className="text-uppercase small fw-semibold text-white-50">Playlist</span>
          <h1 className="display-5 fw-bold mb-2 text-danger">Liked Songs</h1>
          <div className="d-flex align-items-center small">
            <span className="text-white-50">Những bài hát bạn yêu thích</span>
          </div>
        </div>
      </div>


      <div className="px-4 py-3 d-flex align-items-center" style={customStyles.gradientNavbar}>
        <button className="btn rounded-circle d-flex align-items-center justify-content-center me-3" 
                style={customStyles.playButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.2)';
                }}>
          <Play size={28} fill="white" style={{marginLeft: '2px'}} />
        </button>
        <button className="btn text-white-50 me-3" 
                style={{opacity: 0.7, transition: 'all 0.3s ease'}}
                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}>
          <Heart size={32} fill="#dc2626" />
        </button>
        <button className="btn text-white-50" 
                style={{opacity: 0.7, transition: 'all 0.3s ease'}}
                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}>
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex-grow-1 px-4 overflow-auto" style={customStyles.gradientBackground}>
        <table className="table table-dark table-borderless " style={{marginBottom: '10rem'}}>
          <thead>
            <tr className="border-bottom border-secondary border-opacity-25 text-white-50">
              <th className="ps-3 fw-bold fs-5 text-center">#</th>
              <th className="fw-bold fs-5 text-start">Tiêu đề</th>

            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr
                key={song._id}
                className={`border-bottom border-secondary border-opacity-10 ${currentSong === song.id ? 'active' : ''}`}
                style={{
                  ...customStyles.hoverRow,
                  ...(currentSong === song._id ? customStyles.currentSongHighlight : {})
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(220, 38, 38, 0.1))';
                  e.currentTarget.style.borderLeft = '4px solid #dc2626';
                }}
                onMouseOut={(e) => {
                  if (currentSong !== song._id) {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.borderLeft = '';
                  }
                }}
                onDoubleClick={() => handlePlay(song._id)}
              >
                <td className="ps-3 py-4 text-center position-relative">
                  {currentSong === song._id ? (
                    <Music size={20} className="text-danger" />
                  ) : (
                    <span className="text-white-50 song-number">{index + 1}</span>
                  )}
                  
                </td>
                <td className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className={`position-absolute top-0 bottom-0 start-0 end-0 rounded-3 ${currentSong === song._id ? 'shadow-danger' : ''}`}></div>
                      <img 
                        src={song.imagePath} 
                        alt={song.title} 
                        className="rounded-3 object-fit-cover border border-secondary" 
                        style={{
                          width: '64px',
                          height: '64px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.2)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                      <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center rounded-3 cover-overlay"
                           style={{opacity: 0, transition: 'all 0.3s ease'}}>
                        <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center play-button-mini"
                             style={{
                               width: '32px',
                               height: '32px',
                               transform: 'scale(0.9)',
                               transition: 'all 0.3s ease'
                             }}>
                          <Play size={16} fill="white" style={{marginLeft: '2px'}} />
                        </div>
                      </div>
                    </div>
                    <div className="ms-3">
                      <div className={`fs-5 fw-semibold ${currentSong === song._id ? 'text-danger' : 'text-white song-title'}`}
                           style={{transition: 'all 0.3s ease'}}>{song.title}</div>
                      <div className="text-secondary">{song.artist}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .song-number {
          transition: all 0.3s ease;
        }
        tr:hover .song-number {
          opacity: 0;
        }
        tr:hover .song-more-icon {
          opacity: 1 !important;
        }
        tr:hover .song-title {
          color: #f87171 !important;
        }
        tr:hover .cover-overlay {
          opacity: 1 !important;
        }
        tr:hover .play-button-mini {
          transform: scale(1) !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default LikedSongsPage;