import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylecomponent/homestyle.css';
import MusicCard from '../components/MusicCard';
import axios from 'axios';
import { FaPlay, FaMusic, FaSearch } from 'react-icons/fa';
import bgImage from '../assets/hinh-nen-may-tinh-phi-hanh-gia-3.jpeg';
const Home = () => {
  const [songs, setSongs] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch songs from your API
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/songs');
        setSongs(response.data);
        
        // Let's assume the first 6 songs are top songs (you might want to modify this logic)
        setTopSongs(response.data.slice(0, 6));
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch songs');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSongs();
  }, []);

  // Filter songs based on search term
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="melody-app">
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .melody-app {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #8e44ad #f5f5f5;
}

.melody-app::-webkit-scrollbar {
  width: 0.5rem;
}

.melody-app::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 0.625rem;
}

.melody-app::-webkit-scrollbar-thumb {
  background-color: #8e44ad;
  border-radius: 0.625rem;
}

.hero-section {
  padding: 6rem;
  margin: 1rem 0.1rem;
  margin-top: 0;
  margin-right: 1rem;
}
.hero-section-title {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 1rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  color: #FFFFFF;

}

.section-title {
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #333;
  position: relative;
  padding-left: 0.9375rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0.3125rem;
  background: #8e44ad;
  border-radius: 0.3125rem;
}

.songs-container {
  padding: 1.25rem;
  background: #fff;
  border-radius: 0.9375rem;
  box-shadow: 0 0.3125rem 0.9375rem rgba(0,0,0,0.05);
  margin-bottom: 1.875rem;
  margin-right: 1.25rem;
  width: calc(100% - 1.25rem);
}

.play-button {
  background: #8e44ad;
  color: white;
  border-radius: 3.125rem;
  padding: 0.75rem 1.875rem;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.play-button:hover {
  background: #9b59b6;
  transform: scale(1.05);
}

.music-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.music-card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.music-card-artist {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

      `}</style>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-3 hero-section-title">Melody</h1>
              <h2 className="h3 mb-4 hero-section-title">Thế giới âm nhạc trong tầm tay bạn."</h2>
              <p className="mb-4 hero-section-title" >Âm nhạc mọi lúc, mọi nơi – kết nối cảm xúc của bạn với những giai điệu tuyệt vời nhất.</p>
              <button className="play-button" onClick={() => {
                document.getElementById("songs")?.scrollIntoView({ behavior: "smooth" });
                }}>
                <FaPlay /> START LISTENING
              </button>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="music-icon text-center">
                <FaMusic size={150} color="rgba(255,255,255,0.2)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* All Songs Section */}
        <div className="songs-container rounded" id='songs'>
          <h2 className="section-title">All Songs</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading songs...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="row">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, index) => (
                  // Modified to show 4 cards per row (col-md-3 instead of col-md-2)
                  <div className="col-md-3 col-sm-6 mb-4" key={song._id}>
                    <MusicCard
                      title={song.title}
                      description={song.artist}
                      buttonText="Play"
                      imageUrl={`http://localhost:5000/${song.imagePath}`}
                      truncateTitle={true}
                      truncateDescription={true}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No songs found matching your search.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">© 2025 MelodyApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;