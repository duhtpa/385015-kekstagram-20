'use strict';

// использование фрагментов
// var firstPool = document.querySelector('.pool');
// var fragment = document.createDocumentFragment();

// for (var i = 0; i < 6; i++) {
//   var newElement = document.createElement('div');
//   newElement.className = 'el';
//   newElement.innerHTML = '<span>' + i + '</span>';

//   fragment.appendChild(newElement);
// }

// firstPool.appendChild(fragment);
var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// var arrArticle = [
//   {
//     url: 'photos/' + i + '.jpg',
//     description: 'Описание: №' + i, // здесь нужно ловить alt???
//     likes: randomInteger(15, 200),
//     // comments: arrComments[randomInteger(0, 5)]
//     comments: randomInteger(0, 5)
//   }
// ];

// var arrComments = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];

var pictures = document.querySelector('.pictures');
var articleTemplate = document.querySelector('#picture');
var fragment = document.createDocumentFragment();
for (var i = 1; i <= 25; i++) {
  var arrArticle = [
    {
      url: 'photos/' + i + '.jpg',
      description: 'Описание: №' + i, // здесь нужно ловить alt???
      likes: randomInteger(15, 200),
      // comments: arrComments[randomInteger(0, 5)]
      comments: randomInteger(0, 5)
    }
  ];

  fragment.appendChild(renderArticle(arrArticle));
}

var renderArticle = function (article) {
  var articleElement = articleTemplate.cloneNode(true);

  // articleElement.querySelector('.picture__img').src = article.url;
  articleElement.querySelector('.picture__comments').textContent = article.comments;
  articleElement.querySelector('.picture__likes').textContent = article.likes;

  return articleElement;
};

pictures.appendChild(fragment);
