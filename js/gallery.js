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
    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(getPhotoElement(photosArray[i]));
    }
    pictures.appendChild(fragment);

    var xhrPhotos = photosArray;

    window.picture.renderPhotoBig(xhrPhotos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.height = '30px';
    node.style.paddingTop = '4px';
    node.style.textTransform = 'initial';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // ФИЛЬТР "ОБСУЖДАЕМЫЕ"
  var elementMostDiscussed = document.querySelector('#filter-discussed');
  elementMostDiscussed.addEventListener('click', function () {
    window.backend.load(sortArray, errorHandler);

    var filters = document.querySelectorAll('.img-filters__button');
    filters.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    elementMostDiscussed.classList.add('img-filters__button--active');
  });
  // ФИЛЬТР "ПО УМОЛЧАНИЮ"
  var elementFilterDefault = document.querySelector('#filter-default');
  elementFilterDefault.addEventListener('click', function () {
    removePictures();
    window.backend.load(successHandler, errorHandler);

    var filters = document.querySelectorAll('.img-filters__button');
    filters.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    elementFilterDefault.classList.add('img-filters__button--active');
  });
  // ФИЛЬТР "СЛУЧАЙНЫЕ"
  var elementFilterRandom = document.querySelector('#filter-random');
  elementFilterRandom.addEventListener('click', function () {
    window.backend.load(randomArray, errorHandler);
    var filters = document.querySelectorAll('.img-filters__button');
    filters.forEach(function (it) {
      it.classList.remove('img-filters__button--active');
    });

    elementFilterRandom.classList.add('img-filters__button--active');
  });

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

    removePictures();
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

    removePictures();
    successHandler(arrRandomelements);
  };

  var removePictures = function () {
    var picturesByDel = document.querySelectorAll('.picture');

    for (var i = 0; i < picturesByDel.length; i++) {
      console.log(picturesByDel[i]);
      pictures.removeChild(picturesByDel[i]);
    }
  };
})();
