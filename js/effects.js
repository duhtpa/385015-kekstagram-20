'use strict';

(function () {
  var effects = document.querySelectorAll('.effects__radio');
  var popupPreview = document.querySelector('.img-upload__preview > img');
  var effectLevel = document.querySelector('.effect-level__value');
  var barEffectLevel = document.querySelector('.img-upload__effect-level');

  var changeEffect = function (evt) {
    popupPreview.classList = '';

    if (evt.target.value === 'none') {
      popupPreview.classList = '';
      barEffectLevel.classList.add('hidden');
    } else {
      popupPreview.classList.add('effects__preview--' + evt.target.value);
      barEffectLevel.classList.remove('hidden');
    }

    effectLevel.value = 100;
  };

  var listenChangeEffect = function () {
    barEffectLevel.classList.add('hidden');
    for (var i = 0; i < effects.length; i++) {
      effects[i].addEventListener('click', changeEffect);
    }
  };

  var sliderControl = document.querySelector('.effect-level__pin');
  sliderControl.addEventListener('mouseup', function () {
    effectLevel.value = 20; // здесь будет расчёт уровня эффекта
  });

  listenChangeEffect();
})();
