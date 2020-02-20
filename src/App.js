import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import CarouselComponent from './components/CarouselComponent.js';
import Header from './components/Header.js';
import CardBox from './components/CardBox.js';

const App = () => {
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // const store = createStore(reducer, applyMiddleware(logger));
  return (
    <Provider store={store}>
      <Header />
      <div className="mt-3 d-flex justify-content-center">
        <CarouselComponent />
      </div>
      <div className="d-flex justify-content-end" style={{'zIndex':'2'}}>
        <CardBox />
      </div>
    </Provider>
  );
}

export default App;
