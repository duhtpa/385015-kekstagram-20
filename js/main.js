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

var getPhotoComments = function (countComments) {
  var arrComments = [];
  for (var i = 0; i < countComments; i++) {
    arrComments.push({
      avatar: 'img/avatar-' + getRandomInteger(1, 5) + '.svg',
      message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
      name: USERS[getRandomInteger(0, USERS.length - 1)]
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
      likes: getRandomInteger(15, 200),
      comments: getPhotoComments(getRandomInteger(0, 6))
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

// document.querySelector('body').classList.add('modal-open');

var photoBig = document.querySelector('.big-picture');
// photoBig.classList.remove('hidden');

var renderPhotoBig = function (photo) {
  photoBig.querySelector('.big-picture__img > img').src = photo.url;
  photoBig.querySelector('.likes-count').textContent = photo.likes;
  photoBig.querySelector('.comments-count').textContent = photo.comments.length;
  photoBig.querySelector('.social__caption').textContent = photo.description;

  renderComments(photo);
};

var renderComments = function (photoArrayElement) {
  var photoBigComments = photoBig.querySelector('.social__comments');

  removeDefaultComments(photoBigComments);
  addCommentsFromPicture(photoBigComments, photoArrayElement);
};

var removeDefaultComments = function (photoBigComments) {
  var photoBigCommentsElements = photoBigComments.children;

  for (var i = photoBigCommentsElements.length - 1; i >= 0; i--) {
    photoBigComments.removeChild(photoBigCommentsElements[i]);
  }
};

var addCommentsFromPicture = function (photoBigComments, photoArrayElement) {
  for (var j = 0; j < photoArrayElement.comments.length; j++) {
    var commentData = photoArrayElement.comments[j];
    var commentMarkup = '<li class="social__comment"><img class="social__picture" src="' + commentData.avatar + '" alt="' + commentData.name + '" width="35" height="35"> <p class="social__text">' + commentData.message + '</p></li>';
    photoBigComments.insertAdjacentHTML('beforeend', commentMarkup);
  }
};

photoBig.querySelector('.social__comment-count').classList.add('hidden');
photoBig.querySelector('.comments-loader').classList.add('hidden');

renderPhotoBig(photos[0]);

var popup = document.querySelector('.img-upload__overlay');
var btnOpenPopup = document.querySelector('#upload-file');
var btnClosePopup = document.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  popup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  popup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);

  btnOpenPopup.value = '';
};

btnOpenPopup.addEventListener('change', function () {
  openPopup();
});

btnClosePopup.addEventListener('click', function () {
  closePopup();
});

var effects = document.querySelectorAll('.effects__radio');
var popupPreview = document.querySelector('.img-upload__preview > img');
var effectLevel = document.querySelector('.effect-level__value');

var changeEffect = function (evt) {
  popupPreview.classList = '';

  if (evt.target.value === 'none') {
    popupPreview.classList = '';
  } else {
    popupPreview.classList.add('effects__preview--' + evt.target.value);
  }

  effectLevel.value = 100;
};

for (var i = 0; i < effects.length; i++) {
  effects[i].addEventListener('click', changeEffect);
}

var sliderControl = document.querySelector('.effect-level__pin');
sliderControl.addEventListener('mouseup', function () {
  effectLevel.value = 20; // здесь будет расчёт уровня эффекта
});

var btnScaleSmaller = document.querySelector('.scale__control--smaller');
var btnScaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value').value;

scaleValue = 100;

btnScaleSmaller.addEventListener('click', function () {
  if (scaleValue >= 50) {
    scaleValue -= 25;
  }
  setPopupScale();
});

btnScaleBigger.addEventListener('click', function () {
  if (scaleValue <= 75) {
    scaleValue += 25;
  }
  setPopupScale();
});

var setPopupScale = function () {
  popupPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
};
