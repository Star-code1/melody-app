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
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 text-white" onClick={handleClickOutside}>

      <div className="flex p-8 items-end space-x-6">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-46 h-46 flex items-center justify-center rounded-lg shadow-2xl">
          <Heart size={100} fill="white" color="white" className="drop-shadow-xl" />
        </div>
        <div className="flex flex-col">
          <span className="uppercase text-sm font-semibold">Playlist</span>
          <h1 className="text-8xl font-bold mb-6">Liked Songs</h1>
          <div className="flex items-center text-sm">
            <span className="opacity-80">Những bài hát bạn yêu thích</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex items-center space-x-6 bg-black bg-opacity-20">
        <button className="bg-green-500 hover:bg-green-400 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <Play size={28} fill="black" className="ml-1" />
        </button>
        <button>
          <Heart size={32} fill="#1DB954" className="text-green-500" />
        </button>
        <button>
          <MoreHorizontal size={24} className="opacity-70 hover:opacity-100" />
        </button>
      </div>
      <div className="flex-1 px-8 overflow-y-auto backdrop-blur-sm bg-black bg-opacity-20">
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
                className={`border-b border-white border-opacity-5 hover:bg-gray-800 hover:bg-opacity-10 ${currentSong === song.id ? 'bg-gray-500 bg-opacity-20' : ''}`}
                onDoubleClick={() => handlePlay(song.id)}
              >
                <td className="px-4 py-5 text-center text-lg">
                  {currentSong === song.id ?
                    <Music size={20} className="text-green-500" /> :
                    <span className="opacity-70">{index + 1}</span>
                  }
                </td>
                <td className="px-4 py-5">
                  <div className="flex items-center">
                    <img src={song.coverArt} alt={song.title} className="w-16 h-16 mr-6 rounded shadow-md" />
                    <div>
                      <div className={`text-xl font-bold ${currentSong === song.id ? 'text-green-500' : ''}`}>{song.title}</div>
                      <div className="text-base opacity-70">{song.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5 opacity-70 text-lg">{song.album}</td>
                <td className="px-4 py-5 text-right opacity-70 text-lg">{song.duration}</td>
                <td className="px-2 py-5 text-right relative" onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === song.id ? null : song.id);
                }}>
                  <Ellipsis size={24} />
                  {activeMenu === song.id && (
                     <div className="absolute right-0 top-20 bg-gray-800 rounded-md shadow-lg py-2 w-52 z-10">
                     <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                       <UserPlus size={16} className="mr-3" />
                       <span>Add to playlist</span>
                     </button>
                     <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center">
                       <Download size={16} className="mr-3" />
                       <span>Download</span>
                     </button>
                     <div className="border-t border-gray-700 my-1"></div>
                     <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center">
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