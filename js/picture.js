'use strict';

(function () {
  var btnMoreCommets = document.querySelector('.social__comments-loader');
  var photoBig = document.querySelector('.big-picture');
  var photoBigClose = photoBig.querySelector('.big-picture__cancel');

  window.picture = {
    renderPhotoBig: function (photo) {
      photoBig.querySelector('.big-picture__img > img').src = photo.url;
      photoBig.querySelector('.likes-count').textContent = photo.likes;
      photoBig.querySelector('.comments-count').textContent = photo.comments.length;
      photoBig.querySelector('.social__caption').textContent = photo.description;

      var closePopup = function () {
        photoBig.classList.add('hidden');
        photoBigClose.removeEventListener('click', closePopup);
        document.removeEventListener('keydown', closePopupEscPress);
        btnMoreCommets.removeEventListener('click', renderMoreComments);
      };

      var closePopupEscPress = function (evt) {
        window.util.isEscEvent(evt, closePopup);
        btnMoreCommets.removeEventListener('click', renderMoreComments);
      };

      btnMoreCommets.classList.remove('hidden');
      var counter = 5;

      renderComments(counter, photo);

      photoBig.classList.remove('hidden');

      photoBigClose.addEventListener('click', closePopup);
      document.addEventListener('keydown', closePopupEscPress);

      var renderMoreComments = function () {
        counter += 5;
        if (photo.comments.length > counter) {
          renderComments(counter, photo);
        } else {
          renderComments(photo.comments.length, photo);
          btnMoreCommets.classList.add('hidden');
          btnMoreCommets.removeEventListener('click', renderMoreComments);
          counter = 5;
        }
      };

      if (photo.comments.length >= counter) {
        btnMoreCommets.addEventListener('click', renderMoreComments);
      }
    }
  };

  var renderComments = function (counter, photoArrayElement) {
    var photoBigComments = document.querySelector('.social__comments');

    removeDefaultComments(photoBigComments);
    addCommentsFromPicture(counter, photoBigComments, photoArrayElement);
    if (photoArrayElement.comments.length < counter) {
      btnMoreCommets.classList.add('hidden');
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
      for (var i = 0; i < (counter); i++) {
        var commentData = photoArrayElement.comments[i];
        var commentMarkup = '<li class="social__comment"><img class="social__picture" src="' + commentData.avatar + '" alt="' + commentData.name + '" width="35" height="35"> <p class="social__text">' + commentData.message + '</p></li>';
        photoBigComments.insertAdjacentHTML('beforeend', commentMarkup);
      }
    }
  };

  document.querySelector('.social__comment-count').classList.add('hidden');
})();
