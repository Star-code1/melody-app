import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import Login from './pages/Login';
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset';
import Home from './pages/Home';

function App() {
  return (
  <Router basename="/melody-app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/PasswordReset" element={<PasswordReset />} />
    </Routes>
  </Router>
  );
}
export default App
