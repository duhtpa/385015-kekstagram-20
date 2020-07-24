'use strict';

(function () {
  var popup = document.querySelector('.img-upload__overlay');
  var btnOpenPopup = document.querySelector('#upload-file');
  var btnClosePopup = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    document.querySelector('.img-upload__overlay').scrollTop = 0;
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    window.util.sectionBody.classList.add('modal-open');

    document.addEventListener('keydown', onPopupEscPress);
  };

  var barEffectLevel = document.querySelector('.img-upload__effect-level');
  var closePopup = function () {
    window.gallery.resetUploadState();

    popup.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);

    btnOpenPopup.value = '';

    barEffectLevel.classList.add('hidden');

    resetValidation();
  };

  btnOpenPopup.addEventListener('change', function () {
    openPopup();
  });

  btnClosePopup.addEventListener('click', function () {
    document.querySelector('.img-upload__overlay').scrollTop = 0;
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

  var inputHashtag = document.querySelector('.text__hashtags');
  var inputDescription = document.querySelector('.text__description');
  var resetValidation = function () {
    inputHashtag.setCustomValidity('');
    inputHashtag.style.border = '';
    inputDescription.setCustomValidity('');
    inputDescription.style.border = '';
  };

})();
