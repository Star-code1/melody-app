import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Row,Col} from 'react-bootstrap'
import Sidebar from './components/Sidebar';
import Page from './components/Page';


function App() {
  return (
    <>
      <div className='bg-black container-fluid p-3'>
        <Row>
          <Col md={2}>
            <Sidebar></Sidebar>
          </Col>
          <Col>
            <Page></Page>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default App
