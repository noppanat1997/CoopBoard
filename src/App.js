import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import BoardPage from './pages/BoardPage.js';
import RegisterPages from './pages/RegisterPage.js';

const App = () => {
  // const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const store = createStore(reducer, applyMiddleware(logger));
  // const store = createStore(reducer);
  return (
    <Provider store={store}>
      <div style={{width: '100%', height: '100%'}}>
        {/* <RegisterPages /> */}
        <BoardPage />
      </div>
    </Provider>
  );
}

export default App;
