import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MySong from "../pages/MySong";
import LikedSongsPage from '../pages/LikedSongs'
import SearchPage from '../pages/SearchPage'

function Page() {
  return (
    <div className="vh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/MySong" element={<MySong />} />
        <Route path="/LikedSongsPage" element={<LikedSongsPage />} />
      </Routes>
    </div>
  );
}

export default Page;
