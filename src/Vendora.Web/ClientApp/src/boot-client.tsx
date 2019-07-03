import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';
import App from './App';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// prepare store
const history = createBrowserHistory();
const store = SinkFactory.createStore({
  preloadedState: { ...preloadedState },
  devtoolOptions: { devToolCompose: composeWithDevTools }
});

// setup location change event
history.listen((location) => store.dispatch({ type: 'LOCATION_CHANGE', payload: location }));

// fire location event when there is no initial state
if (!preloadedState) {
  store.dispatch({ type: 'LOCATION_CHANGE', payload: history.location });
}

// hot app module
const HotApp = hot(module)(() => <App />);

// initialize default state with requests, then render dom
ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <HotApp />
    </Router>
  </Provider>,
  document.getElementById('root')
);
