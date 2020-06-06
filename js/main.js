'use strict';

var randomInteger = function (min, max) {
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
var articleTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderArticle = function (article) {
  var articleElement = articleTemplate.cloneNode(true);

  articleElement.querySelector('.picture__img').src = article.url;
  articleElement.querySelector('.picture__comments').textContent = article.comments.length;
  articleElement.querySelector('.picture__likes').textContent = article.likes;

  return articleElement;
};

var getArticle = function (i) {
  var article = {
    url: 'photos/' + i + '.jpg',
    description: 'Описание: №' + i, // это нужно писать в alt???
    likes: randomInteger(15, 200),
    comments: getArticleComments(randomInteger(1, 6))
  };

  return article;
};

var getArticleComments = function (countComments) {
  var arrComments = [];

  for (var i = 0; i < countComments; i++) {
    var comment = {
      avatar: 'img/avatar-' + randomInteger(0, 6) + '.svg',
      message: COMMENTS[randomInteger(0, COMMENTS.length - 1)],
      name: USERS[randomInteger(0, USERS.length - 1)]
    };

    arrComments.push(comment);
  }

  return arrComments;
};

var fragment = document.createDocumentFragment();
for (var i = 1; i <= 25; i++) {
  getArticle(i);
  fragment.appendChild(renderArticle(getArticle(i)));
}

pictures.appendChild(fragment);
