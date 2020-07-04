'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  window.debounce = function (array, error) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
      window.gallery.loadHandler();
    }

    var message = document.querySelector('.message');
    lastTimeout = window.setTimeout(function () {
      if (message) {
        document.querySelector('body').removeChild(message);
      }
      window.backend.load(array, error);

      lastTimeout = null;
    }, DEBOUNCE_INTERVAL);

  };
})();