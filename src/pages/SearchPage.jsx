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
    <div className="tw:min-h-screen tw:bg-black tw:text-white tw-p-6">
      <div className="tw:max-w-4xl tw:mx-auto tw:py-4">

        <div className="tw:flex tw:items-center tw:mb-6">
          <Disc size={36} className="tw:text-red-600 tw:mr-3" />
          <h1 className="tw:text-4xl tw:font-bold tw:bg-gradient-to-r tw:from-red-600 tw:to-red-400 tw:bg-clip-text tw:text-transparent">
            Search
          </h1>
        </div>
        
        <div className="tw:mb-8 tw:relative">
          <div className="tw:absolute tw:inset-y-0 tw:left-0 tw:pl-3 tw:flex tw:items-center tw:pointer-events-none">
            <Search size={20} className="tw:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="tw:w-full tw:bg-gray-800 tw:text-white tw:pl-10 tw:p-4 tw:rounded-full focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-red-600 tw:transition-all tw:duration-300 tw:shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tw:mb-10">
          <div className="tw:flex tw:items-center tw:mb-4">
            <TrendingUp size={24} className="tw:text-red-600 tw:mr-2" />
            <h2 className="tw:text-2xl tw:font-bold">Top Trending</h2>
          </div>
          
          <div className="tw:grid tw:grid-cols-2 md:tw:grid-cols-2 tw:gap-4">
            {topTrendingSongs.map((song, index) => (
              <div 
                key={song.id}
                className="tw:flex tw:items-center tw:bg-gray-900/40 tw:p-3 tw:rounded-lg hover:tw:bg-gradient-to-r hover:tw:from-gray-900 hover:tw:to-red-900/30 tw:transition-all tw:duration-300 tw:group"
              >
                <div className="tw:flex-shrink-0 tw:mr-3 tw:text-xl tw:font-bold tw:text-gray-400 tw:w-6">
                  {index + 1}
                </div>
                <div className="tw:relative tw:flex-shrink-0">
                  <img 
                    src={song.coverArt} 
                    alt={song.title} 
                    className="tw:w-14 tw:h-14 tw:rounded-md tw:object-cover tw:border tw:border-gray-800"
                  />
                  <div className="tw:absolute tw:inset-0 tw:bg-black tw:bg-opacity-30 tw:flex tw:items-center tw:justify-center tw:opacity-0 tw:group-hover:tw:opacity-100 tw:transition-opacity tw:duration-300 tw:rounded-md">
                    <div className="tw:w-7 tw:h-7 tw:bg-red-600 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                      <Play size={14} fill="white" className="tw:ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="tw:ml-3 tw:flex-grow">
                  <h3 className="tw:text-base tw:font-semibold tw:text-white tw:truncate">{song.title}</h3>
                  <p className="tw:text-sm tw:text-gray-400 tw:truncate">{song.artist}</p>
                </div>
                <div className="tw:flex-shrink-0 tw:ml-2 tw:text-sm tw:text-gray-400">
                  {song.plays}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="tw:mt-8">
          <h2 className="tw:text-2xl tw:font-bold tw:mb-4">Kết quả tìm kiếm</h2>
          <div className="tw:space-y-2">
            {musicItems.map((item) => {
              const isFavorite = favorites.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className="tw:flex tw:items-center tw:justify-between tw:p-3 tw:rounded-lg hover:tw:bg-gradient-to-r hover:tw:from-gray-900 hover:tw:to-red-900/30 hover:tw:border-l-4 hover:tw:border-red-600 tw:transition-all tw:duration-300 tw:group"
                >
                  <div className="tw:flex tw:items-center tw:space-x-4">
                    <div className="tw:relative">
                      <div 
                        className={`tw:absolute tw:inset-0 tw:rounded-md ${isFavorite ? 'tw:shadow-lg tw:shadow-red-900' : ''}`}
                      ></div>
                      <img 
                        src={item.coverArt} 
                        alt={item.title} 
                        className="tw:w-16 tw:h-16 tw:rounded-md tw:object-cover tw:border tw:border-gray-800"
                      />
                      <div className="tw:absolute tw:inset-0 tw:bg-black tw:bg-opacity-30 tw:flex tw:items-center tw:justify-center tw:opacity-0 tw:group-hover:tw:opacity-100 tw:transition-opacity tw:duration-300 tw:rounded-md">
                        <div className="tw:w-8 tw:h-8 tw:bg-red-600 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                          <div className="tw:w-0 tw:h-0 tw:border-t-transparent tw:border-t-8 tw:border-b-transparent tw:border-b-8 tw:border-l-white tw:border-l-12 tw:ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="tw:text-lg tw:font-semibold tw:text-white">{item.title}</h3>
                      <p className="tw:text-gray-400">{item.artist}</p>
                    </div>
                  </div>
                  <button 
                    className="tw:p-2 tw:opacity-70 hover:tw:opacity-100 tw:transition-opacity tw:duration-300"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart 
                      size={24} 
                      fill={isFavorite ? "#dc2626" : "none"} 
                      color={isFavorite ? "#dc2626" : "white"} 
                      className={isFavorite ? "tw:animate-pulse" : ""}
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