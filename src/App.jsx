import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Header from './components/Header'
import Player from './components/Player'

function App() {
  return (
    <BrowserRouter basename="/Melody"> 
      <div className='container-fluid vh-100' >
        <Row>
          <Col style={{ flex: "0.25", padding: "0" }}>
            <Sidebar />
          </Col>
          <Col  style={{padding: "0" }}>
            <Header />
            <Page />
          </Col>
        </Row>
      </div>
      <Player></Player>
    </BrowserRouter>
  );
}
export default App;
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
