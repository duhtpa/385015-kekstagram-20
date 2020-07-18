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
    window.gallery.resetUploadState();

    popup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);

    btnOpenPopup.value = '';

    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  };

  btnOpenPopup.addEventListener('change', function () {
    openPopup();
  });

  btnClosePopup.addEventListener('click', function () {
    closePopup();
  });

  // на случай если захотим ещё добавить текстовых полей (автор, дата, прочее)
  var inputsUpload = document.querySelectorAll('.img-upload__text > input, .img-upload__text > textarea');

  inputsUpload.forEach(function (it) {
    it.addEventListener('focus', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });

    it.addEventListener('blur', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });
  });

})();
