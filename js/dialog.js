'use strict';

(function () {
  var popup = document.querySelector('.img-upload__overlay');
  var btnOpenPopup = document.querySelector('#upload-file');
  var btnClosePopup = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onPopupEscPress);

    btnOpenPopup.value = '';
  };

  btnOpenPopup.addEventListener('change', function () {
    openPopup();
  });

  btnClosePopup.addEventListener('click', function () {
    closePopup();
  });

  var inputHashtag = document.querySelector('.text__hashtags');

  inputHashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  inputHashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
})();
