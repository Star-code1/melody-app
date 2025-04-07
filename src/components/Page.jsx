import Home from "../pages/Home";
import LikedSongsPage from '../pages/LikedSongs'
import SearchPage from '../pages/SearchPage'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';

function Page() {
  return (
    <div className="vh-100 m-2 rounded">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/LikedSongsPage" element={<LikedSongsPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/PasswordReset" element={<PasswordReset />} />
        </Routes>
    </div>
  );
}

export default Page;
