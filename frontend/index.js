import React from 'react';
import { render, componentWillUnmount } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

// Creating Redux Store
let store = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}