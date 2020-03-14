import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import CarouselComponent from './components/CarouselComponent.js';
import Header from './components/Header.js';
import StackCard from './components/StackCard.js';
import ToolBox from './components/ToolBox.js';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const App = () => {
  // const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const store = createStore(reducer, applyMiddleware(logger));
  return (
    <Provider store={store}>
      <div>
        <Header />
        <ToolBox />
        {/* <Container className="m-0 p-0 w-100" style={{ "max-width": "100%", "width": "100%" }}>
          <Row className="justify-content-center m-0 w-100">
            <Col xs={1} className="p-0">
              <ToolBox />
            </Col>
            <Col xs={10} className="text-center p-0">
              <CarouselComponent />
            </Col>
            <Col xs={1} className="p-0">
              <StackCard />
            </Col>
          </Row>
        </Container> */}
      </div>
    </Provider>
  );
}

export default App;
