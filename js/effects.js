'use strict';

(function () {
  var LevelSlider = {
    DEFAULT: 20,
    MAX: 453,
    MIN: 0
  };

  var ConvertLevelSlider = {
    BLUR: 10,
    BRIGHTNESS: 2,
    PERCENT: 100
  };

  var DEFAULT_POSITION_SLIDER = '90.6px';

  var effects = document.querySelectorAll('.effects__radio');
  var popupPreview = document.querySelector('.img-upload__preview > img');
  var barEffectLevel = document.querySelector('.img-upload__effect-level');
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderLevel = sliderLine.querySelector('.effect-level__depth');
  var sliderCountValue = document.querySelector('.effect-level__value').value;
  var sliderControl = document.querySelector('.effect-level__pin');

  var changeEffect = function (evt) {
    popupPreview.classList = '';

    if (evt.target.value === 'none') {
      popupPreview.classList = '';
      barEffectLevel.classList.add('hidden');
      popupPreview.style = '';
    } else {
      popupPreview.classList.add('effects__preview--' + evt.target.value);
      barEffectLevel.classList.remove('hidden');

      sliderControl.style.left = DEFAULT_POSITION_SLIDER;
      sliderLevel.style.width = DEFAULT_POSITION_SLIDER;

      changeLevelEffect(LevelSlider.DEFAULT);
    }
  };

  var listenChangeEffect = function () {
    barEffectLevel.classList.add('hidden');

    effects.forEach(function (it) {
      it.addEventListener('click', changeEffect);
    });
  };

  sliderControl.addEventListener('mousedown', function (evt) {
    window.move.onMouseDown(evt);
  });

  listenChangeEffect();

  var changeLevelSlider = function (shift) {
    if (sliderControl.offsetLeft >= LevelSlider.MIN && sliderControl.offsetLeft <= LevelSlider.MAX) {
      sliderControl.style.left = (sliderControl.offsetLeft - shift.x) + 'px';
      sliderLevel.style.width = sliderLine - (sliderLine / sliderControl.offsetLeft);
    } else if (sliderControl.offsetLeft < LevelSlider.MIN) {
      sliderControl.style.left = LevelSlider.MIN + 'px';
    } else if (sliderControl.offsetLeft > LevelSlider.MAX) {
      sliderControl.style.left = LevelSlider.MAX + 'px';
    }

    sliderLevel.style.width = sliderControl.style.left;

    sliderCountValue = Math.round(sliderControl.offsetLeft / LevelSlider.MAX * ConvertLevelSlider.PERCENT);

    changeLevelEffect(sliderCountValue);
  };

  var changeLevelEffect = function (count) {
    switch (popupPreview.classList.value) {
      case 'effects__preview--chrome':
        popupPreview.style.filter = 'grayscale(' + count + '%)';
        break;
      case 'effects__preview--sepia':
        popupPreview.style.filter = 'sepia(' + count + '%)';
        break;
      case 'effects__preview--marvin':
        popupPreview.style.filter = 'invert(' + count + '%)';
        break;
      case 'effects__preview--phobos':
        popupPreview.style.filter = 'blur(' + (count / ConvertLevelSlider.BLUR) + 'px)';
        break;
      case 'effects__preview--heat':
        popupPreview.style.filter = 'brightness(' + (count * ConvertLevelSlider.BRIGHTNESS) + '%)';
        break;
    }
  };

  window.effects = {
    changeLevelSlider: changeLevelSlider
  };
})();
