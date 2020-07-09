'use strict';

(function () {
  window.util = {
    getRandomInteger: function (min, max) {
      var rand = min + Math.random() * (max - min + 1);
      return Math.round(rand);
    },

    isKeyBoardEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    }
  };
})();
