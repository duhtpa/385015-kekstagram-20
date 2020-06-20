'use strict';

(function () {
  var scaleValue = document.querySelector('.scale__control--value').value;
  var popupPreview = document.querySelector('.img-upload__preview > img');

  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  scaleValue = SCALE_MAX;

  document.querySelector('.img-upload__scale').addEventListener('click', function (evt) {
    if (evt.target.textContent === 'Уменьшить') {
      if (scaleValue >= SCALE_MIN + SCALE_STEP) {
        scaleValue -= SCALE_STEP;
      }
      setPopupScale();
    } else if (evt.target.textContent === 'Увеличить') {
      if (scaleValue <= SCALE_MAX - SCALE_STEP) {
        scaleValue += SCALE_STEP;
      }
      setPopupScale();
    }
  });

  var setPopupScale = function () {
    popupPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  };
})();
