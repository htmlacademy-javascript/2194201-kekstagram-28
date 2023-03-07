import { photoContainer } from './render-photos.js';
import { isEscapeKey } from './utils.js';

const photoFullContainer = document.querySelector('.big-picture');
// const photoCollection = photoContainer.children;
// const photoDescription = document.querySelector('.social__caption');
// const likesCount = document.querySelector('.likes-count');
// const commentsCount = document.querySelector('.comments-count');
// const commentsList = document.querySelector('.social__comments');

const hiddenFullPhoto = () => {
  photoFullContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  photoFullContainer.removeEventListener('click', onHiddenFullPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showFullPhoto = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {
    photoFullContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');

    photoFullContainer.addEventListener('click', onHiddenFullPhoto);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function onHiddenFullPhoto(evt) {
  if (!evt.target.closest('.big-picture__preview') || evt.target.closest('.big-picture__cancel')) {
    hiddenFullPhoto();
  }
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hiddenFullPhoto();
  }
}

photoContainer.addEventListener('click', showFullPhoto);
