import Raven from 'raven-js';
import config from 'config';
import stylesOld from 'sn-front-static/build/styles/folder-app.css';
import stylesNew from 'sn-front-assets/build/styles/folder-app.css';
import rcTrigger from 'sn-front-assets/build/styles/rc-trigger-popup.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setClassMapper } from 'react-bootstrap/lib/utils/StyleConfig';
// import createStateSaver, { createKey, checkKeyWith } from 'sn-front.redux-utils/src/state-saver';
import $s, { regStyles } from 'sn-front.controls/src/class-names-mapping';
import { REDESIGN_SCOPE } from 'sn-front.controls/src/withRedesign';
import { init as gaInit } from 'sn-front.analytics/src/google-analytics';
import { getSameSiteOption } from 'sn-front.api-endpoints/src/cookies';
import cookies from 'browser-cookies';

import App, { init /* persistentState */ } from '../src';
import { /* getToken, */ CLOUD_STORAGE_COOKIE, DEFAULT_LANG } from '../src/app-config';
import { initStore } from '../src/store';
import reducers from '../src/reducers';
import { middlewares } from '../src/middlewares';
// import globalDispatcher from './globalDispatcher';

if (config.sentryConfigUrl) {
  Raven
    .config(
      config.sentryConfigUrl,
      { release: config.buildNumber, environment: `oblivion-${config.env}` }
    )
    .install();
}

gaInit();

// For SNFIller to detect our window object
window.SNReactApp = true;

regStyles(stylesOld);
regStyles(stylesNew, REDESIGN_SCOPE);
regStyles(rcTrigger);
setClassMapper($s);

const appDiv = global.document.getElementById('app');
const loaderDiv = global.document.getElementById('css-start-spinner');

const removeLoader = () => {
  if (loaderDiv) {
    loaderDiv.parentElement.removeChild(loaderDiv);
  }
};

// const STORAGE_KEY_PREFIX = 'folder-app-1';

// const stateSaver = createStateSaver(
//   global.localStorage,
//   createKey(STORAGE_KEY_PREFIX, getToken),
//   persistentState
// );

// stateSaver.clear(checkKeyWith(STORAGE_KEY_PREFIX));

cookies.erase(CLOUD_STORAGE_COOKIE, { samesite: getSameSiteOption(), secure: true });


const initialState = {
  locales: {
    avaliableLocales: [DEFAULT_LANG],
    currentLocale: DEFAULT_LANG,
    defaultLocale: DEFAULT_LANG
  }
};

const store = initStore(reducers, middlewares, initialState);

// stateSaver.listen(store);

if (typeof init === 'function') store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, appDiv, removeLoader
);
