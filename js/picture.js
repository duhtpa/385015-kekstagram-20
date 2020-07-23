'use strict';

(function () {
  var COUNTER_STEP = 5;
  var btnMoreComments = document.querySelector('.social__comments-loader');
  var photoBig = document.querySelector('.big-picture');
  var photoBigClose = photoBig.querySelector('.big-picture__cancel');

  window.picture = {
    renderPhotoBig: function (photo) {
      photoBig.querySelector('.big-picture__img > img').src = photo.url;
      photoBig.querySelector('.likes-count').textContent = photo.likes;
      photoBig.querySelector('.comments-count').textContent = photo.comments.length;
      photoBig.querySelector('.social__caption').textContent = photo.description;

      btnMoreComments.removeEventListener('click', renderMoreComments);
      btnMoreComments.removeEventListener('keydown', renderMoreCommentsByEnter);

      var closePopup = function () {
        photoBig.classList.add('hidden');
        photoBigClose.removeEventListener('click', closePopup);
        document.removeEventListener('keydown', closePopupEscPress);
        btnMoreComments.removeEventListener('click', renderMoreComments);
        btnMoreComments.removeEventListener('keydown', renderMoreCommentsByEnter);
      };

      var closePopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closePopup);
        btnMoreComments.removeEventListener('click', renderMoreComments);
      };

      btnMoreComments.classList.remove('hidden');
      var counter = COUNTER_STEP;

      renderComments(counter, photo);

      photoBig.classList.remove('hidden');

      photoBigClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', closePopupEscPress);

      var renderMoreComments = function () {
        counter += COUNTER_STEP;
        if (photo.comments.length > counter) {
          renderComments(counter, photo);
        } else {
          renderComments(photo.comments.length, photo);
          btnMoreComments.classList.add('hidden');
          btnMoreComments.removeEventListener('click', renderMoreComments);
          btnMoreComments.removeEventListener('keydown', renderMoreCommentsByEnter);
          counter = COUNTER_STEP;
        }
      };

      var renderMoreCommentsByEnter = function (evt) {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          renderMoreComments();
        }
      };

      if (photo.comments.length >= counter) {
        btnMoreComments.addEventListener('click', renderMoreComments);
        btnMoreComments.addEventListener('keydown', renderMoreCommentsByEnter);
      }
    }
  };

  var renderComments = function (counter, photoArrayElement) {
    var photoBigComments = document.querySelector('.social__comments');

    removeDefaultComments(photoBigComments);
    addCommentsFromPicture(counter, photoBigComments, photoArrayElement);
    if (photoArrayElement.comments.length < counter) {
      btnMoreComments.classList.add('hidden');
    }
  };

  var removeDefaultComments = function (photoBigComments) {
    var photoBigCommentsElements = photoBigComments.children;

    for (var i = photoBigCommentsElements.length - 1; i >= 0; i--) {
      photoBigComments.removeChild(photoBigCommentsElements[i]);
    }
  };

  var addCommentsFromPicture = function (counter, photoBigComments, photoArrayElement) {
    if (photoArrayElement.comments.length < counter) {
      renderComments(photoArrayElement.comments.length, photoArrayElement);
    } else {
      for (var i = 0; i < counter; i++) {
        var commentData = photoArrayElement.comments[i];
        var commentMarkup = '<li class="social__comment"><img class="social__picture" src="' + commentData.avatar + '" alt="' + commentData.name + '" width="35" height="35"> <p class="social__text">' + commentData.message + '</p></li>';
        photoBigComments.insertAdjacentHTML('beforeend', commentMarkup);
      }
    }
  };

  document.querySelector('.social__comment-count').classList.add('hidden');
})();
