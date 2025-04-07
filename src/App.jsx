import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Header from './components/Header'
import Player from './components/Player'
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';


function App() {
  
  return (
    <BrowserRouter basename="/Melody"> 
    <MusicPlayerProvider>
      <div className='container-fluid vh-100' >
        <Row>
          <Col style={{ flex: "0.25", padding: "0" }}>
            <Sidebar />
          </Col>
          <Col  style={{padding: "0"}}>
            <Header />
            <Page />
          </Col>
        </Row>
      </div>
      <Player></Player>
      </MusicPlayerProvider>
    </BrowserRouter>
  );
}
export default App;

