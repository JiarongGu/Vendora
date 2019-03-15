import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureSinkStore, applyRetriggerAction } from 'redux-sink';
import { Routes } from './Routes';
import { constants } from '@constants';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();
const store = configureSinkStore({ preloadedState, devTool: true });

// setup location change event
history.listen((location) => {
  store.dispatch({
    type: constants.actions.locationChange,
    payload: location
  });
});
applyRetriggerAction(constants.actions.locationChange, history.location);

// fire location event when there is no inital state
if (!preloadedState)
  store.dispatch({ type: constants.actions.locationChange, payload: history.location });

// hot app module
export const App = hot(module)(() => (
  <Routes />
));

// initalize default state with requests, then render dom
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);