'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var Url = {
    FROM_LOAD: 'https://javascript.pages.academy/kekstagram/data',
    FROM_SAVE: 'https://javascript.pages.academy/kekstagram'
  };
  var StatusCode = {
    OK: 200
  };
  var sectionMain = document.querySelector('main');
  var imgFilters = document.querySelector('.img-filters');

  var isError = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        var xhrResponse = xhr.response;
        onLoad(xhrResponse);

        imgFilters.classList.remove('img-filters--inactive');

        removeloadingProcessMessage();
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
      removeloadingProcessMessage();
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' секунд. Возможно сервер не доступен...');
      sectionMain.removeChild(sectionMain.querySelector('.img-upload__message--loading'));
    });

    var removeloadingProcessMessage = function () {
      var loadingProcessMessage = sectionMain.querySelector('.img-upload__message--loading');
      if (loadingProcessMessage) {
        sectionMain.removeChild(loadingProcessMessage);
      }
    };

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
