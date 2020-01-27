const init = win => {
  const EE = {};
  EE.listeners = {};

  EE.on = (event, listener) => {
    if (!EE.listeners[event]) {
      EE.listeners[event] = [];
    }
    EE.listeners[event].push(listener);
  };

  EE.emit = (event, params) => {
    if (EE.listeners[event]) {
      EE.listeners[event].forEach(
        listener => typeof listener === 'function' && listener(params)
      );
    }
  };

  win.RCTFolderEE = EE;
};

export default init;
