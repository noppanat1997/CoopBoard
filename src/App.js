import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import CarouselComponent from './components/CarouselComponent.js';
import Header from './components/Header.js';
import CardBox from './components/CardBox.js'

import { Container, Col, Row } from 'react-bootstrap';

const App = () => {
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // const store = createStore(reducer, applyMiddleware(logger));
  return (
    <Provider store={store}>
      <Header />
      <div>
        <Row>
          <Col xs={10} className="p-0">
            <CarouselComponent />
          </Col>
          <Col className="p-0">
            <CardBox />
          </Col>
        </Row>
      </div>
    </Provider>
  );
}

export default App;
