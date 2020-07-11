'use strict';

(function () {
  var Url = {
    FROM_LOAD: 'https://javascript.pages.academy/kekstagram/data',
    FROM_SAVE: 'https://javascript.pages.academy/kekstagram'
  };
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var isError = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        var xhrResponse = xhr.response;
        onLoad(xhrResponse);

        document.querySelector('.img-filters').classList.remove('img-filters--inactive');
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = isError(onLoad, onError);
    xhr.open('GET', Url.FROM_LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = isError(onLoad, onError);
    xhr.open('POST', Url.FROM_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
