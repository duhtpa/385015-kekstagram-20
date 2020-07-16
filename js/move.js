'use strict';
(function () {
  var sliderLine = document.querySelector('.effect-level__line');
  var sliderControl = sliderLine.querySelector('.effect-level__pin');

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var dragged = false;
    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      window.effects.changeLevelSlider(shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          sliderControl.removeEventListener('click', onClickPreventDefault);
        };
        sliderControl.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    onMouseDown: onMouseDown
  };
})();
