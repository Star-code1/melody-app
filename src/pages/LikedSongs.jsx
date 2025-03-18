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
    <div className="tw:flex tw:flex-col tw:h-screen tw:bg-black tw:text-white" onClick={handleClickOutside}>

      <div className="tw:flex tw:p-8 tw:items-end tw:space-x-6 tw:bg-gradient-to-r tw:from-red-900/50 tw:to-black">
        <div className="tw:bg-gradient-to-br tw:from-red-600 tw:to-red-400 tw:w-42 tw:h-42 tw:flex tw:items-center tw:justify-center tw:rounded-lg tw:shadow-2xl">
          <Heart size={80} fill="white" color="white" className="tw:drop-shadow-xl" />
        </div>
        <div className="tw:flex tw:flex-col">
          <span className="tw:uppercase tw:text-sm tw:font-semibold">Playlist</span>
          <h1 className="tw:text-7xl tw:font-bold tw:mb-6 tw:bg-gradient-to-r tw:from-red-600 tw:to-red-400 tw:bg-clip-text tw:text-transparent">Liked Songs</h1>
          <div className="tw:flex tw:items-center tw:text-sm">
            <span className="tw:opacity-80">Những bài hát bạn yêu thích</span>
          </div>
        </div>
      </div>

      <div className="tw:px-8 tw:py-4 tw:flex tw:items-center tw:space-x-6 tw:bg-gradient-to-r tw:from-gray-900 tw:to-black">
        <button className="tw:bg-red-600 tw:hover:tw:bg-red-500 tw:rounded-full tw:w-14 tw:h-14 tw:flex tw:items-center tw:justify-center tw:shadow-lg tw:transition-colors tw:duration-300">
          <Play size={28} fill="white" className="tw:ml-1" />
        </button>
        <button className="tw:opacity-70 tw:hover:tw:opacity-100 tw:transition-opacity tw:duration-300">
          <Heart size={32} fill="#dc2626" className="tw:text-red-600" />
        </button>
        <button className="tw:opacity-70 tw:hover:tw:opacity-100 tw:transition-opacity tw:duration-300">
          <MoreHorizontal size={24} />
        </button>
      </div>
      <div className="tw:flex-1 tw:px-8 tw:overflow-y-auto tw:backdrop-blur-sm tw:bg-gradient-to-b tw:from-gray-900/80 tw:to-black">
        <table className="tw:w-full tw:border-collapse">
          <thead>
              <tr className="tw:border-b tw:border-white tw:border-opacity-10 tw:text-sm tw:opacity-70">
              <th className="tw:px-4 tw:py-2 tw:font-bold tw:text-lg tw:text-left tw:w-12">#</th>
              <th className="tw:px-4 tw:py-2 tw:font-bold tw:text-lg tw:text-left">Tiêu đề</th>
              <th className="tw:px-4 tw:py-2 tw:font-bold tw:text-lg tw:text-left">Album</th>
              <th className="tw:px-4 tw:py-2 tw:font-bold tw:float-right">
                <Clock size={24} />
              </th>
              <th className="tw:px-2 tw:py-2 tw:font-bold tw:float-right">
              </th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index) => (
              <tr
                key={song.id}
                className={`tw:border-b tw:border-white tw:border-opacity-5 tw:hover:tw:bg-gradient-to-r tw:hover:tw:from-gray-900 tw:hover:tw:to-red-900/30 tw:hover:tw:border-l-4 tw:hover:tw:border-red-600 tw:transition-all tw:duration-300 tw:group ${currentSong === song.id ? 'tw:bg-gradient-to-r tw:from-red-900/20 tw:to-transparent tw:border-l-4 tw:border-red-600' : ''}`}
                onDoubleClick={() => handlePlay(song.id)}
              >
                <td className="tw:px-4 tw:py-5 tw:text-center tw:text-lg tw:relative">
                  {currentSong === song.id ?
                    <Music size={20} className="tw:text-red-600" /> :
                    <span className="tw:opacity-70 tw:group-hover:tw:opacity-0 tw:transition-opacity tw:duration-300">{index + 1}</span>
                  }
                  {currentSong !== song.id && 
                    <Play size={20} className="tw:text-red-600 tw:absolute tw:opacity-0 tw:group-hover:tw:opacity-100 tw:transition-opacity tw:duration-300 tw:ml-4" />
                  }
                </td>
                <td className="tw:px-4 tw:py-5">
                  <div className="tw:flex tw:items-center">
                    <div className="tw:relative">
                      <div className={`tw:absolute tw:inset-0 tw:rounded-md ${currentSong === song.id ? 'tw:shadow-lg tw:shadow-red-900' : ''}`}></div>
                      <img src={song.coverArt} alt={song.title} className="tw:w-16 tw:h-16 tw:rounded-md tw:object-cover tw:border tw:border-gray-800" />
                      <div className="tw:absolute tw:inset-0 tw:bg-black tw:bg-opacity-30 tw:flex tw:items-center tw:justify-center tw:opacity-0 tw:group-hover:tw:opacity-100 tw:transition-opacity tw:duration-300 tw:rounded-md">
                        <div className="tw:w-8 tw:h-8 tw:bg-red-600 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:transform tw:scale-90 tw:group-hover:tw:scale-100 tw:transition-transform tw:duration-300">
                          <Play size={16} fill="white" className="tw:ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="tw:ml-6">
                      <div className={`tw:text-xl tw:font-semibold ${currentSong === song.id ? 'tw:text-red-600' : 'tw:text-white tw:group-hover:tw:text-red-400'} tw:transition-colors tw:duration-300`}>{song.title}</div>
                      <div className="tw:text-base tw:text-gray-400">{song.artist}</div>
                    </div>
                  </div>
                </td> 
                <td className="tw:px-4 tw:py-5 tw:text-gray-400 tw:text-lg">{song.album}</td>
                <td className="tw:px-4 tw:py-5 tw:text-right tw:text-gray-400 tw:text-lg">{song.duration}</td>
                <td className="tw:px-2 tw:py-5 tw:text-right tw:relative" onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === song.id ? null : song.id);
                }}>
                  <Ellipsis size={24} className="tw:opacity-0 tw:group-hover:tw:opacity-100 tw:transition-opacity tw:duration-300" />
                  {activeMenu === song.id && (
                     <div className="tw:absolute tw:right-0 tw:top-20 tw:bg-gray-800 tw:rounded-md tw:shadow-lg tw:py-2 tw:w-52 tw:z-10">
                     <button className="tw:w-full tw:px-4 tw:py-2 tw:text-left tw:text-sm tw:hover:tw:bg-gradient-to-r tw:hover:tw:from-gray-700 tw:hover:tw:to-red-900/20 tw:flex tw:items-center tw:transition-colors tw:duration-200">
                       <UserPlus size={16} className="tw:mr-3" />
                       <span>Add to playlist</span>
                     </button>
                     <button className="tw:w-full tw:px-4 tw:py-2 tw:text-left tw:text-sm tw:hover:tw:bg-gradient-to-r tw:hover:tw:from-gray-700 tw:hover:tw:to-red-900/20 tw:flex tw:items-center tw:transition-colors tw:duration-200">
                       <Download size={16} className="tw:mr-3" />
                       <span>Download</span>
                     </button>
                     <div className="tw:border-t tw:border-gray-700 tw:my-1"></div>
                     <button className="tw:w-full tw:px-4 tw:py-2 tw:text-left tw:text-sm tw:text-red-400 tw:hover:tw:bg-gradient-to-r tw:hover:tw:from-gray-700 tw:hover:tw:to-red-900/20 tw:flex tw:items-center tw:transition-colors tw:duration-200">
                       <Trash2 size={16} className="tw:mr-3" />
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