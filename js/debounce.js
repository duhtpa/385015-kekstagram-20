'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (data, error) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      window.gallery.loadHandler();
    }

    var message = document.querySelector('.message');
    lastTimeout = window.setTimeout(function () {
      if (message) {
        window.util.sectionBody.removeChild(message);
      }
      window.backend.load(data, error);

      lastTimeout = null;
    }, DEBOUNCE_INTERVAL);

  };
})();
