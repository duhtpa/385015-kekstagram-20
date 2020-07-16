'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getPhotoElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var successHandler = function (photosArray) {
    var fragment = document.createDocumentFragment();

    photosArray.forEach(function (it) {
      fragment.appendChild(getPhotoElement(it));
    });

    pictures.appendChild(fragment);

    var xhrPhotos = photosArray;

    pictures.addEventListener('click', function (evt) {
      if (evt.target.classList.value === 'picture__img') {
        var srcPicture = evt.target.src;
        getTargetElement(srcPicture, xhrPhotos);

        var bigPictureOverlay = document.querySelector('.big-picture');
        bigPictureOverlay.scrollTop = 0;
      }
    });

    pictures.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        if (evt.target.classList.value === 'picture') {
          evt.preventDefault();
          var srcPicture = evt.target.querySelector('img').src;
          getTargetElement(srcPicture, xhrPhotos);
        }
      }
    });
  };

  var getTargetElement = function (srcPicture, xhrPhotos) {
    srcPicture = srcPicture.slice(srcPicture.indexOf('photo'));
    xhrPhotos.forEach(function (it) {
      if (it.url === srcPicture) {
        window.picture.renderPhotoBig(it);
      }
    });
  };

  var errorHandler = function (errorMessage) {
    var message = errorMessage;
    showMessage(message, 'red');
  };

  var loadHandler = function () {
    var message = 'Идёт загрузка данных! Не нужно жмякать 100500 раз по фильтру!';
    showMessage(message, 'green');
  };

  var showMessage = function (message, evtColor) {
    var node = document.createElement('div');
    node.classList.add('message');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: ' + evtColor;
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.height = '30px';
    node.style.paddingTop = '4px';
    node.style.textTransform = 'initial';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var formFilters = document.querySelector('.img-filters__form');
  formFilters.addEventListener('click', function (evt) {
    removePictures();
    checkMultiMessage();

    var Filter = {
      DICUSSED: 'filter-discussed',
      DEFAULT: 'filter-default',
      RANDOM: 'filter-random'
    };

    var filterArray = [];

    switch (evt.target.id) {
      case Filter.DICUSSED:
        filterArray = sortArray;
        break;
      case Filter.DEFAULT:
        filterArray = successHandler;
        break;
      case Filter.RANDOM:
        filterArray = randomArray;
        break;
    }

    window.debounce(filterArray, errorHandler);

    var filters = document.querySelectorAll('.img-filters__button');
    filters.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');
  });

  var checkMultiMessage = function () {
    var messagePopup = document.querySelector('.message');
    if (messagePopup) {
      document.querySelector('body').removeChild(messagePopup);
    }
  };

  var sortArray = function (photosArray) {
    var namesComparator = function (left, right) {
      if (left > right) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    };

    photosArray.sort(function (left, right) {
      var rankDiff = right.comments.length - left.comments.length;
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    });

    successHandler(photosArray);
  };

  var randomArray = function (photosArray) {
    var ARRAY_RANDOM_LENGTH = 10;

    var getRandomElement = function (array) {
      var randomElementIndex = Math.floor(Math.random() * array.length);
      return randomElementIndex;
    };

    var arrRandomelements = [];

    for (var i = 0; i < ARRAY_RANDOM_LENGTH; i++) {
      var indexRandom = getRandomElement(photosArray);
      var elementRandom = photosArray.splice(indexRandom, 1);

      arrRandomelements.push(elementRandom[0]);
    }

    successHandler(arrRandomelements);
  };

  var removePictures = function () {
    var picturesByDel = document.querySelectorAll('.picture');

    picturesByDel.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  window.gallery = {
    loadHandler: loadHandler
  };
})();
