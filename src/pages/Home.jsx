import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylecomponent/homestyle.css';
import MusicCard from '../components/MusicCard';
import axios from 'axios';
import { FaPlay, FaMusic, FaSearch } from 'react-icons/fa';
import bgImage from '../assets/hinh-nen-may-tinh-phi-hanh-gia-3.jpeg';
import './Home.scss';

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