import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import RegisterPages from './pages/RegisterPage.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header.js';
import BoardPage from './pages/BoardPage.js';
import BoardList from './pages/BoardList.js';


const App = () => {
  // const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const store = createStore(reducer, applyMiddleware(logger));
  // const store = createStore(reducer);
  return (
    <Provider store={store}>
      <div style={{ width: '100%', height: '100%' }}>

        <BrowserRouter>
          <Header />
          <Switch>
            <Route
              exact
              path="/list/:id"
              component={BoardPage}
            />
            <Route
              exact
              path="/list"
              component={BoardList}
            />
            <Route
              exact
              path="/register"
              component={RegisterPages}
            />
            <Route
              exact
              path="/"
              component={RegisterPages}
            />
          </Switch>



          {/* <Route component={PageNotFound} /> */}
        </BrowserRouter>
      </div>
    </Provider>

  );
}


export default App;
