'use strict';

(function () {
  var scaleValue = document.querySelector('.scale__control--value');
  var scaleCountValue = scaleValue.value;
  var popupPreview = document.querySelector('.img-upload__preview > img');

  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  scaleCountValue = SCALE_MAX;

  var changeScaleValue = function () {
    scaleValue.setAttribute('value', scaleCountValue + '%');
  };

  changeScaleValue();

  document.querySelector('.img-upload__scale').addEventListener('click', function (evt) {
    if (evt.target.textContent === 'Уменьшить') {
      if (scaleCountValue >= SCALE_MIN + SCALE_STEP) {
        scaleCountValue -= SCALE_STEP;
      }
      setPopupScale();
    } else if (evt.target.textContent === 'Увеличить') {
      if (scaleCountValue <= SCALE_MAX - SCALE_STEP) {
        scaleCountValue += SCALE_STEP;
      }
      setPopupScale();
    }

    changeScaleValue();
  });

  var setPopupScale = function () {
    popupPreview.style.transform = 'scale(' + scaleCountValue / 100 + ')';
  };

  window.scalling = {
    scaleCountValue: scaleCountValue,
    changeScaleValue: changeScaleValue
  };
})();
