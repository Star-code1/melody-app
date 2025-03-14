import React, { useState } from 'react';
import { Heart, Search, Disc, TrendingUp, Play } from 'lucide-react';

const MusicSearch = () => {
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

  // Top 10 bài hát hot nhất hiện tại
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center mb-6">
          <Disc size={36} className="text-red-600 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Search
          </h1>
        </div>
        
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 text-white pl-10 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Top Trending Section */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <TrendingUp size={24} className="text-red-600 mr-2" />
            <h2 className="text-2xl font-bold">Top Trending</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topTrendingSongs.map((song, index) => (
              <div 
                key={song.id}
                className="flex items-center bg-gray-900/40 p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-900 hover:to-red-900/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 mr-3 text-xl font-bold text-gray-400 w-6">
                  {index + 1}
                </div>
                <div className="relative flex-shrink-0">
                  <img 
                    src={song.coverArt} 
                    alt={song.title} 
                    className="w-14 h-14 rounded-md object-cover border border-gray-800"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                    <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                      <Play size={14} fill="white" className="ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex-grow">
                  <h3 className="text-base font-semibold text-white truncate">{song.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
                <div className="flex-shrink-0 ml-2 text-sm text-gray-400">
                  {song.plays}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Search Results Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm</h2>
          <div className="space-y-2">
            {musicItems.map((item) => {
              const isFavorite = favorites.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-900 hover:to-red-900/30 hover:border-l-4 hover:border-red-600 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div 
                        className={`absolute inset-0 rounded-md ${isFavorite ? 'shadow-lg shadow-red-900' : ''}`}
                      ></div>
                      <img 
                        src={item.coverArt} 
                        alt={item.title} 
                        className="w-16 h-16 rounded-md object-cover border border-gray-800"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-t-transparent border-t-8 border-b-transparent border-b-8 border-l-white border-l-12 ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400">{item.artist}</p>
                    </div>
                  </div>
                  <button 
                    className="p-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart 
                      size={24} 
                      fill={isFavorite ? "#dc2626" : "none"} 
                      color={isFavorite ? "#dc2626" : "white"} 
                      className={isFavorite ? "animate-pulse" : ""}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSearch;