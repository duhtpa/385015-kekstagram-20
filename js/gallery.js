'use strict';

(function () {
  var PHOTO_COUNT = 25;

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var USERS = [
    'Алексей Нефёдов',
    'Михайл Остров',
    'Посетитель',
    'Алёна Павлова',
    'Рустам Айдахов'
  ];

  var pictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getPhotoElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var getPhotoComments = function (countComments) {
    var arrComments = [];
    for (var i = 0; i < countComments; i++) {
      arrComments.push({
        avatar: 'img/avatar-' + window.util.getRandomInteger(1, 5) + '.svg',
        message: COMMENTS[window.util.getRandomInteger(0, COMMENTS.length - 1)],
        name: USERS[window.util.getRandomInteger(0, USERS.length - 1)]
      });
    }
    return arrComments;
  };

  var getPhotosArray = function (count) {
    var photoArray = [];
    for (var i = 0; i <= count - 1; i++) {
      photoArray.push({
        url: 'photos/' + parseInt(i + 1, 10) + '.jpg',
        description: 'Описание: №' + parseInt(i + 1, 10),
        likes: window.util.getRandomInteger(15, 200),
        comments: getPhotoComments(window.util.getRandomInteger(0, 6))
      });
    }
    return photoArray;
  };

  var photos = getPhotosArray(PHOTO_COUNT);

  var renderFragment = function (photosArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length - 1; i++) {
      fragment.appendChild(getPhotoElement(photosArray[i]));
    }
    pictures.appendChild(fragment);
  };

  renderFragment(photos);

  window.gallery = {
    photos: photos
  };
})();
