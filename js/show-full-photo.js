import { isEscapeKey } from './utils.js';

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhotoCloseButton = document.querySelector('#picture-cancel');

export const fillPhotoData = (data) => {
  bigPhotoContainer.querySelector('img').src = data.url;
  bigPhotoContainer.querySelector('.social__caption').textContent = data.description;
  bigPhotoContainer.querySelector('.likes-count').textContent = data.likes;
  bigPhotoContainer.querySelector('.comments-count').textContent = data.comments.length;
};

const closeBigPhoto = () => {
  bigPhotoContainer.classList.add('hidden');
  bigPhotoContainer.querySelector('.social__comment-count').classList.remove('hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');

  bigPhotoCloseButton.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPhoto = () => {
  bigPhotoContainer.classList.remove('hidden');
  bigPhotoContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPhotoCloseButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const onPhotoClick = (evt) => {
  evt.preventDefault();
  openBigPhoto();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}
