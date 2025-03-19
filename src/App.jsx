import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

function App() {
  return (
    <BrowserRouter basename="/Melody"> 
      <div className='container-fluid vw-100 vh-100' >
        <Row>
          <Col style={{ flex: "0.25", padding: "0" }}>
            <Sidebar />
          </Col>
          <Col  style={{padding: "0" }}>
            <Page />
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;

