import React, { useState } from 'react';
import { Heart, Play, Clock, Music, MoreHorizontal, Ellipsis, UserPlus, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LikedSongsPage = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const likedSongs = [
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

  const handlePlay = (songId) => {
    setCurrentSong(songId);
  };

  const handleClickOutside = () => {
    if (activeMenu !== null) {
      setActiveMenu(null);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-black text-white" onClick={handleClickOutside}>

      <div className="flex p-8 items-end space-x-6 bg-gradient-to-r from-red-900/50 to-black">
        <div className="bg-gradient-to-br from-red-600 to-red-400 w-46 h-46 flex items-center justify-center rounded-lg shadow-2xl">
          <Heart size={100} fill="white" color="white" className="drop-shadow-xl" />
        </div>
        <div className="flex flex-col">
          <span className="uppercase text-sm font-semibold">Playlist</span>
          <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Liked Songs</h1>
          <div className="flex items-center text-sm">
            <span className="opacity-80">Những bài hát bạn yêu thích</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex items-center space-x-6 bg-gradient-to-r from-gray-900 to-black">
        <button className="bg-red-600 hover:bg-red-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-300">
          <Play size={28} fill="white" className="ml-1" />
        </button>
        <button className="opacity-70 hover:opacity-100 transition-opacity duration-300">
          <Heart size={32} fill="#dc2626" className="text-red-600" />
        </button>
        <button className="opacity-70 hover:opacity-100 transition-opacity duration-300">
          <MoreHorizontal size={24} />
        </button>
      </div>
      <div className="flex-1 px-8 overflow-y-auto backdrop-blur-sm bg-gradient-to-b from-gray-900/80 to-black">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white border-opacity-10 text-sm opacity-70">
              <th className="px-4 py-2 font-bold text-lg text-left w-12">#</th>
              <th className="px-4 py-2 font-bold text-lg text-left">Tiêu đề</th>
              <th className="px-4 py-2 font-bold text-lg text-left">Album</th>
              <th className="px-4 py-2 font-bold float-right">
                <Clock size={24} />
              </th>
              <th className="px-2 py-2 font-bold float-right">
              </th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr
                key={song.id}
                className={`border-b border-white border-opacity-5 hover:bg-gradient-to-r hover:from-gray-900 hover:to-red-900/30 hover:border-l-4 hover:border-red-600 transition-all duration-300 group ${currentSong === song.id ? 'bg-gradient-to-r from-red-900/20 to-transparent border-l-4 border-red-600' : ''}`}
                onDoubleClick={() => handlePlay(song.id)}
              >
                <td className="px-4 py-5 text-center text-lg relative">
                  {currentSong === song.id ?
                    <Music size={20} className="text-red-600" /> :
                    <span className="opacity-70 group-hover:opacity-0 transition-opacity duration-300">{index + 1}</span>
                  }
                  {currentSong !== song.id && 
                    <Play size={20} className="text-red-600 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4" />
                  }
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-md ${currentSong === song.id ? 'shadow-lg shadow-red-900' : ''}`}></div>
                      <img src={song.coverArt} alt={song.title} className="w-16 h-16 rounded-md object-cover border border-gray-800" />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play size={16} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className={`text-xl font-semibold ${currentSong === song.id ? 'text-red-600' : 'text-white group-hover:text-red-400'} transition-colors duration-300`}>{song.title}</div>
                      <div className="text-base text-gray-400">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5 text-gray-400 text-lg">{song.album}</td>
                <td className="px-4 py-5 text-right text-gray-400 text-lg">{song.duration}</td>
                <td className="px-2 py-5 text-right relative" onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === song.id ? null : song.id);
                }}>
                  <Ellipsis size={24} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {activeMenu === song.id && (
                     <div className="absolute right-0 top-20 bg-gray-800 rounded-md shadow-lg py-2 w-52 z-10">
                     <button className="w-full px-4 py-2 text-left text-sm hover:bg-gradient-to-r hover:from-gray-700 hover:to-red-900/20 flex items-center transition-colors duration-200">
                       <UserPlus size={16} className="mr-3" />
                       <span>Add to playlist</span>
                     </button>
                     <button className="w-full px-4 py-2 text-left text-sm hover:bg-gradient-to-r hover:from-gray-700 hover:to-red-900/20 flex items-center transition-colors duration-200">
                       <Download size={16} className="mr-3" />
                       <span>Download</span>
                     </button>
                     <div className="border-t border-gray-700 my-1"></div>
                     <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gradient-to-r hover:from-gray-700 hover:to-red-900/20 flex items-center transition-colors duration-200">
                       <Trash2 size={16} className="mr-3" />
                       <span>Delete</span>
                     </button>
                   </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LikedSongsPage;