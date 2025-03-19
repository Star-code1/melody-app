import Home from "../pages/Home";
import Search from "../pages/Search";
import MySong from "../pages/MySong";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PasswordReset from '../pages/PasswordReset';
function Page() {
  return (
    <div className="vh-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/MySong" element={<MySong />} />
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/PasswordReset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default Page;
