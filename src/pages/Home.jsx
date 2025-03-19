import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylecomponent/homestyle.css';
import MusicCard from '../components/MusicCard';
import  { useState, useEffect } from 'react';
import SingerCard from '../components/SingerCard';
const Home = () => {
    const [artists, setArtists] = useState([
        {
            id: 1,
            name: "Duong Domic",
            label: "Artist",
            image: "./duongdomic.jpg", // Thay bằng đường dẫn hình ảnh thực tế
        },
        {
            id: 2,
            name: "Son Tung M-TP",
            label: "Artist",
            image: "./sontung.jpg",
        },
        {
            id: 3,
            name: "HIEUTHUHAI",
            label: "Artist",
            image: "./hieuthuhai.jpg",
        },
        {
            id: 5,
            name: "ERIK",
            label: "Artist",
            image: "./erik.jpg",
        },
        {
            id: 6,
            name: "buutruonglinh",
            label: "Artist",
            image: "./buulinh.jpg",
        },
    ]);
    const [musicData, setMusicData] = useState([
        {
          id: 1,
          title: 'As It Was',
          description: 'Explore new artists and genres with our personalized recommendations.',
          buttonText: 'EXPLORE',
          imageUrl: './starboy.jpg'
        },
        {
          id: 2,
          title: 'Night Changes',
          description: 'Build the perfect soundtrack for any moment with easy-to-create custom playlists.',
          buttonText: 'CREATE NOW',
          imageUrl: './starboy.jpg'
        },
        {
          id: 3,
          title: 'Safe And Sound',
          description: 'Download your favorite songs and albums to listen even when you\'re not connected.',
          buttonText: 'LEARN MORE',
          imageUrl: './starboy.jpg'
        },
        {
          id: 4,
          title: 'METAMORPHOSIS',
          description: 'Download your favorite songs and albums to listen even when you\'re not connected.',
          buttonText: 'LEARN MORE',
          imageUrl: './starboy.jpg'
        },
        {
          id: 5,
          title: 'Starboy',
          description: 'Download your favorite songs and albums to listen even when you\'re not connected.',
          buttonText: 'LEARN MORE',
          imageUrl: './starboy.jpg'  
        },
        {
          id: 6,
          title: 'DIL NU',
          description: 'Download your favorite songs and albums to listen even when you\'re not connected.',
          buttonText: 'LEARN MORE',
          imageUrl: './starboy.jpg'
        }
      ]);
    
  return (
 <>
 <div className="melody-website">
  {/* Hero Section */}
  <section className="hero-section position-relative py-5 ">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 text-white fw-bold mb-3">MelodyApp</h1>
          <h2 className="h3 text-white mb-4">Your Music Universe, Everywhere</h2>
          <p className="text-light mb-4">Discover millions of songs, create playlists, and enjoy a personalized music experience tailored just for you.</p>
          <button className="btn btn-light px-4 py-2 fw-bold">START LISTENING</button>
        </div>
      </div>
    </div>
    {/* Decorative music elements */}
  
  </section>

  <div className="row">
  <h1 className="top-songs-title">Top English Song</h1>
          {musicData.map(item => (
            <div className="col-md-2 mb-4" key={item.id}>
              <MusicCard
                title={item.title}
                description={item.description}
                buttonText={item.buttonText}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>
       
      <div className="row">
      <h1 className="top-songs-title text-center my-4">Popular Artist</h1>
        {artists.map((artist) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={artist.id}>
            <SingerCard
              title={artist.name}
              description={artist.label}
              imageUrl={artist.image}
            />
          </div>
        ))}
      </div>
        <div className="row">
          {musicData.map(item => (
            <div className="col-md-2 mb-4" key={item.id}>
              <MusicCard
                title={item.title}
                description={item.description}
                buttonText={item.buttonText}
                imageUrl={item.imageUrl}
              />
            </div>
          ))}
        </div>


 
</div>
 </>
  );
};

export default Home;