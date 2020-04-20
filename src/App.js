import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPages from './pages/RegisterPage.js';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header.js';
import BoardPage from './pages/BoardPage.js';
import BoardList from './pages/BoardList.js';
import history from './history'

const middlewareList = [logger, thunk]
const store = createStore(reducer, applyMiddleware(...middlewareList));

const App = () => (
    <Provider store={store}>
      <div style={{ width: '100%', height: '100%' }}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/list/:board/:page"
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
              path="/login"
              component={LoginPage}
            />
            <Route
              exact
              path="/"
              component={LoginPage}
            />
          </Switch>
          {/* <Route component={PageNotFound} /> */}
        </Router>
      </div>
    </Provider>
);


export default App;
