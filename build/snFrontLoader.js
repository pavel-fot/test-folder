import routes from 'sn-front-webpack-config/routes';
import { getToken } from 'sn-front.api-endpoints/src/api';
import { curry } from 'sn-front.redux-utils/src/funcs';
import { getSigningSessionLocale } from '../src/snfiller/language';
import { afterLogoutMountPath } from '../src/app-config';
import { ensureIsolatedMode } from '../src/thunks/loadUser';
import { connectToApi, ssBoostRoute, getLangBySSBoost } from '../src/bootstrap';
import { idle } from '../src/idle';
import { buildSNFillerSrc, parseLocation } from '../src/snfiller/helpers';


// For SNFIller to detect our window object
window.SNReactApp = true;

const IFRAME_STYLE = 'position: absolute; top: 0; z-index: 1120; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border-width: 0';
const DOCUMENT_ID = global.__documentId;
const BUNDLES = global.__bundles;
const snfillerHandlers = [
  'openProfile',
  'goAuthenticatedFolder',
  'logs',
  'goHome',
  'logout',
  'showModal',
  'showSubscriptionModal',
  'closeModal',
  'waitForLoad',
  'refreshIframe',
];

const snfillerCallbacks = [
  'leaved',
  'saved',
];

const processAuth = ensureIsolatedMode({ params: {} });

const createTag = (tagName, attrs) => {
  const tag = document.createElement(tagName);
  Object.entries(attrs).forEach(([attr, value]) => tag.setAttribute(attr, value));

  return tag;
};

const loadScript = ({ js, meta }) => new Promise(resolve => {
  const type = 'text/javascript';
  const script = createTag('script', { src: js, meta, type });
  script.addEventListener('load', () => resolve());
  document.body.appendChild(script);
});

const preloadBundles = bundles => bundles.forEach(
  ({ js }) => {
    const rel = 'preload';
    const href = js;
    const link = createTag('link', { rel, href, as: 'script' });
    document.head.appendChild(link);
  }
);

const runBundles = bundles => bundles.reduce(
  (promise, bundle) => promise.then(() => loadScript(bundle)), Promise.resolve()
);

const loadScripts = (...bundles) => {
  preloadBundles(bundles);
  runBundles(bundles);
};

// const runAfter = (fn, sec) => {
//   console.log('[Folder App]', `${sec} seconds remained`);
//   let remained = sec;
//   setTimeout(() => {
//     remained -= 1;
//     if (remained) { return runAfter(fn, sec - 1); }
//     fn();
//   }, 1000);
// };

const loadStyles = (...bundles) => bundles.forEach(({ css = [] }) => {
  const rel = 'stylesheet';

  css.forEach(href => {
    const style = createTag('link', { href, rel });
    document.head.appendChild(style);
  });
});

const loadFolderApp = () => {
  const bundles = Object.values(BUNDLES);
  loadStyles(...bundles);
  loadScripts(...bundles);
};

const promisifyHandlers = handlersNames => handlersNames.reduce(
  (acc, handlerName) => ({
    ...acc, [handlerName]: idle(handlerName)
  }), {}
);

// ss-boost kostyl for language backward compatibility
// TODO: remove this after SS Boost exp winning
const getLangBySSBoostBranch = curry(getLangBySSBoost)('ss-boost');

const loadEditor = () => {
  const iframeContainer = document.querySelector('#snfiller');
  const preferredLang = getSigningSessionLocale();
  const fallbackUrl = encodeURIComponent(`${afterLogoutMountPath}/${routes.login}`);

  const snfillerState = {
    documentId: DOCUMENT_ID,
    location: parseLocation(global.location),
    lang: getLangBySSBoostBranch('en', preferredLang),
    preferredLang,
    snfillerMode: ssBoostRoute
  };

  const pathToSNFiller = buildSNFillerSrc(snfillerState, { isDirect: true });

  const editorUrl = `${pathToSNFiller}&fallbackUrl=${fallbackUrl}`;
  const iframe = createTag('iframe', {
    style: IFRAME_STYLE,
    src: editorUrl,
  });

  iframe.addEventListener('load', e => {
    const snfiller = e.target.contentWindow.SNFiller;
    const handlers = promisifyHandlers(snfillerHandlers);
    const callbacks = promisifyHandlers(snfillerCallbacks);

    callbacks.opened = () => {
      // runAfter(() => loadFolderApp(), 10);
      loadFolderApp();
    };

    snfiller.ready(() => {
      snfiller.openEmbedded(
        'FolderApp',
        getToken(),
        { documentId: DOCUMENT_ID },
        handlers, callbacks
      );
    });
  });

  processAuth()
    .then(() => iframeContainer.appendChild(iframe));
};

const checkIsEditorPage = () => (
  !!routes.editorRoutes
    .filter(route => global.location.pathname.includes(`/${route}/`))
    .length
);

const detectPage = () => {
  connectToApi();

  if (checkIsEditorPage()) {
    loadEditor();
  } else {
    loadFolderApp();
  }
};

detectPage();

Object.assign(global, { loadScripts });
