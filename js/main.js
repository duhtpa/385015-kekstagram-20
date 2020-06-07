'use strict';

var PHOTO_COUNT = 25;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
};

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

var getPhoto = function (i) {
  var photo = {
    url: 'photos/' + i + '.jpg',
    description: 'Описание: №' + i, // это нужно писать в alt???
    likes: getRandomInteger(15, 200),
    comments: getPhotoComments(getRandomInteger(1, 6))
  };

  return photo;
};

var getPhotoComments = function (countComments) {
  var arrComments = [];

  for (var i = 0; i < countComments; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInteger(0, 6) + '.svg',
      message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
      name: USERS[getRandomInteger(0, USERS.length - 1)]
    };

    arrComments.push(comment);
  }

  return arrComments;
};

var fragment = document.createDocumentFragment();

var renderPhotos = function (count) {
  for (var i = 1; i <= count; i++) {
    getPhoto(i);
    fragment.appendChild(getPhotoElement(getPhoto(i)));
  }

  pictures.appendChild(fragment);
};

renderPhotos(PHOTO_COUNT);
