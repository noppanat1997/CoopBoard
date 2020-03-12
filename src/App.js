import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import CarouselComponent from './components/CarouselComponent.js';
import Header from './components/Header.js';
import StackCard from './components/StackCard.js';

const App = () => {
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  // const store = createStore(reducer, applyMiddleware(logger));
  return (
    <Provider store={store}>
      <div>
        <Header />
        {/* <div className="d-flex justify-content-center">
          <CarouselComponent />
        </div> */}
        <CarouselComponent />
        <div className="d-flex justify-content-end" style={{'zIndex': '2'}}>
          <StackCard />
        </div>
      </div>
    </Provider>
  );
}

export default App;
