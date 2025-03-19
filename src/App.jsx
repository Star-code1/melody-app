import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home"
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
function App() {
 

  return (
    <div>
        <Row>
          <Col md={2}>
        <Sidebar></Sidebar>
          </Col>
          <Col>
       <Router>
        <Routes>
          <Route path="/melody-app/" element={<Home />} ></Route>
        </Routes>
       </Router>
          </Col>
        </Row>
      </div>
  )
}

export default App;
