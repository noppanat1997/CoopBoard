import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise-middleware';
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
const middlewareList = [ReduxThunk, ReduxPromise, logger]
const store = createStore(reducer, applyMiddleware(...middlewareList));

const App = () => (
    <Provider store={store}>
      <div style={{ width: '100%', height: '100%' }}>
        <Router history={history}>
          <Switch>
            <Route
              path="/list/:board/:page"
              component={BoardPage}
            />
            <Route
              path="/list"
              component={BoardList}
            />
            <Route
              path="/register"
              component={RegisterPages}
            />
            <Route
              path="/login"
              component={LoginPage}
            />
            <Route
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
