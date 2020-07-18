'use strict';

(function () {
  var inputHashtag = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');

  var HASHTAGS_MIN_SYMBOLS_COUNT = 2;
  var HASHTAGS_MAX_SYMBOLS_COUNT = 20;
  var HASHTAGS_MAX_COUNT = 5;
  var DESCRIPTION_MAX_SYMBOLS_COUNT = 140;

  var resetValidity = function (evt) {
    evt.target.setCustomValidity('');
    evt.target.style.border = '';
  };

  inputDescription.addEventListener('input', function (evt) {
    if (inputDescription.value.length > DESCRIPTION_MAX_SYMBOLS_COUNT) {
      evt.target.setCustomValidity('Комментарий не может быть длинее 140 символов');
      setBorderError(evt.target);

      return;
    }

    resetValidity(evt);
  });

  inputHashtag.addEventListener('input', function (evt) {
    var hashtagsArray = evt.target.value.toLowerCase().split(' ').sort();

    for (var i = 0; i < hashtagsArray.length; i++) {
      var hashtag = hashtagsArray[i];

      if (inputHashtag .value < 1) {
        resetValidity(evt);

        return;
      }

      if (hashtag.indexOf('#', 0) !== 0) {
        evt.target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
        setBorderError(evt.target);

        return;
      }

      if (hashtag.length < HASHTAGS_MIN_SYMBOLS_COUNT) {
        evt.target.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        setBorderError(evt.target);

        return;
      }

      if (hashtag.length > HASHTAGS_MAX_SYMBOLS_COUNT) {
        evt.target.setCustomValidity('Хэш-тег не может быть длинее 20 символов');
        setBorderError(evt.target);

        return;
      }

      if (findDuplicateElements(hashtagsArray) === true) {
        evt.target.setCustomValidity('Один хештег не может быть использован дважды');
        setBorderError(evt.target);

        return;
      }

      if (hashtagsArray.length > HASHTAGS_MAX_COUNT) {
        evt.target.setCustomValidity('Вы ввели более 5 хэш-тегов!');
        setBorderError(evt.target);

        return;
      }

      if (!hashtag.match(/^([#])([0-9a-zA-Zа-яёА-ЯЁ]{1,19})$/g)) {
        evt.target.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
        setBorderError(evt.target);

        return;
      }

      resetValidity(evt);
    }
  });

  var setBorderError = function (element) {
    element.style.border = '3px dashed red';
  };

  var findDuplicateElements = function (hashtagsArray) {
    var findDublicate = false;
    for (var i = 0; i < hashtagsArray.length - 1; i++) {
      if (hashtagsArray[i] === hashtagsArray[++i]) {
        findDublicate = true;
      } else {
        findDublicate = false;
      }
    }

    return findDublicate;
  };
})();
