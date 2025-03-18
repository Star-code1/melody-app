import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Page from './components/Page';

function App() {
  return (
    <BrowserRouter basename="/Melody"> 
      <div className='bg-black container-fluid vw-100 vh-100'>
        <Row>
          <Col style={{ flex: "0.25" }}>
            <Sidebar />
          </Col>
          <Col>
            <Page />
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  );
}

export default App;
