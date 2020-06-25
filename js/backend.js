'use strict';

(function () {
  var isError = function (xhr, onLoad, onError) {
    var StatusCode = {
      OK: 200
    };
    var TIMEOUT_IN_MS = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

  };

  window.backend = {
    dataLoad: [],
    load: function (onLoad, onError) {
      var URL = 'https://javascript.pages.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      isError(xhr, onLoad, onError);

      xhr.open('GET', URL);
      xhr.send();

      window.backend.dataLoad = xhr;
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://javascript.pages.academy/kekstagram';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      isError(xhr, onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },
  };

})();
