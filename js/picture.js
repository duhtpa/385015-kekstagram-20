'use strict';

(function () {

  window.picture = {
    renderPhotoBig: function (photo) {
      photoBig.querySelector('.big-picture__img > img').src = photo.url;
      photoBig.querySelector('.likes-count').textContent = photo.likes;
      photoBig.querySelector('.comments-count').textContent = photo.comments.length;
      photoBig.querySelector('.social__caption').textContent = photo.description;

      renderComments(photo);

      photoBig.classList.remove('hidden');

      photoBigClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', closePopupEscPress);
    }
  };

  var closePopup = function () {
    photoBig.classList.add('hidden');
    photoBigClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopupEscPress);
  };

  var closePopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var photoBig = document.querySelector('.big-picture');
  var photoBigClose = photoBig.querySelector('.big-picture__cancel');

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
    for (var i = 0; i < photoArrayElement.comments.length; i++) {
      var commentData = photoArrayElement.comments[i];
      var commentMarkup = '<li class="social__comment"><img class="social__picture" src="' + commentData.avatar + '" alt="' + commentData.name + '" width="35" height="35"> <p class="social__text">' + commentData.message + '</p></li>';
      photoBigComments.insertAdjacentHTML('beforeend', commentMarkup);
    }
  };

  photoBig.querySelector('.social__comment-count').classList.add('hidden');
  photoBig.querySelector('.comments-loader').classList.add('hidden');
})();
